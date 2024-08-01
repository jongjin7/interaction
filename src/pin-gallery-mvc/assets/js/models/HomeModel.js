import ApiService from '../services/ApiService';

class HomeModel {
  constructor() {
    this.categories = [];
    this.selectedAlbumCategory = '';
    this.uploadFile = null;
  }

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
      formData.append('description', 'This album contains a lot of dank memes. Be prepared.');
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

  async submitImage() {
    try {
      const formData = new FormData();
      formData.append('image', this.uploadFile);
      formData.append('type', 'image');
      formData.append('title', 'Upload Image');
      formData.append('description', 'Uploaded via browser.');

      const result = await ApiService.sendImageFile(formData, this.selectedAlbumCategory);
      return result;
    } catch (error) {
      console.error('Failed to submit image:', error);
      throw error;
    }
  }
}

export default HomeModel;
