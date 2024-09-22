'use client';

import React, { useContext, useEffect } from 'react';
import Header from '@/app/(pages)/_home/header/Header';
import Main from '@/app/(pages)/_home/main/Main';
import ApiService from '@/app/_services/ApiService';
import { largestArrayItem, randomArrayItem } from '@/app/_utils/RandomAndLongest';
import { AlbumContext } from '@/app/_providers/AlbumProvider';

const HomePage: React.FC = () => {
  const albumContext = useContext(AlbumContext);
  const { setCategories, setAlbumImages, setRandomImages, setLargestAlbum } = albumContext;

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCategories = await ApiService.fetchCategory();
        const fetchAlbumImages = await ApiService.fetchGalleryList(fetchedCategories.map((album) => album.id));
        setCategories(fetchedCategories);
        setAlbumImages(fetchAlbumImages);

        const randomImagesData = randomArrayItem(fetchAlbumImages);
        const largestAlbumData = largestArrayItem(fetchAlbumImages, fetchedCategories);

        setRandomImages(randomImagesData);
        setLargestAlbum(largestAlbumData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
