import { addNewCategory, fetchCategory, sendImageFile } from '../api/apiService';
import geoLocation from '../../../../pin-gallery/assets/js/utils/geoLocation';

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
      const msg = await geoLocation.init();
      const formdata = new FormData();
      formdata.append('image', this.uploadFile);
      formdata.append('type', 'image');
      formdata.append('title', msg ? msg.time : '제목 없음');
      formdata.append('description', msg ? msg.message : '설명 없음');

      return await sendImageFile(formdata, this.selectedAlbumCategory);
    } catch (error) {
      console.error('Failed to submit image:', error);
      throw error;
    }
  }
}

export default HomeModel;
