import ApiService from '../services/ApiService';

export default class ListModel {
  constructor() {
    this.categoryData = [];
    this.galleryPanelItems = [];
  }

  async fetchCategoryData() {
    try {
      const categoryLabels = await ApiService.fetchCategory();
      this.categoryData = categoryLabels.data;
      return this.categoryData;
    } catch (error) {
      console.error('Failed to fetch category data:', error);
      throw error;
    }
  }

  async fetchGalleryData(categoryIds) {
    try {
      const galleryAlbums = await ApiService.fetchGalleryList(categoryIds);
      this.galleryPanelItems = galleryAlbums.map((item) => item.data);
      return this.galleryPanelItems;
    } catch (error) {
      console.error('Failed to fetch gallery data:', error);
      throw error;
    }
  }

  async deleteImage(imageId) {
    try {
      await ApiService.deleteImageItem(imageId);
    } catch (error) {
      console.error('Failed to delete image:', error);
      throw error;
    }
  }

  findLongestArrayWithIndex(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Input must be a non-empty 2D array');
    }
    return arr.reduce(
      (result, current, oindex) => {
        if (current.length > result.array.length) {
          return { array: current, index: oindex };
        }
        return result;
      },
      { array: arr[0], index: 0 },
    );
  }

  getLongestArrayItem(returnType) {
    const longestArrayData = this.findLongestArrayWithIndex(this.galleryPanelItems);
    if (returnType === 'index') {
      return longestArrayData.index;
    }
    return longestArrayData;
  }

  getRandomItems(arr, numItems) {
    if (!Array.isArray(arr)) {
      throw new Error('Input must be an array');
    }
    if (numItems > arr.length) {
      return arr;
    }
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, numItems);
  }

  getRandomArrayItem(sliceLength = 8) {
    return this.getRandomItems(this.galleryPanelItems.flat(), sliceLength);
  }
}
