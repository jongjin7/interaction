'use client';

import React, { useEffect } from 'react';
import Header from '@/app/(pages)/_home/header/Header';
import Main from '@/app/(pages)/_home/main/Main';
import useAlbumStore from '@/app/_stores/useAlbumStore';

const HomePage: React.FC = () => {
  const { fetchAlbums } = useAlbumStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="page-container">
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
