import EventManager from './EventManager.js';
import DomParser from '../utils/dom';
import { LoadingBasic as Loading } from './Loading';
import HomeFrame from '../pages/Home';
import ListFrame from '../pages/List';

export default class Layout {
  constructor(containerId) {
    this.frameHome = '';
    this.frameList = '';
    this.currentPage = 'home';
    this.container = document.querySelector(containerId);
    this.eventManager = new EventManager();
  }

  createBaseLayout(content) {
    document.body.append(DomParser(Loading('app-loading')));
    setTimeout(() => {
      const appLoading = document.querySelector('#el-app-loading');
      appLoading.classList.add('fadeout');
      this.container.classList.remove('fadeout');

      this.createPageFrames(content);

      // 임시
      this.frameHome = new HomeFrame('#home');
      this.frameHome.loadData();
      this.frameList = new ListFrame('#list');
      this.frameList.loadData();

      appLoading.addEventListener('transitionend', () => {
        appLoading.remove();
        document.body.dataset.currentPage = 'home';
      });

      // 레이아웃에서 관리하는 이벤트
      this.bindEvents();
    }, 1000);
  }

  createPageFrames(pages) {
    pages.forEach((page) => {
      const { id, className } = page;
      const pageFrameHTML = `
                <div id="${id}" class="page-panel ${className}">
                    <div class="page-container"></div>
                </div>
            `;
      this.container.append(DomParser(pageFrameHTML));
    });
  }

  bindEvents() {
    const setCurrentPage = () => {
      this.currentPage = this.currentPage === 'home' ? 'list' : 'home';
      document.body.dataset.currentPage = this.currentPage;
      if (this.currentPage === 'home') this.frameList.initGalleryPanel();
    };

    // 홈과 리스트 전환
    const homeToggleButton = document.querySelector('#home').querySelector('.btn-toggle');
    homeToggleButton.onclick = setCurrentPage;
  }
}
