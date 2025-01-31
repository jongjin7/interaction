import { API_ALBUM_URL, API_BASE_URL } from '@/config/api.config';

class ApiService {
  static createHeaders(formdata) {
    const headers = new Headers();
    if (formdata instanceof FormData) headers.append('Accept', 'application/json');
    else headers.append('Content-Type', 'application/json');

    return headers;
  }

  static async fetchFromAPI({ type, url, author, formData = null }) {
    const headers = ApiService.createHeaders(formData);

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
    // return ApiService.moveToAlbum(albumHash, image.data.id);
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
