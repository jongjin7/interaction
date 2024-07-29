import { API_ALBUM_URL, API_BASE_URL, IMG_ACCESS_TOKEN, IMG_CLIENT_ID } from '../../../config/api.config';

// 공통 헤더 생성 함수
function createHeaders(author) {
  const headers = new Headers();
  if (author === 'access') headers.append('Authorization', `Bearer ${IMG_ACCESS_TOKEN}`);
  else if (author === 'client') headers.append('Authorization', `Client-ID ${IMG_CLIENT_ID}`);
  headers.append('Accept', 'application/json');
  return headers;
}

// 공통 fetch 함수
async function fetchFromAPI({ type, url, author, formData = null }) {
  const headers = createHeaders(author);

  try {
    const response = await fetch(url, {
      method: type,
      body: formData,
      headers,
      redirect: 'follow',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    const action = type === 'get' ? 'load' : type === 'post' ? 'upload' : 'delete';
    console.error(`Image ${action} failed: ${error}`);
    throw error;
  }
}

// GET 요청 전용 함수
async function fetchGetAPI({ url, author }) {
  return fetchFromAPI({ type: 'get', url, author });
}

// POST, DELETE 등 요청 전용 함수
async function clientFetchAPI({ type, url, author, formData }) {
  return fetchFromAPI({ type, url, author, formData });
}

// 신규 카테고리 등록
export async function addNewCategory(formData) {
  return clientFetchAPI({
    type: 'post',
    url: `${API_ALBUM_URL}`,
    author: 'access',
    formData,
  });
}

// 앨범으로 이동
export async function moveToAlbum(albumHash, imgHash) {
  const formData = new FormData();
  formData.append('ids[]', imgHash);

  return clientFetchAPI({
    type: 'post',
    url: `${API_ALBUM_URL}/${albumHash}/add`,
    author: 'access',
    formData,
  });
}

// 이미지 등록
export async function sendImageFile(formData, albumHash) {
  const image = await clientFetchAPI({
    type: 'post',
    url: `${API_BASE_URL}/image`,
    author: 'access',
    formData,
  });
  return moveToAlbum(albumHash, image.data.id);
}

// 카테고리 조회
export async function fetchCategory() {
  return fetchGetAPI({ url: `${API_BASE_URL}/account/me/albums`, author: 'access' });
}

// 앨범의 이미지들 읽어오기
export async function fetchGalleryList(albumHashes) {
  // 하루 사용 크레딧 체크
  // const credit = await fetchAPI({url: `https://api.imgur.com/3/credits`, author: 'client'})
  // console.log('credit', credit)

  async function fetchMultipleAlbums(paramAlbumHashes) {
    const fetchPromises = paramAlbumHashes.map((hash) =>
      fetchGetAPI({ url: `${API_ALBUM_URL}/${hash}/images`, author: 'client' }),
    );

    try {
      return await Promise.all(fetchPromises);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    }
  }

  return fetchMultipleAlbums(albumHashes);
}

// 이미지 삭제
export async function deleteImageItem(imageHash) {
  return clientFetchAPI({
    type: 'delete',
    url: `${API_BASE_URL}/image/${imageHash}`,
    author: 'access',
  });
}
