import ApiService from '../services/ApiService';
import geoLocation from '../utils/geoLocation';

export default class HomeModel {
  categories;

  selectedAlbumCategory;

  uploadFile;

  // constructor() {}

  async fetchCategories() {
    try {
      const resData = await ApiService.fetchCategory();
      this.categories = resData.data;
      return this.categories;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }

  async addCategory(title) {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', `${title} 이름으로 만든 앨범입니다.`);
      await ApiService.addNewCategory(formData);
      return this.fetchCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
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
    formData.append('image', this.uploadFile);
    formData.append('type', 'image');
    formData.append('title', geoInfo ? geoInfo.time : '제목 없음');
    formData.append('description', geoInfo ? geoInfo.message : '설명 없음');
    return formData;
  }

  async sendFileForm() {
    try {
      const formData = this.createFormData();
      return await ApiService.sendImageFile(formData, this.selectedAlbumCategory);
    } catch (error) {
      console.error('Failed to submit image:', error);
      throw error;
    }
  }
}
