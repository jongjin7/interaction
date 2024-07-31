// ListEventHandler.js
let root;
let pageContainer;
let controller;

export function initializeEventHandlers(rootEl, container, listController) {
  root = rootEl;
  pageContainer = container;
  controller = listController;
}

export function handleEnableImageDeleteToggle(e) {
  const targetBtn = e.target;
  const currentPanel = targetBtn.closest('.tab-panel');
  if (targetBtn.classList.contains('btn-del-sel')) {
    currentPanel.classList.toggle('is-removable');
  }
}

export async function handleImageDeleteClick(e) {
  const targetBtn = e.target.classList.contains('btn-delete') ? e.target : e.target.closest('button');
  const enableToggleButton = targetBtn.closest('.gallery-list').querySelector('.btn-del-sel');
  targetBtn.classList.add('selected');
  setTimeout(async () => {
    const isYes = window.confirm('현재 선택된 아이템을 삭제할까요?');
    if (isYes) {
      await controller.model.deleteImage(targetBtn.dataset.itemId);
      alert('선택한 이미지가 삭제되었습니다.');
      enableToggleButton.click();
      controller.initialize(); // 페이지 새로고침
    }
    targetBtn.classList.remove('selected');
  }, 30);
}

export function handleResize(galleryPanelItems) {
  return () => Array.from(galleryPanelItems).map((item) => item.offsetLeft);
}

export function handleScroll(galleryPanel, galleryPanelPositions, galleryPanelItems, tabNav) {
  let isScrolling;
  const endDelayTime = 60;

  return () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      const currentTabIndex = galleryPanelPositions.findIndex((position) => galleryPanel.scrollLeft === position);
      tabNav.forEach((nav, idx) => {
        nav.classList.toggle('bg-gray-700', idx === currentTabIndex);
        nav.classList.toggle('text-white', idx === currentTabIndex);
        if (nav.classList.contains('bg-gray-700')) {
          nav.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      if (currentTabIndex !== -1) {
        galleryPanelItems[currentTabIndex].scrollTo(0, 0);
      }
      isScrolling = null;
    }, endDelayTime);
  };
}

export function handleTabNavClick(e, galleryPanel, galleryPanelPositions, idx) {
  e.preventDefault();
  galleryPanel.scrollTo(galleryPanelPositions[idx], 0);
}

export function handleImageLinkClick(e) {
  e.preventDefault();
  const detailPanel = root.querySelector('.gallery-detail');
  const imgEl = detailPanel.querySelector('.img');
  imgEl.src = e.target.src;
  root.classList.add('show-detail');

  function handleCloseDetail() {
    root.classList.remove('show-detail');
    const handleTransitionend = () => {
      imgEl.src = '';
      pageContainer.removeEventListener('transitionend', handleTransitionend);
    };
    pageContainer.addEventListener('transitionend', handleTransitionend);
  }

  pageContainer.querySelector('.btn-close').addEventListener('click', handleCloseDetail);
}
