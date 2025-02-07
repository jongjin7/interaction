import { API_ALBUM_URL, API_BASE_URL } from './api.config';

class ApiService {
  static createHeaders(formdata) {
    const headers = new Headers();
    if (formdata instanceof FormData) headers.append('Accept', 'application/json');
    else headers.append('Content-Type', 'application/json');

    return headers;
  }

  static async fetchFromAPI({ type, url, formData = null }) {
    const headers = ApiService.createHeaders(formData);
    const method = type.toLowerCase(); // HTTP 메서드를 소문자로 변환

    try {
      const response = await fetch(url, {
        method,
        body: formData,
        headers,
        redirect: 'follow',
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          if (response.status === 400) {
            console.log(errorData.message || '유효하지 않은 요청입니다.');
          } else {
            console.log(errorData.message || '알 수 없는 오류가 발생했습니다.');
          }
        } catch (error) {
          console.error('JSON 파싱 오류:', error);
        }

        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      let action;

      switch (method) {
        case 'get':
          action = 'load';
          break;
        case 'post':
          action = 'upload';
          break;
        case 'delete':
          action = 'delete';
          break;
        default:
          action = 'perform action';
      }

      console.error(`${action} failed => ${error.message || error}`);
      throw error;
    }
  }

  static async fetchGetAPI({ url, author }) {
    return ApiService.fetchFromAPI({ type: 'get', url, author });
  }

  static async clientFetchAPI({ type, url, author, formData }) {
    return ApiService.fetchFromAPI({ type, url, author, formData });
  }

  static async addNewCategory(title) {
    return ApiService.clientFetchAPI({
      type: 'post',
      url: `${API_ALBUM_URL}`,
      formData: JSON.stringify({ title }),
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
      formData,
    });

    return image;
  }

  static async fetchCategory() {
    return ApiService.fetchGetAPI({ url: `${API_BASE_URL}/albums`, author: 'access' });
  }

  static async fetchGalleryList(albumHashes) {
    console.log('albumHashes', albumHashes);
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

  static async deleteImageItem(imageHash) {
    return ApiService.clientFetchAPI({
      type: 'delete',
      url: `${API_BASE_URL}/images/${imageHash}`,
      author: 'access',
    });
  }
}

export default ApiService;
