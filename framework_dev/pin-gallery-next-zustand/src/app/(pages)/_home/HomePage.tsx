'use client';

import React, { useEffect } from 'react';
import Header from '@/app/(pages)/_home/header/Header';
import Main from '@/app/(pages)/_home/main/Main';
import ApiService from '@/app/_services/ApiService';
import { largestArrayItem, randomArrayItem } from '@/app/_utils/RandomAndLongest';
import useAlbumStore from '@/app/_stores/useAlbumStore';

const HomePage: React.FC = () => {
  const { setCategories, setAlbumImages, setRandomImages, setLargestAlbum, fetchAlbums } = useAlbumStore();

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

    // fetchData();
  }, []);

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
