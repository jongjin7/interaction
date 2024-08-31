import { mainToggleBtnArea } from '@/styles/pages.css';
import React, { useContext, useEffect, useState } from 'react';
import { AlbumContext } from '@/app/_providers/AlbumProvider';
import { ShowDetailContext } from '@/app/_providers/ShowDetailProvider';

const HeaderButtonToggle = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { resetGalleryPanel } = useContext(AlbumContext);
  const { currentDetailLink, setCurrentDetailLink } = useContext(ShowDetailContext);

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
