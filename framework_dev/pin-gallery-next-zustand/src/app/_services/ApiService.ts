import { API_ALBUM_URL, API_BASE_URL } from '../../../../../client-services/pin-gallery-service/api.config';
import { AlbumImage, Category } from '@/app/_types/galleryType';
// 공통 인터페이스 정의
interface ApiRequestParams {
  type: 'get' | 'post' | 'delete';
  url: string;
  author: 'access' | 'client';
  formData?: FormData | null;
}

// API 응답 형식 정의
interface ApiResponse<T> {
  data: T;
  status: number; // 서버 응답의 상태 코드 (예: 200)
  message?: string; // 추가 메시지
}

// NewCategoryResponse 인터페이스 정의
interface NewCategoryResponse {
  id: string;
  // 기타 필요한 필드들
}

class ApiService {
  static createHeaders(author: 'access' | 'client'): Headers {
    const headers = new Headers();
    if (author === 'access') headers.append('Authorization', `Bearer ${IMG_ACCESS_TOKEN}`);
    else if (author === 'client') headers.append('Authorization', `Client-ID ${IMG_CLIENT_ID}`);
    headers.append('Accept', 'application/json');
    return headers;
  }

  static async fetchFromAPI<T>({ type, url, author, formData = null }: ApiRequestParams): Promise<ApiResponse<T>> {
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

  static async fetchGetAPI<T>({ url, author }: { url: string; author: 'access' | 'client' }): Promise<ApiResponse<T>> {
    return ApiService.fetchFromAPI<T>({ type: 'get', url, author });
  }

  static async clientFetchAPI<T>({ type, url, author, formData }: ApiRequestParams): Promise<ApiResponse<T>> {
    return ApiService.fetchFromAPI<T>({ type, url, author, formData });
  }

  static async addNewCategory(formData: FormData): Promise<ApiResponse<NewCategoryResponse>> {
    return ApiService.clientFetchAPI({
      type: 'post',
      url: `${API_ALBUM_URL}`,
      author: 'access',
      formData,
    });
  }

  static async moveToAlbum(albumHash: string, imgHash: string): Promise<boolean> {
    const formData = new FormData();
    formData.append('ids[]', imgHash);

    const response: ApiResponse<boolean> = await ApiService.clientFetchAPI<boolean>({
      type: 'post',
      url: `${API_ALBUM_URL}/${albumHash}/add`,
      author: 'access',
      formData,
    });

    return response.data; // boolean
  }

  static async sendImageFile(formData: FormData, albumHash: string) {
    const image = await ApiService.clientFetchAPI<{ id: string }>({
      type: 'post',
      url: `${API_BASE_URL}/image`,
      author: 'access',
      formData,
    });
    return ApiService.moveToAlbum(albumHash, image.data.id);
  }

  static async fetchCategory(): Promise<Category[]> {
    const response = await ApiService.fetchGetAPI({ url: `${API_BASE_URL}/account/me/albums`, author: 'access' });
    return response.data as Category[];
  }

  static async fetchGalleryList(albumHashes: string[]): Promise<AlbumImage[][]> {
    async function fetchMultipleAlbums(paramAlbumHashes: string[]): Promise<AlbumImage[][]> {
      // 각 앨범의 이미지를 가져오는 API 호출을 병렬로 실행
      const fetchPromises = paramAlbumHashes.map((hash) =>
        ApiService.fetchGetAPI({ url: `${API_ALBUM_URL}/${hash}/images`, author: 'client' }),
      );

      try {
        const responses = await Promise.all(fetchPromises);
        return responses.map((response) => {
          return response.data as AlbumImage[];
        });
      } catch (error) {
        // 오류 처리
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
      }
    }

    return fetchMultipleAlbums(albumHashes);
  }

  static async deleteImageItem(imageHash: string) {
    return ApiService.clientFetchAPI({
      type: 'delete',
      url: `${API_BASE_URL}/image/${imageHash}`,
      author: 'access',
    });
  }
}

export default ApiService;
