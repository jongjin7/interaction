import { galleryDetail, galleryList } from '../../css/pages.css';
import { buttonOutlineClass, buttonSizeSmall } from '../../css/tailwind.component';
import { buttonDelete } from '../components/CommonTemplate';
import DomParser from '../utils/dom';

export default class ListView {
  constructor(containerId) {
    this.root = document.querySelector(containerId);
    this.container = this.root.querySelector('.page-container');
    this.detailPanel = null; // Will be set in createContentHTML
  }

  render(categoryData, galleryPanelItems, longestArrayItem, randomArrayItem) {
    this.categoryData = categoryData;
    this.galleryPanelItems = galleryPanelItems;
    this.longestArrayItem = longestArrayItem;
    this.randomArrayItem = randomArrayItem;

    this.createContentHTML();
    this.bindEvents();
  }

  createContentHTML() {
    const htmlData = `
      ${this.generateTabMenu()}
      ${this.generateTabContent()}
    `;
    this.container.innerHTML = htmlData;

    // Append detail panel to root
    this.detailPanel = DomParser(this.generateDetailPanel());
    this.root.append(this.detailPanel);
  }

  bindEvents() {
    this.root.querySelectorAll('.tab-nav a').forEach((tabNav, idx) => {
      tabNav.addEventListener('click', (e) => this.handleTabNavClick(e, idx));
    });

    this.root.querySelectorAll('.list-item a').forEach((item) => {
      item.addEventListener('click', (e) => this.handleItemClick(e));
    });

    this.root.querySelectorAll('.btn-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleDelete(e));
    });

    this.root.querySelectorAll('.btn-del-sel').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleEnableImageDeleteToggle(e));
    });
  }

  generateTabMenu() {
    const menu = this.categoryData.map((item) => `<a href='#' data-index='${item.index}'>${item.title}</a>`).join('');
    const html = `<div class='tabs'>
      <div class='tab-nav text-gray-400'>
        <a href='#' data-index='0'>전체</a>
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

    const allContentPanel = () => `
      <div class='gallery-list ${galleryList}'>
        <div class='list-header'>
          ${panelTitle({ title: '전체 랜덤' })}
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

    return `
      <div id='el-tab-contents' class='tab-contents'>
        <div class='tab-panel' id='tab-panel-0'>
          ${allContentPanel()}
        </div>
        ${contentPanel()}
      </div>
    `;
  }

  generateListItem(list) {
    const changeImageSize = (url) => {
      const suffix = 'h';
      return url.replace(/\/([^\/?#]+)(?=[^\/]*$)/, (match, filename) => {
        const [name, extension] = filename.split('.');
        return `/${name}${suffix}.${extension}`;
      });
    };

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

  handleTabNavClick(e, idx) {
    e.preventDefault();
    const tabPanel = this.root.querySelector(`#tab-panel-${idx}`);
    tabPanel.scrollIntoView({ behavior: 'smooth' });
  }

  handleItemClick(e) {
    e.preventDefault();
    const imgEl = this.detailPanel.querySelector('.img');
    imgEl.src = e.target.src;
    this.root.classList.add('show-detail');
    this.detailPanel.querySelector('.btn-close').addEventListener('click', () => {
      this.root.classList.remove('show-detail');
      imgEl.src = '';
    });
  }

  handleDelete(e) {
    // Implement deletion logic if necessary
  }

  handleEnableImageDeleteToggle(e) {
    const targetBtn = e.target;
    const currentPanel = targetBtn.closest('.tab-panel');
    if (targetBtn.classList.contains('btn-del-sel')) {
      currentPanel.classList.toggle('is-removable');
    }
  }
}
