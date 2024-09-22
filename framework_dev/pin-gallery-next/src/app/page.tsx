'use client';

import React, { useEffect, useState, Suspense } from 'react';

import { pageTypeList, pageTypeMain } from '@/styles/pages.css';

import Home from '@/app/(pages)/_home/HomePage';
import List from '@/app/(pages)/_list/ListPage';
import PageFrame from '@/app/_components/layout/PageFrame';

import ApiService from '@/app/_services/ApiService';
import { AlbumProvider } from '@/app/_providers/AlbumProvider';
import { ShowDetailProvider } from '@/app/_providers/ShowDetailProvider';
import { randomArrayItem, largestArrayItem } from '@/app/_utils/RandomAndLongest';

import Loading from '@/app/_components/loading/Loading';
import { AlbumImage } from '@/app/_types/galleryType';

export default function Layout() {
  const [categories, setCategories] = useState([]);
  const [resAlbumImages, setResAlbumImages] = useState([]);
  const [randomImages, setRandomImages] = useState<AlbumImage[]>([]);
  const [largestAlbum, setLargestAlbum] = useState<{ data: AlbumImage[]; subTitle: string }>({
    data: [],
    subTitle: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCategories = await ApiService.fetchCategory();
        const fetchAlbumImages = await ApiService.fetchGalleryList(fetchedCategories.map((album) => album.id));

        setCategories(fetchedCategories);
        setResAlbumImages(fetchAlbumImages);

        const randomImagesData = randomArrayItem(fetchAlbumImages);
        const largestAlbumData = largestArrayItem(fetchAlbumImages, fetchedCategories);

        setRandomImages(randomImagesData);
        setLargestAlbum(largestAlbumData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading name="app-loading" />;
  }

  return (
    <div id="app">
      <AlbumProvider
        initialCategories={categories}
        initialAlbumImages={resAlbumImages}
        initialRandomImage={randomImages}
        initialLargestAlbum={largestAlbum}
      >
        <Suspense fallback={<Loading name="app-loading" />}>
          <ShowDetailProvider>
            <PageFrame id="home" className={pageTypeMain}>
              <Home />
            </PageFrame>
            <PageFrame id="list" className={pageTypeList}>
              <List />
            </PageFrame>
          </ShowDetailProvider>
        </Suspense>
      </AlbumProvider>
    </div>
  );
}
