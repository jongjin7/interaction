

let PREV_TAB_INDEX = 0;
let CURRENT_TAB_INDEX = 0;
export function handleButtonGroupClick(e) {
    const targetBtn = e.target;
    const currentPanel = targetBtn.closest('.tab-panel');
    const btnDeleteAll = currentPanel.querySelector('.btn-del-all');

    if (targetBtn.classList.contains('btn-del-sel')) {
        currentPanel.classList.toggle('is-removable');
        btnDeleteAll.toggleAttribute('disabled');
    }

    if (targetBtn.classList.contains('btn-del-all')) {
        console.log('전체 삭제 버튼');
    }
}

export function handleDeleteButtonClick(e) {
    const targetBtn = e.target.classList.contains('.btn-delete') ? e.target : e.target.closest('button');
    targetBtn.classList.add('selected');
    setTimeout(() => {
        const isYes = window.confirm('현재 선택된 아이템을 삭제할가요?');
        if (isYes) {
            console.log('삭제로직 수행중입니다.', targetBtn);
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
            PREV_TAB_INDEX = CURRENT_TAB_INDEX;
            console.log('------ Scrolling has stopped.');
            galleryPanelPositions.forEach((position, index) => {
                if (galleryPanel.scrollLeft === position) {
                    CURRENT_TAB_INDEX = index;
                    tabNav.forEach((nav, idx) => {
                        nav.classList.toggle('bg-gray-700', idx === index);
                        nav.classList.toggle('text-white', idx === index);
                    });
                    galleryPanelItems[PREV_TAB_INDEX].scrollTo(0, 0);
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
