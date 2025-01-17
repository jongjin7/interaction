const API_BASE_URL = 'http://localhost:3000';

function videoCapture() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  let imageDataURL;

  const captureButton = document.getElementById('capture');
  const ctx = canvas.getContext('2d');

  // Access the camera
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
      alert('Camera access is required to use this feature.');
    }
  }

  // Capture photo
  captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Optional: Save the photo
    imageDataURL = canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.href = imageDataURL;
    downloadLink.download = 'photo.png';
    downloadLink.click();

    console.log('Captured photo URL:', imageDataURL);
  });

  startCamera();
}

// Start the camera when the page loads

// 앨범 데이터 가져오기
async function fetchAlbums() {
  try {
    const response = await fetch(`${API_BASE_URL}/albums`);
    if (!response.ok) throw new Error('Failed to fetch albums');
    const albums = await response.json();
    updateAlbumsUI(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
}

// 앨범 UI 업데이트
function updateAlbumsUI(albums) {
  console.log('albums -->', albums);
  const albumsList = document.getElementById('albums-list');
  const albumSelect = document.getElementById('album-select');

  albumsList.innerHTML = '';
  albumSelect.innerHTML = '<option value="">Select Album</option>';

  albums.forEach((album) => {
    // Update album select options
    const option = document.createElement('option');
    option.value = album.id;
    option.textContent = album.name;
    albumSelect.appendChild(option);

    // Display album and its images
    const albumDiv = document.createElement('div');
    albumDiv.className = 'album';
    albumDiv.innerHTML = `
      <h3>${album.name} 
        <span class="delete-btn" onclick="deleteAlbum('${album.id}')">[Delete Album]</span>
      </h3>
      <div class="images"></div>
    `;

    const imagesContainer = albumDiv.querySelector('.images');
    album.images.forEach((image) => {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'image';
      imageDiv.innerHTML = `
        <img src="${image.filePath}" alt="${image.fileName}" />
        <p>${image.fileName}</p>
        <div>위치: ${image.position}</div>
         <button class="delete-btn" onclick="deleteImage('${image.id}')">[Delete]</button>
      `;
      imagesContainer.appendChild(imageDiv);
    });

    albumsList.appendChild(albumDiv);
  });
}

// 이미지 업로드
async function uploadImage(file, albumId) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('albumId', albumId);
  formData.append('position', '내집');
  try {
    const response = await fetch(`${API_BASE_URL}/images`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    const result = await response.json();
    console.log('Image uploaded:', result);
    fetchAlbums(); // UI 업데이트
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// 앨범 생성
async function createAlbum(name) {
  try {
    const response = await fetch(`${API_BASE_URL}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to create album');
    const result = await response.json();
    console.log('Album created:', result);
    fetchAlbums(); // UI 업데이트
  } catch (error) {
    console.error('Error creating album:', error);
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  fetchAlbums(); // 페이지 로드 시 앨범 목록 가져오기

  const uploadForm = document.getElementById('upload-image-form');
  const fileInput = document.getElementById('image-file');
  const albumSelect = document.getElementById('album-select');
  const photoPreview = document.getElementById('photo-preview');
  let file;
  let albumId;

  albumSelect.addEventListener('change', (e) => {
    albumId = e.target.value;
  });

  fileInput.addEventListener('change', (event) => {
    file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.src = e.target.result;
        photoPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (file && albumId) {
      uploadImage(file, albumId);
      photoPreview.src = '';
      photoPreview.style.display = 'none';
    } else {
      alert('Please select an album and a file');
    }
  });

  const albumForm = document.getElementById('album-form');
  albumForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const albumNameInput = document.getElementById('album-name');
    const albumName = albumNameInput.value;

    if (albumName) {
      createAlbum(albumName);
      albumNameInput.value = ''; // 입력 필드 초기화
    } else {
      alert('Please enter an album name');
    }
  });
});

async function deleteAlbum(albumId) {
  try {
    const response = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete album');
    console.log('Album deleted:', await response.json());
    fetchAlbums(); // UI 갱신
  } catch (error) {
    console.error('Error deleting album:', error);
  }
}

async function deleteImage(imageId) {
  try {
    const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete image');
    console.log('Image deleted:', await response.json());
    fetchAlbums(); // UI 갱신
  } catch (error) {
    console.error('Error deleting image:', error.message); // 오류 메시지 출력
  }
}

async function getLocation() {
  try {
    const position = await getCurrentPositionAsync();

    // 항상 가져올 수 있는 필드들이다. timestamp는 coords 객체 내부에 있지 않고 외부에서 가져오는 필드이다.
    let msg =
      // `현재 위치는 대략 ${new Date(pos.timestamp).toLocaleString()}에 ` +
      `위도 ${position.coords.latitude} 경도 ${position.coords.longitude}에서 ` +
      `약 ${position.coords.accuracy}미터 떨어진 곳에 있습니다.`;

    // 해당 기기가 고도 (altitude)를 반환하면, 해당 정보를 추가한다.
    if (position.coords.altitude) {
      msg += ` 당신은 해발 ${position.coords.altitude} ± ${position.coords.altitudeAccuracy}미터에 있습니다.`;
    }

    // 해당 기기가 속도와 북쪽 기준 각 (heading)을 반환한다면 역시 추가해준다.
    if (position.coords.speed) {
      msg += ` 당신은 ${position.coords.heading} 방향으로 초속 ${position.coords.speed}(m/s)의 속도로 움직이고 있습니다.`;
    }

    return {
      time: new Date(position.timestamp).toLocaleString(),
      x: position.coords.latitude,
      y: position.coords.longitude,
      correction: position.coords.accuracy,
      message: msg,
    };
  } catch (error) {
    console.error(`ERROR(${error.code})`);
  }
}
