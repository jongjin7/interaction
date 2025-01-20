import { galleryDetail, galleryList } from '../../css/pages.css';
import { buttonOutlineClass, buttonSizeSmall } from '../../css/tailwind.component';
import { buttonDelete } from '../components/CommonTemplate';
import DomParser from '../utils/dom';

export default class ListView {
  constructor(containerId) {
    this.root = document.querySelector(containerId);
    this.container = this.root.querySelector('.page-container');
    this.tabNavs = null;
    this.tabPanelContainer = null;
    this.tabPanels = null;
    this.tabPanelPositions = [];
    this.detailPanel = null; // Will be set in createContentHTML
  }

  render(categoryData, galleryPanelItems, longestArrayItem, randomArrayItem) {
    this.categoryData = Array.isArray(categoryData) ? categoryData : [];
    this.galleryPanelItems = Array.isArray(galleryPanelItems) ? galleryPanelItems : [];
    this.longestArrayItem = longestArrayItem || { array: [], index: 0 };
    this.randomArrayItem = Array.isArray(randomArrayItem) ? randomArrayItem : [];

    this.createContentHTML();

    this.tabNavs = this.root.querySelectorAll('.tab-nav a');
    this.tabPanelContainer = this.root.querySelector('.tab-contents');
    this.tabPanels = this.root.querySelectorAll('.tab-panel');
    this.setOffsetTabPanels();

    this.bindEvents();
  }

  createContentHTML() {
    const htmlData = `
      ${this.generateTabMenu()}
      ${this.generateTabContent()}
    `;
    this.container.innerHTML = htmlData;

    // Append detail panel to root
    if (!this.detailPanel) {
      this.detailPanel = DomParser(this.generateDetailPanel());
      this.root.append(this.detailPanel);
    }
  }

  bindEvents() {
    if (this.eventHandlers) {
      const {
        handleTabNavClick,
        handleItemClick,
        handleItemDeleteClick,
        handleToggleDeleteMode,
        handleScrollTabPanelContainer,
      } = this.eventHandlers;

      // 탭 메뉴
      this.tabNavs.forEach((tabNav, idx) => {
        tabNav.addEventListener('click', (e) => handleTabNavClick(e, idx));
      });
      // this.tabNavs[0].classList.add('bg-gray-700', 'text-white');
      this.tabNavs[0].click();

      // 상세보기
      this.root.querySelectorAll('.list-item a').forEach((item) => {
        item.addEventListener('click', (e) => handleItemClick(e));
      });

      // delete Item
      this.root.querySelectorAll('.btn-delete').forEach((btn) => {
        btn.addEventListener('click', handleItemDeleteClick);
      });

      // 아이템 삭제 모드 토글
      this.root.querySelectorAll('.btn-del-sel').forEach((btn) => {
        btn.addEventListener('click', handleToggleDeleteMode);
      });

      // 패널 컨테이너 랩퍼
      this.root.querySelector('.tab-contents').addEventListener('scroll', (e) => handleScrollTabPanelContainer(e));

      // 패널 옵셋 위치 정보 재설정
      window.addEventListener('resize', this.setOffsetTabPanels.bind(this));
    }
  }

  setEventHandlers(handlers) {
    this.eventHandlers = handlers;
  }

  setOffsetTabPanels() {
    this.tabPanelPositions = Array.from(this.tabPanels).map((item) => item.offsetLeft);
  }

  /** ************************* Generate HTML ************************* */
  generateTabMenu() {
    const menu = this.categoryData.map((item) => `<a href='#'>${item.title}</a>`).join('');
    const html = `<div class='tabs'>
      <div class='tab-nav text-gray-400'>
        <a href='#'>전체</a>
        ${menu}
      </div>
    </div>`;
    return html;
  }

  generateTabContent() {
    const panelTitle = (info) => `
      <div class='title'>
        <h2 class='font-semibold'>${info.title} ${!info.subtitle && info.itemLength ? `(${info.itemLength})` : ''}</h2>
        ${info.subtitle ? `<small class='text-gray-500'>${info.subtitle}(${info.itemLength})</small>` : ''}
      </div>
    `;

    const allContentPanel = () => {
      const html = `
        <div class='gallery-list ${galleryList}'>
          <div class='list-header'>
            ${panelTitle({ title: '전체 랜덤' })}
          </div>
          <ul class='list'>
            ${this.generateListItem(this.randomArrayItem)}
          </ul>
        </div>
        <div class='gallery-list ${galleryList}'>
          <div class='list-header'>
            ${panelTitle({
              title: '인기 카테고리',
              subtitle: this.categoryData[this.longestArrayItem.index]?.title,
              itemLength: this.longestArrayItem.array?.length,
            })}
          </div>
          <ul class='list'>
            ${this.generateListItem(this.longestArrayItem.array)}
          </ul>
        </div>
      `;
      return html;
    };

    const contentPanel = () => {
      const listTemplate = (item, index) => `
        <div class='gallery-list ${galleryList}'> 
          <div class='list-header'>
            ${panelTitle({ title: this.categoryData[index]?.title, itemLength: item?.length })}
            <button type='button' class='${buttonOutlineClass} ${buttonSizeSmall} btn-del-sel'>선택 삭제</button>
          </div>
          <ul class='list'>
            ${this.generateListItem(item)}
          </ul>
        </div>
      `;

      const tabPanel = (item, index) => `
        <div class='tab-panel' id='tab-panel-${index + 1}'>
          ${listTemplate(item, index)}
        </div>
      `;
      return this.galleryPanelItems.map((item, index) => tabPanel(item, index)).join('');
    };
    const html = `
      <div id='el-tab-contents' class='tab-contents'>
        <div class='tab-panel' id='tab-panel-0'>
          ${allContentPanel()}
        </div>
        ${contentPanel()}
      </div>
    `;
    return html;
  }

  generateListItem(list) {
    if (!Array.isArray(list)) {
      console.error('generateListItem expects an array, but got:', list);
      return '';
    }

    function changeImageSize(url) {
      const suffix = 'h';
      return url.replace(/\/([^\/?#]+)(?=[^\/]*$)/, (match, filename) => {
        const parts = filename.split('.');
        const name = parts[0];
        const extension = parts[1];
        const newFileName = `${name}${suffix}.${extension}`;
        return `/${newFileName}`;
      });
    }

    return list
      .map(
        (item) => `
      <li class='list-item'>
        ${buttonDelete(item.id)}
        <a href='#' title='${item.title ?? new Date(item.datetime * 1000).toDateString()}' data-item-id='${item.id}'>
          <img src='${item.filePath}' alt='${item.description}'>
        </a>
      </li>
    `,
      )
      .join(' ');
  }

  generateDetailPanel() {
    return `<div class='gallery-detail ${galleryDetail}'>
      <div class='inner'>
        <img class='img' src='' alt=''>
        <button type='button' class='btn-close'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707 2.854 14.854a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z'/>
          </svg>
        </button>
      </div>
    </div>`;
  }
}
