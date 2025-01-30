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
    option.textContent = album.title;
    albumSelect.appendChild(option);

    // Display album and its images
    const albumDiv = document.createElement('div');
    albumDiv.className = 'album';
    albumDiv.innerHTML = `
      <h3>${album.title} 
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
        <div>위치: ${image.description}</div>
         <button class="delete-btn" onclick="deleteImage('${image.id}')">[Delete]</button>
      `;
      imagesContainer.appendChild(imageDiv);
    });

    albumsList.appendChild(albumDiv);
  });
}

// 이미지 업로드
async function uploadImage(file, albumId, uploadForm) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('albumId', albumId);
  formData.append('description', '촬영장소');

  try {
    const response = await fetch(`${API_BASE_URL}/image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const result = await response.json();

      if (response.status === 409) {
        alert('이미 업로드된 이미지입니다.');
      } else if (response.status === 400) {
        alert('유효하지 않은 요청입니다.');
      } else {
        throw new Error(result.message || '이미지 업로드 실패');
      }
      return;
    }

    const result = await response.json();
    console.log('Image uploaded:', result);
    fetchAlbums(); // UI 업데이트
    if (uploadForm) uploadForm.reset();
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('이미지 업로드 중 오류가 발생했습니다.');
  }
}

// 앨범 생성
async function createAlbum(title) {
  try {
    if (!title.trim()) {
      alert('앨범 제목을 입력해주세요.');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const result = await response.json();

      if (response.status === 409) {
        alert('이미 존재하는 앨범 제목입니다.');
      } else if (response.status === 400) {
        alert('유효하지 않은 앨범 제목입니다.');
      } else {
        throw new Error(result.message || '앨범 생성 실패');
      }
      return;
    }

    const result = await response.json();
    console.log('Album created:', result);
    fetchAlbums(); // UI 업데이트
  } catch (error) {
    console.error('Error creating album:', error);
    alert('앨범 생성 중 오류가 발생했습니다.');
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
      uploadImage(file, albumId, uploadForm);
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
