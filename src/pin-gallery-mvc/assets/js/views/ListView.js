// ListView.js
import { galleryDetail, galleryList } from '../../css/pages.css';
import { buttonOutlineClass, buttonSizeSmall } from '../../css/tailwind.component';
import { buttonDelete } from '../components/CommonTemplate';
import DomParser from '../utils/dom';

export default class ListView {
  constructor(containerId) {
    this.root = document.querySelector(containerId);
    this.container = this.root.querySelector('.page-container');
  }

  renderLoading() {
    this.container.innerHTML = '<p>Loading...</p>';
  }

  hideLoading() {
    this.container.innerHTML = '';
  }

  showError(error) {
    this.container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }

  render(categoryData, galleryPanelItems, longestArrayItem, randomArrayItem) {
    this.categoryData = categoryData;
    this.galleryPanelItems = galleryPanelItems;
    this.longestArrayItem = longestArrayItem;
    this.randomArrayItem = randomArrayItem;

    this.createContentHTML();
  }

  createContentHTML() {
    const htmlData = `
      ${this.generateTabMenu()}
      ${this.generateTabContent()}
    `;
    this.container.innerHTML = htmlData;
    this.root.append(DomParser(this.generateDetailPanel()));
  }

  generateTabMenu() {
    const menu = this.categoryData.map((item) => `<a href=''>${item.title}</a>`).join('');
    const html = `<div class='tabs'>
      <div class='tab-nav text-gray-400'>
        <a href=''>전체 랜덤</a>
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
            ${panelTitle({ title: '전체' })}
          </div>
          <ul class='list'>
            ${this.generateListItem(this.randomArrayItem())}
          </ul>
        </div>
        <div class='gallery-list ${galleryList}'>
          <div class='list-header'>
            ${panelTitle({
              title: '인기 카테고리',
              subtitle: this.categoryData[this.longestArrayItem('index')].title,
              itemLength: this.longestArrayItem('total').length,
            })}
          </div>
          <ul class='list'>
            ${this.generateListItem(this.longestArrayItem())}
          </ul>
        </div>
      `;
      return html;
    };

    const contentPanel = () => {
      const listTemplate = (item, index) => `
        <div class='gallery-list ${galleryList}'> 
          <div class='list-header'>
            ${panelTitle({ title: this.categoryData[index].title, itemLength: item.length })}
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
          <img src='${changeImageSize(item.link)}' alt='${item.description}'>
        </a>
      </li>
    `,
      )
      .join(' ');
  }

  generateDetailPanel() {
    return `<div class='${galleryDetail}'>
      <div class='inner'>
        <img class='img' src='' alt=''>
        <button type='button' class='btn-close'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'" viewBox="0 0 16 16">
            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z'/>
          </svg>
        </button>
      </div>
    </div>`;
  }
}
