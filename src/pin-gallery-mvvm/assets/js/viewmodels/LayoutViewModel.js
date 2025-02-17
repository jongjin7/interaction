import LayoutModel from '../models/LayoutModel';
import LayoutView from '../views/LayoutView';
import HomeViewModel from './HomeViewModel';
import ListViewModel from './ListViewModel';

import { pageTypeMain, pageTypeList } from '../../css/pages.css';

export default class LayoutViewModel {
  constructor(containerId) {
    this.model = new LayoutModel(); // 모델은 페이지 상태를 관리합니다.
    this.view = new LayoutView(containerId); // View는 화면을 구성합니다.
    this.homeViewModel = null;
    this.listViewModel = null;
  }

  async init() {
    this.view.attachAppLoading(); // 로딩 화면을 먼저 렌더링합니다.
    await this.setupLayout(); // 레이아웃을 설정합니다.
    this.hideLoading(); // 로딩 화면을 숨깁니다.
    this.bindEvents(); // 이벤트 바인딩을 합니다.
  }

  hideLoading() {
    const appLoading = document.querySelector('#el-app-loading');
    if (appLoading) {
      setTimeout(() => {
        appLoading.classList.add('fadeout');
        this.view.container.classList.remove('fadeout');
        appLoading.addEventListener('transitionend', () => {
          appLoading.remove();
          document.body.dataset.currentPage = 'home';
        });
      }, 0);
    }
  }

  async setupLayout() {
    const pageList = [
      { id: 'home', className: pageTypeMain },
      { id: 'list', className: pageTypeList },
    ];

    this.view.createPageFrames(pageList); // 페이지 프레임을 생성합니다.

    // Home과 List 페이지를 초기화합니다.
    this.homeViewModel = new HomeViewModel('#home');
    this.listViewModel = new ListViewModel('#list');

    await this.homeViewModel.initialize(this.listViewModel); // Home 페이지 컨트롤러 초기화
    await this.listViewModel.initialize(); // List 페이지 컨트롤러 초기화
  }

  bindEvents() {
    const setCurrentPage = () => {
      const currentPage = this.model.togglePage(); // 현재 페이지를 토글합니다.
      LayoutView.updateCurrentPage(currentPage); // View를 업데이트합니다.

      if (currentPage === 'home') {
        this.listViewModel.initGalleryPanel(); // Home 페이지에 대한 처리를 합니다.
      } else {
        document.body.scrollIntoView(); // 페이지가 변경되면 스크롤을 조정합니다.
      }
    };

    const homeToggleButton = document.querySelector('#home').querySelector('.btn-toggle');
    homeToggleButton.onclick = setCurrentPage; // 버튼 클릭 시 페이지를 토글합니다.
  }
}
