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
const uploadDirName = 'uploads';
const uploadDir = path.join(__dirname, uploadDirName); // 업로드 경로 정의
const thumbnailDir = path.join(__dirname, uploadDirName, 'thumbnails'); // 썸네일 경로

// Static 파일 제공 설정 (프론트엔드에서 이미지에 접근 가능)
app.use('/uploads', express.static(uploadDir));
app.use('/', express.static('front'));

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
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

// 체크 함수
const ensureFileExists = (filePath) => {
  const dirPath = path.dirname(filePath); // 파일 경로에서 디렉터리 부분 추출

  // 디렉터리가 없으면 생성
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true }); // recursive: true는 중간 디렉터리도 생성
      console.log(`Created directory: ${dirPath}`);
    } catch (error) {
      console.error(`Error creating directory ${dirPath}: ${error.message}`);
      return; // 디렉터리 생성 실패 시 더 이상 진행하지 않음
    }
  }

  // 파일이 존재하지 않으면 빈 객체로 파일 생성
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

/*
 * API 엔드포인트
 */

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

    let id = uuidv4();
    id = id.replace(/^.*?-.*?-.*?-/, 'ab-');
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

// 이미지 변환
async function convertImage(originalFilePath, imageFilePath, thumbnailFilePath) {
  try {
    // 첫 번째 변환: 리사이즈 없이 webp로 변환
    const firstConversionInfo = await sharp(originalFilePath)
      .rotate()
      .withMetadata() // 원본 이미지의 메타데이터 포함
      .toFormat('webp', { quality: 80 })
      .toFile(imageFilePath);
    // console.log(`원본 이미지 정보: ${JSON.stringify(firstConversionInfo, null, 2)}`);

    // 두 번째 변환: 리사이즈 후 webp로 변환
    const metadata = await sharp(originalFilePath).metadata();
    // console.log('메타데이터:', metadata);

    const secondConversionInfo = await sharp(originalFilePath)
      .resize(1000)
      .rotate()
      // .withMetadata()
      .toFormat('webp', { quality: 80 })
      .toFile(thumbnailFilePath);
    // console.log(`리사이즈 이미지 정보: ${JSON.stringify(secondConversionInfo, null, 2)}`);

    // 변환된 정보 반환
    return {
      original: firstConversionInfo,
      thumbnail: secondConversionInfo,
      metadata,
    };
  } catch (err) {
    console.error('오류:', err);
  }
}

// 📌 중복 검사 (이미 존재하는 해시값인지 확인)
async function checkAndRemoveDuplicate(fileHash, originalFilePath, images, res) {
  try {
    // 중복된 해시값을 가진 이미지를 찾음
    const existingImage = Object.values(images).find((img) => img.hash === fileHash);

    if (existingImage) {
      // 기존 이미지가 있을 경우 삭제 후 중복 메시지 반환
      await fs.unlink(originalFilePath); // 비동기적으로 파일 삭제
      if (!res.headersSent) {
        // 이미 응답을 보냈는지 확인
        return res.status(409).json({
          message: '업로드된 이미지와 동일합니다.',
          existingImage,
        });
      }
    }

    // 중복이 없으면 null 반환 (또는 다른 처리를 할 수 있음)
    return null;
  } catch (err) {
    console.error('파일 처리 오류:', err);
    if (!res.headersSent) {
      // 이미 응답을 보냈는지 확인
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }
}

// 이미지 생성
app.post('/image', upload.single('file'), async (req, res) => {
  const { albumId, description } = req.body;
  const { file } = req;
  ensureFileExists(path.join(__dirname, uploadDirName)); // 업로드 디렉토리 확인
  const thumbnailDir = path.join(__dirname, uploadDirName, 'thumbnails'); // 썸네일 경로

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const originalFilePath = path.join(uploadDir, file.filename);

  try {
    const { albums, images } = loadData();
    // 📌 파일명 처리
    const baseName = path.basename(file.filename, path.extname(file.filename)); // 확장자 제거
    const originalFileName = `${baseName}.webp`;
    const thumbnailFileName = `thumb-${baseName}.webp`;
    const imageFilePath = path.join(uploadDir, originalFileName);
    const thumbnailFilePath = path.join(thumbnailDir, thumbnailFileName);
    // 📌 업로드된 파일의 해시값 계산
    const fileHash = await calculateFileHash(originalFilePath);

    // 📌 중복 검사 (이미 존재하는 해시값인지 확인)
    // await checkAndRemoveDuplicate(fileHash, originalFilePath, images, res);

    // 📌 WebP 변환 및 썸네일 생성
    const metadata1 = await convertImage(originalFilePath, imageFilePath, thumbnailFilePath);

    // 원본 파일 삭제
    fs.unlinkSync(originalFilePath);

    function getOrientation() {
      const { width, height } = metadata1.original;
      // 이미지가 세로인지 가로인지 판별
      let orientation = 'square'; // 정사각형 기본값
      // 가로/세로 비율 (소수점 둘째 자리까지)
      if (width > height) {
        orientation = 'landscape'; // 가로
      } else if (height > width) {
        orientation = 'portrait'; // 세로
      }
      return orientation;
    }

    // 📌 데이터 저장
    let imageId = uuidv4();
    imageId = imageId.replace(/-[^-]+-[^-]+-[^-]+/, '');
    images[imageId] = {
      id: imageId,
      fileName: originalFileName,
      filePath: `/uploads/${originalFileName}`,
      thumbnailPath: `/uploads/thumbnails/${thumbnailFileName}`,
      albumId,
      description,
      hash: fileHash, // 해시값 저장
      uploadTime: new Date().toISOString(),
      datetime: Date.now(), // 밀리초(ms) 단위로 업로드 시간 저장
      orientation: getOrientation(),
      ratio: parseFloat((metadata1.original.width / metadata1.original.height).toFixed(2)),
    };
    console.log('aaa', metadata1.original);

    if (albums[albumId]) {
      albums[albumId].images.push(imageId);
    }

    saveData(albums, images);

    res.status(201).json({
      message: 'Image uploaded successfully',
      data: images,
    });
  } catch (error) {
    console.error('Image processing failed:', error);
    res.status(500).json({ message: 'Image processing failed' });
  }
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
            // ❌ 제외할 속성: hash, filePath, albumId
            const { hash, filePath, thumbnailPath, uploadTime, albumId: _, ...filteredImageData } = image;
            return {
              ...filteredImageData,
              filePath: `${req.protocol}://${req.get('host')}${image.thumbnailPath}`, // 썸네일 URL로 반환
            };
          }
          return null;
        })
        .filter((image) => image !== null), // null 필터링
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
//   key: fs.readFileSync('./ljservice-key.pem'), // 개인 키
//   cert: fs.readFileSync('./ljservice.pem'), // 인증서
// };
// HTTPS 서버 생성
// https.createServer(options, app).listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });

module.exports = app;
