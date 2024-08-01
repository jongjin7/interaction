import PageModel from '../models/PageModel';
import LayoutView from '../views/LayoutView';
import HomeController from './HomeController';
import ListController from './ListController';

import { pageTypeMain, pageTypeList } from '../../css/pages.css';

export default class LayoutController {
  constructor(containerId) {
    this.model = new PageModel(); // 모델은 페이지 상태를 관리합니다.
    this.view = new LayoutView(containerId); // View는 화면을 구성합니다.
    this.homeController = null;
    this.listController = null;
  }

  async init() {
    this.view.renderLoading(); // 로딩 화면을 먼저 렌더링합니다.
    await this.setupLayout(); // 레이아웃을 설정합니다.
    this.view.hideLoading(); // 로딩 화면을 숨깁니다.
    this.bindEvents(); // 이벤트 바인딩을 합니다.
  }

  async setupLayout() {
    const pageList = [
      { id: 'home', className: pageTypeMain },
      { id: 'list', className: pageTypeList },
    ];

    this.view.createPageFrames(pageList); // 페이지 프레임을 생성합니다.

    // Home과 List 페이지를 초기화합니다.
    this.homeController = new HomeController('#home');
    await this.homeController.initialize(); // Home 페이지 컨트롤러 초기화

    this.listController = new ListController('#list');
    await this.listController.initialize(); // List 페이지 컨트롤러 초기화
  }

  bindEvents() {
    const setCurrentPage = () => {
      const currentPage = this.model.togglePage(); // 현재 페이지를 토글합니다.
      this.view.updateCurrentPage(currentPage); // View를 업데이트합니다.

      if (currentPage === 'home') {
        this.listController.initGalleryPanel(); // Home 페이지에 대한 처리를 합니다.
      } else {
        document.body.scrollIntoView(); // 페이지가 변경되면 스크롤을 조정합니다.
      }
    };

    const homeToggleButton = document.querySelector('#home').querySelector('.btn-toggle');
    homeToggleButton.onclick = setCurrentPage; // 버튼 클릭 시 페이지를 토글합니다.
  }
}
