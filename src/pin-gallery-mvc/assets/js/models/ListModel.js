// ListModel.js
import { fetchCategory, fetchGalleryList, deleteImageItem } from '../utils/api';

export default class ListModel {
  async fetchCategoryData() {
    const categoryLabels = await fetchCategory();
    this.categoryData = categoryLabels.data;
    return this.categoryData;
  }

  async fetchGalleryData(categoryIds) {
    const galleryAlbums = await fetchGalleryList(categoryIds);
    this.galleryPanelItems = galleryAlbums.map((item) => item.data);
    return this.galleryPanelItems;
  }

  async deleteImage(imageId) {
    await deleteImageItem(imageId);
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
    switch (returnType) {
      case 'total':
        return longestArrayData.array;
      case 'index':
        return longestArrayData.index;
      default:
        return longestArrayData.array.reverse().slice(0, returnType ?? 8);
    }
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
