import {deleteImageItem} from "../utils/api";
import { galleryDetail } from '../../css/pages.css';

let root, pageContainer, eventModule;
let prevTabIndex = 0;
let currentTabIndex = 0;

export function getElements(rootEl, container, eventManager) {
    eventModule = eventManager;
    root = rootEl;
    pageContainer = container;
}

export function handleEnableImageDeleteToggle(e) {
    const targetBtn = e.target;
    const currentPanel = targetBtn.closest('.tab-panel');

    if (targetBtn.classList.contains('btn-del-sel')) {
        currentPanel.classList.toggle('is-removable');
    }
}

export function handleImageDeleteClick(e) {
    const targetBtn = e.target.classList.contains('.btn-delete') ? e.target : e.target.closest('button');
    targetBtn.classList.add('selected');
    setTimeout(() => {
        const isYes = window.confirm('현재 선택된 아이템을 삭제할가요?');
        if (isYes) {
            const result = deleteImageItem(targetBtn.dataset.itemId);
            result.then(() => {
                alert('선택한 이미지가 삭제되었습니다.')
            })
        }
        targetBtn.classList.remove('selected');
    }, 30);
}

export function handleResize(galleryPanelItems) {
    return () => {
        return Array.from(galleryPanelItems).map((item) => item.offsetLeft);
    };
}

export function handleScroll(galleryPanel, galleryPanelPositions, galleryPanelItems, tabNav) {
    let isScrolling;
    const endDelayTime = 60;

    return () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            prevTabIndex = currentTabIndex;
            console.log('------ Scrolling has stopped.');
            galleryPanelPositions.forEach((position, index) => {
                if (galleryPanel.scrollLeft === position) {
                    currentTabIndex = index;
                    tabNav.forEach((nav, idx) => {
                        nav.classList.toggle('bg-gray-700', idx === index);
                        nav.classList.toggle('text-white', idx === index);
                    });
                    galleryPanelItems[prevTabIndex].scrollTo(0, 0);
                }
            });

            isScrolling = null;
        }, endDelayTime);
    };
}

export function handleTabNavClick(e, galleryPanel, galleryPanelPositions, idx) {
    e.preventDefault();
    galleryPanel.scrollTo(galleryPanelPositions[idx], 0);
}

export function handleImageLinkClick(e){
    e.preventDefault();
    const detailPanel = root.querySelector(`.${galleryDetail}`);
    const imgEl = detailPanel.querySelector('.img');

    pageContainer.style.marginLeft = `-100%`;
    imgEl.src = e.target.src;

    eventModule.delegateEvent(`#list .btn-close`, 'click', handleCloseDetail);

    function handleCloseDetail (){
        pageContainer.style.marginLeft = 0;

        const handleTransitionend = ()=>{
            imgEl.src = '';
            pageContainer.removeEventListener('transitionend', handleTransitionend);
        }
        pageContainer.addEventListener('transitionend', handleTransitionend);
    }
}
