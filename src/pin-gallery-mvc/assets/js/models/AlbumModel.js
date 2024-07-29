// models/AlbumModel.js
import { addNewCategory, fetchCategory, sendImageFile } from '../utils/api';

export default class AlbumModel {
  constructor() {
    this.categories = [];
    this.selectedCategory = '';
  }

  async loadCategories() {
    const resData = await fetchCategory();
    this.categories = resData.data;
  }

  async addCategory(title) {
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', 'This albums contains a lot of dank memes. Be prepared.');
    await addNewCategory(formdata);
    await this.loadCategories();
  }

  async uploadImage(file, category) {
    const formdata = new FormData();
    formdata.append('image', file);
    formdata.append('type', 'image');
    formdata.append('title', '업로드용 파일');
    formdata.append('description', '새로운 곳에서 브라우저에서 올리는 것이다.');
    return await sendImageFile(formdata, category);
  }
}
