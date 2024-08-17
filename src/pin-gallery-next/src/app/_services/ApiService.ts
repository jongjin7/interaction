import { API_ALBUM_URL, API_BASE_URL, IMG_ACCESS_TOKEN, IMG_CLIENT_ID } from '@/config/api.config';

class ApiService {
  static createHeaders(author) {
    const headers = new Headers();
    if (author === 'access') headers.append('Authorization', `Bearer ${IMG_ACCESS_TOKEN}`);
    else if (author === 'client') headers.append('Authorization', `Client-ID ${IMG_CLIENT_ID}`);
    headers.append('Accept', 'application/json');
    return headers;
  }

  static async fetchFromAPI({ type, url, author, formData = null }) {
    const headers = ApiService.createHeaders(author);

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
      } else if (type === 'delete') {
        action = 'delete';
      } else {
        action = 'perform action';
      }
      console.error(`Image ${action} failed: ${error}`);
      throw error;
    }
  }

  static async fetchGetAPI({ url, author }) {
    return ApiService.fetchFromAPI({ type: 'get', url, author });
  }

  static async clientFetchAPI({ type, url, author, formData }) {
    return ApiService.fetchFromAPI({ type, url, author, formData });
  }

  static async addNewCategory(formData) {
    return ApiService.clientFetchAPI({
      type: 'post',
      url: `${API_ALBUM_URL}`,
      author: 'access',
      formData,
    });
  }

  static async moveToAlbum(albumHash, imgHash) {
    const formData = new FormData();
    formData.append('ids[]', imgHash);

    return ApiService.clientFetchAPI({
      type: 'post',
      url: `${API_ALBUM_URL}/${albumHash}/add`,
      author: 'access',
      formData,
    });
  }

  static async sendImageFile(formData, albumHash) {
    const image = await ApiService.clientFetchAPI({
      type: 'post',
      url: `${API_BASE_URL}/image`,
      author: 'access',
      formData,
    });
    return ApiService.moveToAlbum(albumHash, image.data.id);
  }

  static async fetchCategory() {
    return ApiService.fetchGetAPI({ url: `${API_BASE_URL}/account/me/albums`, author: 'access' });
  }

  static async fetchGalleryList(albumHashes) {
    async function fetchMultipleAlbums(paramAlbumHashes) {
      const fetchPromises = paramAlbumHashes.map((hash) =>
        ApiService.fetchGetAPI({ url: `${API_ALBUM_URL}/${hash}/images`, author: 'client' }),
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

  // static async deleteImageItem(imageHash) {
  //   return ApiService.clientFetchAPI({
  //     type: 'delete',
  //     url: `${API_BASE_URL}/image/${imageHash}`,
  //     author: 'access',
  //   });
  // }

  static async getGalleryList() {
    // ref: https://velog.io/@hamjw0122/Next.js-Next.js%EC%97%90%EC%84%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-Fetching%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      // cache: 'no-store',
      // SSG 방식을 사용하되 주기적으로 데이터를 새로 불러오기 위해
      // next: {
      //   revalidate: 10,
      // },
    });
    const data = await res.json();
    return { props: { data } };
  }
}

export default ApiService;
