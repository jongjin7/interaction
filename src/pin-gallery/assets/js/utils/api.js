import { API_ALBUM_URL, API_BASE_URL, IMG_ACCESS_TOKEN, IMG_CLIENT_ID } from '../config/api.config';

export async function clientFetchAPI({ type, url, author, formdata }) {
  const headers = new Headers();
  if (author === 'access') headers.append('Authorization', `Bearer ${IMG_ACCESS_TOKEN}`);
  else if (author === 'client') headers.append('Authorization', `Client-ID ${IMG_CLIENT_ID}`);
  headers.append('Accept', 'application/json');

  try {
    const response = await fetch(url, {
      method: type,
      body: formdata,
      headers: headers,
      redirect: 'follow',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Image ${type === 'get' ? 'load' : type === 'post' ? 'upload' : 'delete'} failed: ${error}`);
    throw error;
  }
}

export async function fetchAPI({ url, author }) {
  const headers = new Headers();
  if (author === 'access') headers.append('Authorization', `Bearer ${IMG_ACCESS_TOKEN}`);
  else if (author === 'client') headers.append('Authorization', `Client-ID ${IMG_CLIENT_ID}`);
  headers.append('Accept', 'application/json');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
      // verify: false,
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch data failed:', error);
    return [];
  }
}

// 신규 카테고리 등록
export async function addNewCategory(formdata) {
  return await clientFetchAPI({
    type: 'post',
    url: `${API_ALBUM_URL}`,
    author: 'access',
    formdata: formdata,
  });
}

// 이미지 등록
export async function sendImageFile(formdata, album_hash) {
  const image = await clientFetchAPI({
    type: 'post',
    url: `${API_BASE_URL}/image`,
    author: 'access',
    formdata: formdata,
  });
  console.log('---- sendImageFile ----');
  const result = await moveToAlbum(album_hash, image.data.id);
  return result;
}

export async function moveToAlbum(album_hash, img_hash) {
  console.log('---- moveToAlbum ----');
  const formdata = new FormData();
  formdata.append('ids[]', img_hash);

  return await clientFetchAPI({
    type: 'post',
    url: `${API_ALBUM_URL}/${album_hash}/add`,
    author: 'access',
    formdata: formdata,
  });
}

export async function fetchCategory() {
  return await fetchAPI({ url: `${API_BASE_URL}/account/me/albums`, author: 'access' });
}

// 앨범의 이미지들 읽어오기
export async function fetchGalleryList(albumHashes) {
  // 하루 사용 크레딧 체크
  // const credit = await fetchAPI({url: `https://api.imgur.com/3/credits`, author: 'client'})
  // console.log('credit', credit)

  async function fetchMultipleAlbums(albumHashes) {
    const fetchPromises = albumHashes.map((hash) =>
      fetchAPI({ url: `${API_ALBUM_URL}/${hash}/images`, author: 'client' }),
    );
    try {
      return await Promise.all(fetchPromises);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  return await fetchMultipleAlbums(albumHashes);
}

// 이미지 삭제
export async function deleteImageItem(imageHash) {
  return await clientFetchAPI({
    type: 'delete',
    url: `${API_BASE_URL}/image/${imageHash}`,
    author: 'access',
  });
}
