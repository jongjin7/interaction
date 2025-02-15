import ApiService from '../../../../../client-services/pin-gallery-service/ApiService';
import geoLocation from '../utils/geoLocation';

export default class HomeModel {
  selectedAlbumCategory;

  uploadFile;

  // constructor() {}

  async fetchCategories() {
    try {
      return await ApiService.fetchCategory();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }

  async addCategory(title) {
    try {
      return await ApiService.addNewCategory(title);
    } catch (error) {
      // console.error('Failed to add category:', error.message);
      throw error;
    }
  }

  setSelectedAlbumCategory(category) {
    this.selectedAlbumCategory = category;
  }

  setUploadFile(file) {
    this.uploadFile = file;
  }

  async createFormData() {
    const geoInfo = await geoLocation.init();
    const formData = new FormData();
    formData.append('file', this.uploadFile);
    formData.append('albumId', this.selectedAlbumCategory);
    formData.append('title', geoInfo ? geoInfo.time : '제목 없음');
    formData.append('description', geoInfo ? geoInfo.message : '설명 없음');
    return formData;
  }

  async sendFileForm() {
    try {
      const formData = await this.createFormData();
      return await ApiService.sendImageFile(formData);
    } catch (error) {
      console.error('Failed to submit image:', error.message);
      throw error;
    }
  }
}
