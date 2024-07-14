import EventManager from '../components/EventManager';
import { galleryDetail, galleryList } from '../../css/pages.css';
import { buttonOutlineClass, buttonSizeSmall } from '../utils/tailwind.component';
import { buttonDelete } from '../components/CommonTemplate';
import {
  getElements,
  handleEnableImageDeleteToggle,
  handleImageDeleteClick,
  handleImageLinkClick,
  handleResize,
  handleScroll,
  handleTabNavClick,
} from './ListEventHandler';

import { fetchCategory, fetchGalleryList } from '../utils/api';
import { DomParser } from '../utils/dom';

export default class ListFrame {
  constructor(containerId) {
    this.root = document.querySelector(containerId);
    this.eventManager = new EventManager();
    this.prevTabIndex = 0;
    this.currentTabIndex = 0;
    this.galleryPanelPositions = [];
    this.galleryPanel = null;
    this.galleryPanelItems = null;

    this.container = this.root.querySelector('.page-container');
  }

  async loadData() {
    const categoryLabels = await fetchCategory();
    this.categoryData = categoryLabels.data;
    const categoryIds = this.categoryData.map((item) => item.id);
    const galleryAlbums = await fetchGalleryList(categoryIds);
    this.galleryPanelItems = galleryAlbums.map((item) => item.data);
    // 가장 등록을 많이한 앨범 추출
    function findLongestArrayWithIndex(arr) {
      if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('Input must be a non-empty 2D array');
      }

      return arr.reduce(
        (result, current, index) => {
          if (current.length > result.array.length) {
            return { array: current, index: index };
          } else {
            return result;
          }
        },
        { array: arr[0], index: 0 },
      );
    }

    this.longestArrayItem = (returnType) => {
      const longestArrayData = findLongestArrayWithIndex(this.galleryPanelItems);

      switch (returnType) {
        case 'total':
          return longestArrayData.array;
        case 'index':
          return longestArrayData.index;
        default:
          return longestArrayData.array.slice(0, returnType ?? 8);
      }
    };

    // 전체배열에서 랜덤하게 추출
    function getRandomItems(arr, numItems) {
      if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
      }
      if (numItems > arr.length) {
        return arr;
      }

      // Fisher-Yates shuffle algorithm
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
      }

      return arr.slice(0, numItems);
    }
    this.randomArrayItem = (sliceLength = 8) => getRandomItems(this.galleryPanelItems.flat(), sliceLength);

    this.render();
  }

  generateListItem(list) {
    return list
      .map((item) => {
        return `<li class="list-item">
                ${buttonDelete(item.id)}
                <a href="#" title="${item.title ?? new Date(item.datetime * 1000).toDateString()}" data-item-id="${item.id}"><img src="${item.link}" alt="${item.description}"></a>
            </li>`;
      })
      .join(' ');
  }

  generateTabMenu() {
    const menu = this.categoryData.map((item) => `<a href="">${item.title}</a>`).join('');
    const html = `<div class="tabs">
                <div class="tab-nav text-gray-400">
                    <a href="">전체</a>
                    ${menu}
                </div>
            </div>`;

    return html;
  }

  generateTabContent() {
    const panelTitle = (info) => `
            <div class="title">
                <h2 class="font-semibold">${info.title} ${!info.subtitle && info.itemLength ? `(${info.itemLength})` : ''}</h2>
                ${info.subtitle ? `<small class="text-gray-500">${info.subtitle}(${info.itemLength})</small>` : ''}
            </div>`;

    const allContentPanel = () => {
      const html = `
                <div class="gallery-list ${galleryList}">
                    <div class="list-header">
                        ${panelTitle({ title: '전체' })}
                    </div>
                    <ul class="list">
                       ${this.generateListItem(this.randomArrayItem())}
                    </ul>
                </div>
                    
                <div class="gallery-list ${galleryList}">
                    <div class="list-header">
                        ${panelTitle({
                          title: '인기 카테고리',
                          subtitle: this.categoryData[this.longestArrayItem('index')].title,
                          itemLength: this.longestArrayItem('total').length,
                        })}
                    </div>
                    <ul class="list">
                       ${this.generateListItem(this.longestArrayItem())}
                    </ul>
                </div>`;
      return html;
    };

    const contentPanel = () => {
      const listTemplate = (item, index) => `
                <div class="gallery-list ${galleryList}"> 
                    <div class="list-header">
                        ${panelTitle({ title: this.categoryData[index].title, itemLength: item.length })}
                        <button type="button" class="${buttonOutlineClass} ${buttonSizeSmall} btn-del-sel">선택 삭제</button>
                    </div>
                    <ul class="list">
                       ${this.generateListItem(item)}
                    </ul>
                </div>`;

      const tabPanel = (item, index) => `
                <div class="tab-panel" id="tab-panel-${index + 1}">
                    ${listTemplate(item, index)}
                </div>`;

      return this.galleryPanelItems
        .map((item, index) => {
          return tabPanel(item, index);
        })
        .join('');
    };

    const html = `
            <div id="el-tab-contents" class="tab-contents">
                <!-- tab all -->
                <div class="tab-panel" id="tab-panel-0">
                    ${allContentPanel()}
                </div>
                <!-- 카테고리와 매핑된 리스트 패널 -->
                ${contentPanel()}
            </div>
        `;

    return html;
  }

  generateDetailPanel() {
    return `<div class="${galleryDetail}">
                    <div class="inner">
                        <img class="img" src="" alt="">
                        <button type="button" class="btn-close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"" viewBox="0 0 16 16">
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </button>
                    </div>
                </div>`;
  }

  createContentHTML(data) {
    const htmlData = `
            <!--<div class="page-header">-->
            <!--    <h1 class="text-2xl text-neutral-900">갤러리 상세</h1>-->
            <!--</div>-->
            
            ${this.generateTabMenu()}
            ${this.generateTabContent()}`;

    this.container.innerHTML = htmlData;

    // 상세페이지
    this.root.append(DomParser(this.generateDetailPanel()));
  }

  render() {
    this.createContentHTML();
    getElements(this.root, this.container, this.eventManager);
    this.bindEvents();
  }

  initGalleryPanel() {
    // 닫기 할때 초기화
    this.galleryPanel.scrollTo(this.galleryPanelPositions[0], 0);
    this.galleryPanelItems[0].scrollTo(0, 0);
  }

  bindEvents() {
    this.galleryPanel = document.querySelector('#el-tab-contents');
    this.galleryPanelItems = this.galleryPanel.querySelectorAll('.tab-panel');

    // 상세보기
    this.eventManager.delegateEvent('.gallery-list .list-item a', 'click', handleImageLinkClick);

    this.eventManager.delegateEvent('.gallery-list .btn-delete', 'click', handleImageDeleteClick);

    this.eventManager.delegateEvent('.gallery-list .btn-del-sel', 'click', handleEnableImageDeleteToggle);

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
      handleScroll(this.galleryPanel, this.galleryPanelPositions, this.galleryPanelItems, tabNav, this.prevTabIndex),
    );

    this.initGalleryPanel();
    tabNav[0].classList.add('bg-gray-700', 'text-white');
  }
}
