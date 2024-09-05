import { mainToggleBtnArea } from '@/styles/pages.css';
import React, { useContext, useEffect, useState } from 'react';
import { AlbumContext } from '@/app/_providers/AlbumProvider';
import { ShowDetailContext } from '@/app/_providers/ShowDetailProvider';

const HeaderButtonToggle = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const albumContext = useContext(AlbumContext);
  const detailContext = useContext(ShowDetailContext);

  if (!albumContext || !detailContext) {
    // AlbumContext가 undefined인 경우에 대한 처리
    throw new Error('useContext must be used within an AlbumProvider');
  }

  const { resetGalleryPanel } = albumContext;
  const { currentDetailLink, setCurrentDetailLink } = detailContext;

  const clickHandleToggle = () => {
    if (currentPage === 'home') {
      setCurrentPage('list');
      document.body.scrollIntoView();
    } else {
      setCurrentPage('home');
      resetGalleryPanel();
      if (currentDetailLink) setCurrentDetailLink(null);
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
