import DomParser from '../utils/dom';
import { LoadingBasic as Loading } from '../components/Loading';

export default class LayoutView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    this.loadingElement = Loading('app-loading');
  }

  renderLoading() {
    document.body.append(DomParser(this.loadingElement));
  }

  hideLoading() {
    const appLoading = document.querySelector('#el-app-loading');
    if (appLoading) {
      setTimeout(() => {
        appLoading.classList.add('fadeout');
        this.container.classList.remove('fadeout');
        appLoading.addEventListener('transitionend', () => {
          appLoading.remove();
          document.body.dataset.currentPage = 'home';
        });
      }, 0);
    }
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

  updateCurrentPage(currentPage) {
    document.body.dataset.currentPage = currentPage;
  }
}
