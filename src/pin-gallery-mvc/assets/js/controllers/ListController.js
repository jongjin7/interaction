import ListModel from '../models/ListModel';
import ListView from '../views/ListView';

export default class ListController {
  constructor(containerId) {
    this.model = new ListModel();
    this.view = new ListView(containerId);
    this.root = document.querySelector(containerId);
  }

  async initialize() {
    try {
      const categoryData = await this.model.fetchCategoryData();
      const galleryData = await this.model.fetchGalleryData(categoryData.map((cat) => cat.id));
      const longestArrayItem = this.model.getLongestArrayItem();
      const randomArrayItem = this.model.getRandomArrayItem();

      this.view.render(categoryData, galleryData, longestArrayItem, randomArrayItem);
      this.bindEvents();
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }

  bindEvents() {
    this.view.setEventHandlers(this.getHandlers());
    this.view.bindEvents();
  }

  getHandlers() {
    return {
      handleTabChange: this.handleTabChange.bind(this),
      handleItemClick: this.handleItemClick.bind(this),
      handleDelete: this.handleDelete.bind(this),
      handleEnableImageDeleteToggle: this.handleEnableImageDeleteToggle.bind(this),
      handleScrollTabPanelContainer: this.handleScrollTabPanelContainer.bind(this),
    };
  }

  async handleDelete(e) {
    const targetBtn = e.target.closest('button');
    if (targetBtn) {
      const imageId = targetBtn.dataset.itemId;
      if (confirm('현재 선택된 아이템을 삭제할까요?')) {
        try {
          await this.model.deleteImage(imageId);
          alert('선택한 이미지가 삭제되었습니다.');
          await this.initialize(); // Reinitialize to refresh data
        } catch (error) {
          console.error('Failed to delete image:', error);
        }
      }
    }
  }

  handleTabChange(e, idx) {
    this.changeTabContent(idx);
  }

  changeTabContent(idx) {
    const tabPanel = this.root.querySelector(`#tab-panel-${idx}`);
    tabPanel.scrollIntoView({ behavior: 'smooth' });
    this.changeTabState(idx);
  }

  handleScrollTabPanelContainer() {
    let isScrolling;
    const endDelayTime = 60;
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      // prevTabIndex = currentTabIndex;
      console.log('------ Scrolling has stopped.');
      this.view.tabPanelPositions.forEach((position, index) => {
        console.log('position', this.view.tabPanelContainer.scrollLeft, position);
        if (this.view.tabPanelContainer.scrollLeft === position) {
          // currentTabIndex = index;
          this.view.tabNavs.forEach((nav, idx) => {
            nav.classList.toggle('bg-gray-700', idx === index);
            nav.classList.toggle('text-white', idx === index);

            if (nav.classList.contains('bg-gray-700')) {
              nav.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
          });
          // galleryPanelItems[prevTabIndex].scrollTo(0, 0);
        }
      });

      isScrolling = null;
    }, endDelayTime);
  }

  changeTabState(tabIdx) {
    this.view.tabNavs.forEach((nav, idx) => {
      nav.classList.toggle('bg-gray-700', idx === tabIdx);
      nav.classList.toggle('text-white', idx === tabIdx);

      if (nav.classList.contains('bg-gray-700')) {
        nav.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    });
  }

  handleItemClick(e) {
    e.preventDefault();
    const imgEl = this.detailPanel.querySelector('.img');
    const clickedImage = e.target.closest('a')?.querySelector('img');

    if (clickedImage) {
      imgEl.src = clickedImage.src;
      this.root.classList.add('show-detail');

      const handleCloseDetail = () => {
        this.root.classList.remove('show-detail');
        imgEl.src = '';
        this.detailPanel.querySelector('.btn-close').removeEventListener('click', handleCloseDetail);
      };

      this.detailPanel.querySelector('.btn-close').addEventListener('click', handleCloseDetail);
    }
  }

  handleEnableImageDeleteToggle(e) {
    const targetBtn = e.target;
    if (targetBtn.classList.contains('btn-del-sel')) {
      const currentPanel = targetBtn.closest('.tab-panel');
      if (currentPanel) {
        currentPanel.classList.toggle('is-removable');
      }
    }
  }
}
