import EventManager from "../components/EventManager";
import {galleryList,} from "../../css/pages.css";
import {
    buttonDangerClass,
    buttonOutlineClass,
    buttonSizeSmall,
    buttonDisabledClass
} from '../utils/tailwind.component';
import {buttonDelete} from '../components/CommonTemplate';
import {
    handleButtonGroupClick,
    handleDeleteButtonClick,
    handleResize,
    handleScroll,
    handleTabNavClick
} from './ListEventHandler';

export default class ListFrame {
    constructor(containerId) {
        this.eventManager = new EventManager();
        this.prevTabIndex = 0;
        this.currentTabIndex = 0;
        this.galleryPanelPositions = [];
        this.galleryPanel = null;
        this.galleryPanelItems = null;


        this.htmlData = '';
        this.galleryData = [
            {category: '배경', lists: [...new Array(20)]},
            {category: '건축물', lists: [...new Array(7)]},
            {category: '자연', lists: [...new Array(11)]},
        ]
        this.container = document.querySelector(containerId).querySelector('.page-container');
    }

    async loadData() {
        //const listData = await fetchData);
        this.createContentHTML();
        this.render();
    }

    generateListItem(num) {
        let list = ''

        const html = () => {
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return (Math.random() * (max - min + 1) + min).toFixed(2); // min (포함) 과 max (포함) 사이의 정수 반환
            }

            const randomRatio = getRandomInt(1, 1.5);

            const w = 100;
            const h = Math.ceil(w * randomRatio);
            return `<li class="list-item">
                ${buttonDelete}
                <a href="" target="_blank" title="이미지"><img src="https://picsum.photos/${w}/${h}" alt=""></a>
            </li>`
        };

        [...new Array(num)].forEach(() => {
            list += html()
        })

        return list;
    }

    generateTabMenu() {
        const menu = this.galleryData.map(item => `<a href="">${item.category}</a>`).join('')
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
            </div>
        `
        const allContentPanel = () => {
            const html = `
                <div class="gallery-list ${galleryList}">
                    <div class="btn-group">
                        <button type="button" class="${buttonDangerClass} ${buttonSizeSmall} ${buttonDisabledClass} btn-del-all" disabled="disabled">카테고리 전체 삭제</button>
                        <button type="button" class="${buttonOutlineClass} ${buttonSizeSmall} btn-del-sel">선택 삭제</button>
                    </div>
                    <div class="list-header">
                        ${panelTitle({title: '전체'})}
                    </div>
                    <ul class="list">
                       ${this.generateListItem(14)}
                    </ul>
                        
                </div>
                    
                <div class="gallery-list ${galleryList}">
                    <div class="list-header">
                        ${panelTitle({title: '인기 카테고리', subtitle: '건물', itemLength: 99})}
                    </div>
                    <ul class="list">
                       ${this.generateListItem(8)}
                    </ul>
                </div>`;
            return html;
        }

        const contentPanel = () => {
            const listTemplate = (item) => `
                <div class="gallery-list ${galleryList}"> 
                    <div class="list-header">
                        ${panelTitle({title: item.category, itemLength: item.lists.length})}
                    </div>
                    <ul class="list">
                       ${this.generateListItem(item.lists.length)}
                    </ul>
                    <div class="btn-group">
                        <button type="button" class="${buttonDangerClass} ${buttonSizeSmall} ${buttonDisabledClass} btn-del-all" disabled="disabled">카테고리 전체 삭제</button>
                        <button type="button" class="${buttonOutlineClass} ${buttonSizeSmall} btn-del-sel">선택 삭제</button>
                    </div>
                </div>`;

            const tabPanel = (item, index) => `
                <div class="tab-panel" id="tab-panel-${index + 1}">
                    ${listTemplate(item)}
                </div>`;

            return this.galleryData.map((item, index) => {
                return tabPanel(item, index)
            }).join('');
        }

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

    createContentHTML(data) {
        this.htmlData = `
            <!--<div class="page-header">-->
            <!--    <h1 class="text-2xl text-neutral-900">갤러리 상세</h1>-->
            <!--</div>-->
            
            ${this.generateTabMenu()}
            ${this.generateTabContent()}`;
    }

    render() {
        this.container.innerHTML = this.htmlData;
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

        this.eventManager.delegateEvent('.gallery-list .btn-group > button', 'click', (e) => {
            handleButtonGroupClick(e);
        });

        this.eventManager.delegateEvent('.gallery-list .btn-delete', 'click', (e) => {
            handleDeleteButtonClick(e);
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

        this.galleryPanel.addEventListener('scroll', handleScroll(this.galleryPanel, this.galleryPanelPositions, this.galleryPanelItems, tabNav, this.prevTabIndex));

        this.initGalleryPanel();
        tabNav[0].classList.add('bg-gray-700', 'text-white');
    }
}
