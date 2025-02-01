const express = require('express');
const crypto = require('crypto');
const https = require('https');
const cors = require('cors'); // cors 모듈 추가
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp'); // 저장시 이미지 사이즈 정의

const app = express();

const SUC_EXTENSION = ['jpg', 'jpeg', 'png', 'gif'];
const MB = 1 * 1024 * 1024;
const QUALITY_DEGREE = 10;
const RESIZE_WIDTH = 800;

// CORS 설정 - 모든 도메인 허용
const corsOptions = {
  origin: '*', // 모든 도메인 허용 (필요에 따라 수정)
  methods: ['GET', 'POST', 'DELETE'],
};
app.use(cors(corsOptions)); // CORS 설정

// JSON 파싱
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 처리

// 업로드 폴더 설정
const uploadDir = path.join(__dirname, 'uploads');
const thumbnailDir = path.join(uploadDir, 'thumbnails');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir);
}

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 업로드 경로
  },
  filename: (req, file, cb) => {
    // 한글 깨짐 방지 및 타임스탬프 추가
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const ext = path.extname(originalName); // 확장자 추출
    const baseName = path.basename(originalName, ext); // 파일명 추출
    const timeStampedName = `${baseName}-${Date.now()}${ext}`; // 타임스탬프 추가
    cb(null, timeStampedName);
  },
});
const upload = multer({ storage });

// JSON 파일 경로
const albumsFilePath = path.join(__dirname, 'data/albums.json');
const imagesFilePath = path.join(__dirname, 'data/images.json');

// JSON 파일이 없으면 기본 빈 객체 생성
const ensureFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2), 'utf-8');
      console.log(`Created new file: ${filePath}`);
    } catch (error) {
      console.error(`Error creating file ${filePath}: ${error.message}`);
    }
  }
};

// 데이터 로딩 함수 (JSON 파일에서 데이터를 불러옴)
const loadData = () => {
  ensureFileExists(albumsFilePath);
  ensureFileExists(imagesFilePath);

  let albums = {};
  let images = {};

  try {
    albums = JSON.parse(fs.readFileSync(albumsFilePath, 'utf-8'));
  } catch (error) {
    console.error(`Error reading albums.json: ${error.message}`);
  }

  try {
    images = JSON.parse(fs.readFileSync(imagesFilePath, 'utf-8'));
  } catch (error) {
    console.error(`Error reading images.json: ${error.message}`);
  }

  return { albums, images };
};

// 데이터 저장 함수 (JSON 파일에 데이터를 저장)
const saveData = (albums, images) => {
  fs.writeFileSync(albumsFilePath, JSON.stringify(albums, null, 2));
  fs.writeFileSync(imagesFilePath, JSON.stringify(images, null, 2));
};

// API 엔드포인트

// 앨범 생성
app.post('/albums', (req, res) => {
  try {
    const { title } = req.body;

    // 제목이 없거나 빈 문자열이면 오류 반환
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Invalid title' });
    }

    const { albums, images } = loadData();

    // 제목이 동일한 앨범이 이미 존재하는지 확인
    const albumExists = Object.values(albums).some((album) => album.title === title);
    if (albumExists) {
      return res.status(409).json({ message: '등록된 앨범입니다.' });
    }

    const id = uuidv4();
    albums[id] = { id, title, images: [] };

    // 데이터 저장
    saveData(albums, images);

    res.status(201).json({ message: 'Album created', album: albums[id] });
  } catch (error) {
    res.status(500).json({ message: 'Error creating album', error: error.message });
  }
});

// 이미지 업로드 엔드포인트
// 파일의 해시값을 계산하는 함수 (SHA-256)
const calculateFileHash = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
};

app.post('/image', upload.single('file'), async (req, res) => {
  const { albumId, description } = req.body;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const originalFilePath = path.join(uploadDir, file.filename);

  try {
    const { albums, images } = loadData();
    // 📌 업로드된 파일의 해시값 계산
    const fileHash = await calculateFileHash(originalFilePath);

    // 📌 중복 검사 (이미 존재하는 해시값인지 확인)
    const existingImage = Object.values(images).find((img) => img.hash === fileHash);
    if (existingImage) {
      // 기존 이미지 삭제 후 중복 메시지 반환
      fs.unlinkSync(originalFilePath);
      return res.status(409).json({ message: '업로드된 이미지와 동일합니다.', existingImage });
    }

    // 📌 파일명 처리
    const baseName = path.basename(file.filename, path.extname(file.filename)); // 확장자 제거
    const originalFileName = `${baseName}.webp`;
    const thumbnailFileName = `thumb-${baseName}.webp`;
    const webpFilePath = path.join(uploadDir, originalFileName);
    const thumbnailFilePath = path.join(thumbnailDir, thumbnailFileName);

    // 📌 WebP 변환 및 썸네일 생성
    const sharpInstance = sharp(originalFilePath);
    await sharpInstance.webp({ quality: 80 }).toFile(webpFilePath);
    await sharpInstance.resize(900).webp({ quality: 50 }).toFile(thumbnailFilePath);

    // 원본 파일 삭제
    fs.unlinkSync(originalFilePath);

    // 📌 데이터 저장
    const imageId = uuidv4();
    images[imageId] = {
      id: imageId,
      fileName: originalFileName,
      filePath: `/uploads/${originalFileName}`,
      thumbnailPath: `/uploads/thumbnails/${thumbnailFileName}`,
      albumId,
      description,
      hash: fileHash, // 해시값 저장
    };

    if (albums[albumId]) {
      albums[albumId].images.push(imageId);
    }

    saveData(albums, images);

    res.status(201).json({
      message: 'Image uploaded successfully',
      data: {
        id: imageId,
        fileName: originalFileName,
        description,
        filePath: `${req.protocol}://${req.get('host')}/uploads/${originalFileName}`,
        thumbnailPath: `${req.protocol}://${req.get('host')}/uploads/thumbnails/${thumbnailFileName}`,
      },
    });
  } catch (error) {
    console.error('Image processing failed:', error);
    res.status(500).json({ message: 'Image processing failed' });
  }
});

// Static 파일 제공 설정 (프론트엔드에서 이미지에 접근 가능)
app.use('/uploads', express.static(uploadDir));
app.use('/', express.static('front'));

// 앨범의 이미지를 반환할 때 이미지 ID 대신 상세 정보를 포함하여 반환
app.get('/albums/:albumId/images', (req, res) => {
  const { albumId } = req.params;
  const { albums, images } = loadData();

  if (!albums[albumId]) {
    return res.status(404).json({ message: 'Album not found' });
  }

  const albumImages = albums[albumId].images
    .map((imageId) => {
      const image = images[imageId];
      if (image) {
        return {
          id: image.id,
          fileName: image.fileName,
          filePath: `${req.protocol}://${req.get('host')}${image.thumbnailPath}`, // 썸네일 URL 포함
        };
      }
      return null;
    })
    .filter((image) => image !== null); // null 값 제거

  res.json(albumImages);
});

// 앨범 조회 시 이미지의 ID 대신 파일 경로와 파일명을 포함하도록 수정
app.get('/albums', (req, res) => {
  const { albums, images } = loadData();

  const albumsWithImages = Object.values(albums).map((album) => {
    return {
      ...album,
      images: album.images
        .map((imageId) => {
          const image = images[imageId];
          if (image) {
            return {
              id: image.id,
              fileName: image.fileName,
              filePath: `${req.protocol}://${req.get('host')}${image.thumbnailPath}`, // 썸네일 URL로 반환
              description: image.description,
            };
          }
          return null;
        })
        .filter((image) => image !== null), // null 필터링
    };
  });

  res.json(albumsWithImages); // 앨범 데이터와 이미지 정보 반환
});

app.get('/category', (req, res) => {
  const { albums } = loadData();

  const albumsWithImages = Object.values(albums).map((album) => {
    return {
      ...album,
    };
  });
  res.json(albumsWithImages); // 앨범 데이터와 이미지 정보 반환
});

// 이미지 삭제
app.delete('/images/:imageId', (req, res) => {
  const { imageId } = req.params;
  const { albums, images } = loadData();

  const image = images[imageId];
  if (!image) {
    return res.status(404).json({ message: 'Image not found' });
  }

  // 이미지 및 썸네일 경로 설정
  const imagePath = path.join(__dirname, 'uploads', path.basename(decodeURIComponent(image.filePath)));
  const thumbnailPath = path.join(
    __dirname,
    'uploads',
    'thumbnails',
    path.basename(decodeURIComponent(image.thumbnailPath)),
  );

  // 이미지 삭제
  try {
    fs.unlinkSync(imagePath);
    fs.unlinkSync(thumbnailPath);

    // 메모리에서 이미지 삭제
    delete images[imageId];

    // 앨범에서 해당 이미지 제거
    for (const albumId in albums) {
      albums[albumId].images = albums[albumId].images.filter((id) => id !== imageId);
    }

    // 데이터 저장
    saveData(albums, images);

    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image' });
  }
});

// 앨범 삭제
app.delete('/albums/:albumId', (req, res) => {
  const { albumId } = req.params;
  const { albums, images } = loadData();

  if (!albums[albumId]) {
    return res.status(404).json({ message: 'Album not found' });
  }

  // 앨범에 연결된 이미지 삭제
  albums[albumId].images.forEach((imageId) => {
    const image = images[imageId];
    if (image) {
      const imagePath = path.join(__dirname, 'uploads', path.basename(decodeURIComponent(image.filePath)));
      const thumbnailPath = path.join(
        __dirname,
        'uploads',
        'thumbnails',
        path.basename(decodeURIComponent(image.thumbnailPath)),
      );

      // 이미지 파일 삭제
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      // 썸네일 파일 삭제
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }

      delete images[imageId]; // 메모리에서 삭제
    }
  });

  // 앨범 삭제
  delete albums[albumId];

  // 데이터 저장
  saveData(albums, images);

  res.status(200).json({ message: 'Album deleted' });
});

// 서버 실행
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// SSL 인증서 파일 로드
// const options = {
//   key: fs.readFileSync('../../localhost-key.pem'), // 개인 키
//   cert: fs.readFileSync('../../localhost.pem'), // 인증서
// };
// HTTPS 서버 생성
// https.createServer(options, app).listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });

module.exports = app;
