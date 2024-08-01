import ListModel from '../models/ListModel';
import ListView from '../views/ListView';

export default class ListController {
  constructor(containerId) {
    this.model = new ListModel();
    this.view = new ListView(containerId);
  }

  async initialize() {
    try {
      const categoryData = await this.model.fetchCategoryData();
      const galleryData = await this.model.fetchGalleryData(categoryData.map((cat) => cat.id));
      const longestArrayItem = this.model.getLongestArrayItem('total');
      const randomArrayItem = this.model.getRandomArrayItem();

      this.view.render(categoryData, galleryData, longestArrayItem, randomArrayItem);
      this.bindEvents();
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }

  bindEvents() {
    this.view.bindEvents(this.getHandlers());
  }

  getHandlers() {
    return {
      handleTabChange: this.handleTabChange.bind(this),
      handleItemClick: this.handleItemClick.bind(this),
      handleDelete: this.handleDelete.bind(this),
    };
  }

  async handleDelete(event) {
    const targetBtn = event.target.closest('button');
    if (targetBtn) {
      const imageId = targetBtn.dataset.itemId;
      if (confirm('현재 선택된 아이템을 삭제할까요?')) {
        await this.model.deleteImage(imageId);
        alert('선택한 이미지가 삭제되었습니다.');
        this.initialize(); // Reinitialize to refresh data
      }
    }
  }

  handleTabChange(event) {
    // Implement tab change logic
  }

  handleItemClick(event) {
    // Implement item click logic
  }
}
