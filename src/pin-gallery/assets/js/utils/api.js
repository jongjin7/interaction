import { API_ALBUM_URL, API_BASE_URL, IMG_ACCESS_TOKEN, IMG_CLIENT_ID } from '../config/api.config';

export async function clientFetchAPI({ type, url, author, formData }) {
  const headers = new Headers();
  if (author === 'access') headers.append('Authorization', `Bearer ${IMG_ACCESS_TOKEN}`);
  else if (author === 'client') headers.append('Authorization', `Client-ID ${IMG_CLIENT_ID}`);
  headers.append('Accept', 'application/json');

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
    let action;

    if (type === 'get') {
      action = 'load';
    } else if (type === 'post') {
      action = 'upload';
    } else {
      action = 'delete';
    }

    console.error(`Image ${action} failed: ${error}`);
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
      headers,
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
export async function addNewCategory(formData) {
  return clientFetchAPI({
    type: 'post',
    url: `${API_ALBUM_URL}`,
    author: 'access',
    formData,
  });
}

export async function moveToAlbum(albumHash, imgHash) {
  console.log('---- moveToAlbum ----');
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
  console.log('---- sendImageFile ----');
  return moveToAlbum(albumHash, image.data.id);
}

export async function fetchCategory() {
  return fetchAPI({ url: `${API_BASE_URL}/account/me/albums`, author: 'access' });
}

// 앨범의 이미지들 읽어오기
export async function fetchGalleryList(albumHashes) {
  // 하루 사용 크레딧 체크
  // const credit = await fetchAPI({url: `https://api.imgur.com/3/credits`, author: 'client'})
  // console.log('credit', credit)

  async function fetchMultipleAlbums(paramAlbumHashes) {
    const fetchPromises = paramAlbumHashes.map((hash) =>
      fetchAPI({ url: `${API_ALBUM_URL}/${hash}/images`, author: 'client' }),
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

export async function deleteAllAlbums() {
  // 각 앨범을 삭제하는 비동기 작업 배열 생성
  const categories = await fetchCategory();
  console.log('all', categories);
  categories.data.map((category) => {
    clientFetchAPI({
      type: 'delete',
      url: `${API_ALBUM_URL}/${category.id}`,
      author: 'access',
    }).then((res) => {
      console.log(`${res} 앨범이 삭제되었습니다.`);
    });
  });
}

export async function deleteAllImages() {
  // 각 앨범을 삭제하는 비동기 작업 배열 생성
  const categorise = await fetchCategory();
  const allImages = categorise.data.map((category) => {
    return clientFetchAPI({
      url: `${API_ALBUM_URL}/${category.id}/images`,
      author: 'access',
    }).then(async (album) => {
      // console.log('가져온 앨범 이미지', album);

      // 이미지 삭제 작업 배열 생성
      const deletePromises = album.data.map((image) => {
        return deleteImageItem(image.id).then((r) => {
          console.log(r, '이미지가 제거되었다.');
        });
      });

      // 모든 이미지 삭제 작업이 완료될 때까지 대기
      try {
        await Promise.all(deletePromises);
        console.log('현재 앨범의 포함된 이미지가 모두 제거되었다.');
        // 모든 이미지가 제거된 후 앨범 삭제
        await clientFetchAPI({
          type: 'delete',
          url: `${API_ALBUM_URL}/${category.id}`,
          author: 'access',
        });
        console.log(`현재 앨범이 삭제되었습니다.`);
      } catch (error) {
        console.error('이미지 삭제 중 오류 발생:', error);
      }
    });
  });

  // 모든 삭제 작업이 완료될 때까지 대기
  await Promise.all(allImages);
  console.log('All albums deleted successfully.');
}
