// ListController.js
import ListModel from '../models/ListModel';
import ListView from '../views/ListView';
import {
  initializeEventHandlers,
  handleEnableImageDeleteToggle,
  handleImageDeleteClick,
  handleImageLinkClick,
  handleResize,
  handleScroll,
  handleTabNavClick,
} from './ListEventHandler';

export default class ListController {
  constructor(containerId) {
    this.model = new ListModel();
    this.view = new ListView(containerId);
  }

  async initialize() {
    console.log('initialize called');
    try {
      this.view.renderLoading();
      const categoryData = await this.model.fetchCategoryData();
      // console.log('categoryData:', categoryData);
      const categoryIds = categoryData.map((item) => item.id);
      const galleryPanelItems = await this.model.fetchGalleryData(categoryIds);
      // console.log('galleryPanelItems:', galleryPanelItems);
      this.view.render(
        categoryData,
        galleryPanelItems,
        this.model.getLongestArrayItem.bind(this.model),
        this.model.getRandomArrayItem.bind(this.model),
      );
      this.setupEventHandlers();
    } catch (error) {
      console.error(error);
      this.view.showError(error);
    } finally {
      // this.view.hideLoading();
    }
  }

  setupEventHandlers() {
    this.galleryPanel = document.querySelector('#el-tab-contents');
    this.galleryPanelItems = this.galleryPanel.querySelectorAll('.tab-panel');

    initializeEventHandlers(this.view.root, this.view.container, this);

    document.querySelectorAll('.gallery-list .list-item a').forEach((el) => {
      el.addEventListener('click', handleImageLinkClick);
    });
    document.querySelectorAll('.gallery-list .btn-delete').forEach((el) => {
      el.addEventListener('click', handleImageDeleteClick);
    });
    document.querySelectorAll('.gallery-list .btn-del-sel').forEach((el) => {
      el.addEventListener('click', handleEnableImageDeleteToggle);
    });

    const getItemOffsetInfo = handleResize(this.galleryPanelItems);
    this.galleryPanelPositions = getItemOffsetInfo();
    window.addEventListener('resize', () => {
      this.galleryPanelPositions = getItemOffsetInfo();
    });

    const tabNav = document.querySelectorAll('.tab-nav > a');
    tabNav.forEach((nav, idx) => {
      nav.onclick = (e) => handleTabNavClick(e, this.galleryPanel, this.galleryPanelPositions, idx);
    });

    this.galleryPanel.addEventListener(
      'scroll',
      handleScroll(this.galleryPanel, this.galleryPanelPositions, this.galleryPanelItems, tabNav),
    );

    this.initGalleryPanel();
    tabNav[0].classList.add('bg-gray-700', 'text-white');
  }

  initGalleryPanel() {
    this.galleryPanel.scrollTo(this.galleryPanelPositions[0], 0);
    this.galleryPanelItems[0].scrollTo(0, 0);
    if (this.view.root.classList.contains('show-detail')) {
      const detailPanel = this.view.root.querySelector('.gallery-detail');
      detailPanel.querySelector('.btn-close').click();
    }
  }
}
