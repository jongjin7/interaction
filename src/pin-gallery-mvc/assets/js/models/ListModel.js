import ApiService from '../../../../../client-services/pin-gallery-service/ApiService';

export default class ListModel {
  constructor() {
    this.categoryData = [];
    this.galleryPanelItems = [];
  }

  async fetchCategoryData() {
    try {
      const categoryLabels = await ApiService.fetchCategory();
      this.categoryData = Array.isArray(categoryLabels) ? categoryLabels : [];
      return this.categoryData;
    } catch (error) {
      console.error('Failed to fetch category data:', error);
      this.categoryData = [];
      return [];
    }
  }

  async fetchGalleryData() {
    try {
      if (!this.categoryData.length) {
        console.warn('No category data available.');
        this.galleryPanelItems = [];
        return [];
      }

      this.galleryPanelItems = this.categoryData.map((item) => item.images || []);
      return this.galleryPanelItems;
    } catch (error) {
      console.error('Failed to fetch gallery data:', error);
      this.galleryPanelItems = [];
      return [];
    }
  }

  static async deleteImage(imageId) {
    try {
      await ApiService.deleteImageItem(imageId);
    } catch (error) {
      console.error('Failed to delete image:', error);
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  findLongestArrayWithIndex(arr) {
    if (!Array.isArray(arr) || arr.length === 0 || !arr.every(Array.isArray)) {
      return { array: [], index: -1 };
    }

    return arr.reduce(
      (result, current, oindex) => {
        if (current.length > result.array.length) {
          return { array: current, index: oindex };
        }
        return result;
      },
      { array: arr[0] ?? [], index: 0 },
    );
  }

  getLongestArrayItem(returnType) {
    if (!this.galleryPanelItems.length) {
      console.warn('No gallery data available.');
      return returnType === 'index' ? -1 : { array: [], index: -1 };
    }

    const longestArrayData = this.findLongestArrayWithIndex(this.galleryPanelItems);
    return returnType === 'index' ? longestArrayData.index : longestArrayData;
  }

  getRandomItems(arr, numItems) {
    if (!Array.isArray(arr) || arr.length === 0) {
      console.warn('No valid data available for random selection.');
      return [];
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
    if (!this.galleryPanelItems.length) {
      console.warn('No gallery items available.');
      return [];
    }
    return this.getRandomItems(this.galleryPanelItems.flat(), sliceLength);
  }
}
