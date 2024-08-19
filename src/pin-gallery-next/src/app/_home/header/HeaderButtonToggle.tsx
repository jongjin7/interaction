import { mainToggleBtnArea } from '@/styles/pages.css';
import React, { useEffect, useState } from 'react';

const HeaderButtonToggle = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const clickHandleToggle = () => {
    setCurrentPage((prevPage) => (prevPage === 'home' ? 'list' : 'home'));

    if (currentPage === 'home') {
      // this.listController.initGalleryPanel(); // Home 페이지에 대한 처리를 합니다.
    } else {
      document.body.scrollIntoView(); // 페이지가 변경되면 스크롤을 조정합니다.
    }
  };

  useEffect(() => {
    document.body.dataset.currentPage = currentPage;
  }, [currentPage]);

  return (
    <div className={mainToggleBtnArea}>
      <button onClick={clickHandleToggle} type="button" className="btn-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};
export default HeaderButtonToggle;
