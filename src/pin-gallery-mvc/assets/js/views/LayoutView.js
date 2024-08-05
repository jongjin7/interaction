import DomParser from '../utils/dom';
import { LoadingBasic as Loading } from '../components/Loading';

export default class LayoutView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    this.loadingElement = Loading('app-loading');
  }

  attachAppLoading() {
    document.body.append(DomParser(this.loadingElement));
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

  static updateCurrentPage(currentPage) {
    document.body.dataset.currentPage = currentPage;
  }
}
