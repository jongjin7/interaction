import React, { useEffect, useState } from 'react';
import { mainToggleBtnArea } from '@/styles/pages.css';
import useUIStore from '@/app/_stores/useUIStore';

const HeaderButtonToggle = () => {
  const { resetGalleryPanel } = useUIStore();
  const [currentPage, setCurrentPage] = useState<string>('home');

  const clickHandleToggle = () => {
    if (currentPage === 'home') {
      setCurrentPage('list');
      document.body.scrollIntoView();
    } else {
      setCurrentPage('home');
      resetGalleryPanel();
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
