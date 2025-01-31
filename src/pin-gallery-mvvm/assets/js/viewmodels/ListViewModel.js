import ListModel from '../models/ListModel';
import ListView from '../views/ListView';

export default class ListViewModel {
  prevTabIndex = 0;

  currentTabIndex = 0;

  constructor(containerId) {
    this.model = new ListModel();
    this.view = new ListView(containerId);
    this.root = document.querySelector(containerId);
  }

  async initialize() {
    const loadData = await this.loadDataHandler();
    this.view.render(...loadData);
    this.bindEvents();
  }

  async loadDataHandler() {
    const categoryData = await this.model.fetchCategoryData();
    const galleryData = await this.model.fetchGalleryData(categoryData.map((cat) => cat.id));
    const longestArrayItem = this.model.getLongestArrayItem();
    const randomArrayItem = this.model.getRandomArrayItem();
    // 데이터 가공
    return [
      this.processCategoryData(categoryData),
      this.processGalleryPanelItems(galleryData),
      this.processLongestArrayItem(longestArrayItem),
      this.processRandomArrayItem(randomArrayItem),
    ];
  }

  processCategoryData(data) {
    return Array.isArray(data) ? data : [];
  }

  processGalleryPanelItems(items) {
    return Array.isArray(items) ? items : [];
  }

  processLongestArrayItem(item) {
    return item || { array: [], index: 0 };
  }

  processRandomArrayItem(item) {
    return Array.isArray(item) ? item : [];
  }

  async updateList() {
    console.log('update!');
    const loadData = await this.loadDataHandler();
    this.view.render(...loadData);
  }

  bindEvents() {
    this.view.setEventHandlers(this.getHandlers());
    this.view.bindEvents();
  }

  getHandlers() {
    return {
      handleTabNavClick: this.handleTabNavClick.bind(this),
      handleItemClick: this.handleItemClick.bind(this),
      handleItemDeleteClick: this.handleItemDeleteClick.bind(this),
      handleToggleDeleteMode: this.handleToggleDeleteMode.bind(this),
      handleScrollTabPanelContainer: this.handleScrollTabPanelContainer.bind(this),
    };
  }

  initGalleryPanel() {
    // 리스트 닫을때 초기화
    this.view.tabPanelContainer.scrollTo(0, 0);
    this.view.tabPanels[0].scrollTo(0, 0);
    if (this.root.classList.contains('show-detail')) {
      this.view.detailPanel.querySelector('.btn-close').click();
    }
  }

  changeTabPanel(idx) {
    this.view.tabPanelContainer.scrollTo(this.view.tabPanelPositions[idx], 0);
  }

  setActiveTab(tabIdx) {
    this.view.tabNavs.forEach((nav, idx) => {
      nav.classList.toggle('bg-gray-700', idx === tabIdx);
      nav.classList.toggle('text-white', idx === tabIdx);

      if (nav.classList.contains('bg-gray-700')) {
        nav.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    });
  }

  handleTabNavClick(e, idx) {
    e.preventDefault();
    this.changeTabPanel(idx);
    this.setActiveTab(idx);
  }

  handleScrollTabPanelContainer() {
    let isScrolling;
    const endDelayTime = 60;
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      this.prevTabIndex = this.currentTabIndex;
      // console.log('------ Scrolling has stopped.');
      this.view.tabPanelPositions.forEach((position, index) => {
        if (this.view.tabPanelContainer.scrollLeft === position) {
          this.currentTabIndex = index;
          this.view.tabPanels[this.prevTabIndex].scrollTo(0, 0);
          this.setActiveTab(index);
        }
      });

      isScrolling = null;
    }, endDelayTime);
  }

  handleItemClick(e) {
    e.preventDefault();
    const imgEl = this.view.detailPanel.querySelector('.img');
    const clickedImage = e.target.closest('a')?.querySelector('img');

    if (clickedImage) {
      imgEl.src = clickedImage.src;
      this.root.classList.add('show-detail');

      const handleCloseDetail = () => {
        this.root.classList.remove('show-detail');
        const handleTransitionend = () => {
          imgEl.src = '';
          this.view.container.removeEventListener('transitionend', handleTransitionend);
        };
        this.view.container.addEventListener('transitionend', handleTransitionend);
      };

      this.view.detailPanel.querySelector('.btn-close').addEventListener('click', handleCloseDetail);
    }
  }

  handleItemDeleteClick(e) {
    const targetBtn = e.currentTarget;
    targetBtn.classList.add('selected');
    setTimeout(async () => {
      if (window.confirm('현재 선택된 아이템을 삭제할까요?')) {
        try {
          await ListModel.deleteImage(targetBtn.dataset.itemId);
          alert('선택한 이미지가 삭제되었습니다.');
          await this.updateList();
        } catch (error) {
          console.error('Failed to delete image:', error);
        }
      }
      targetBtn.classList.remove('selected');
    }, 30);
  }

  handleToggleDeleteMode(e) {
    const targetBtn = e.target;
    if (targetBtn.classList.contains('btn-del-sel')) {
      const currentPanel = targetBtn.closest('.tab-panel');
      if (currentPanel) {
        currentPanel.classList.toggle('is-removable');
      }
    }
  }
}
