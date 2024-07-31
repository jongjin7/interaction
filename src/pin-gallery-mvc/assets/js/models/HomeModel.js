import { addNewCategory, fetchCategory, sendImageFile } from '../api/apiService';

class HomeModel {
  constructor() {
    this.categories = [];
    this.selectedAlbumCategory = '';
    this.uploadFile = null;
  }

  async fetchCategories() {
    try {
      const resData = await fetchCategory();
      this.categories = resData.data;
      return this.categories;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }

  async addCategory(title) {
    try {
      const formdata = new FormData();
      formdata.append('title', title);
      formdata.append('description', 'This album contains a lot of dank memes. Be prepared.');
      await addNewCategory(formdata);
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
      const formdata = new FormData();
      formdata.append('image', this.uploadFile);
      formdata.append('type', 'image');
      formdata.append('title', 'Upload Image');
      formdata.append('description', 'Uploaded via browser.');

      const result = await sendImageFile(formdata, this.selectedAlbumCategory);
      return result;
    } catch (error) {
      console.error('Failed to submit image:', error);
      throw error;
    }
  }
}

export default HomeModel;
