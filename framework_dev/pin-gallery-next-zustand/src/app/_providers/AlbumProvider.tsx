'use client';

import React, { createContext, ReactNode, RefObject, useRef, useState } from 'react';
import { AlbumImage, Category } from '@/app/_types/galleryType';

// 데이터 타입 정의
interface AlbumContextType {
  resetGalleryPanel: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  albumImages: AlbumImage[][];
  setAlbumImages: React.Dispatch<React.SetStateAction<AlbumImage[][]>>;
  tabPanelContainerRef: RefObject<HTMLDivElement>;
  tabNavContainerRef: RefObject<HTMLDivElement>;
  randomImages: AlbumImage[];
  largestAlbum: {
    data: AlbumImage[];
    subTitle: string;
  };
}

// 컨텍스트 생성
export const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

interface AlbumProviderProps {
  children: ReactNode;
  initialCategories: Category[];
  initialAlbumImages: AlbumImage[][];
  initialRandomImage: AlbumImage[];
  initialLargestAlbum: {
    data: AlbumImage[];
    subTitle: string;
  };
}

export const AlbumProvider: React.FC<AlbumProviderProps> = ({
  children,
  initialCategories,
  initialAlbumImages,
  initialRandomImage,
  initialLargestAlbum,
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [albumImages, setAlbumImages] = useState<AlbumImage[][]>(initialAlbumImages);
  const [randomImages, setRandomImages] = useState<AlbumImage[]>(initialRandomImage);
  const [largestAlbum, setLargestAlbum] = useState<{ data: AlbumImage[]; subTitle: string }>(initialLargestAlbum);
  const tabPanelContainerRef = useRef<HTMLDivElement | null>(null);
  const tabNavContainerRef = useRef<HTMLDivElement | null>(null);

  const resetGalleryPanel = () => {
    tabPanelContainerRef.current?.scrollTo(0, 0);
    if (tabPanelContainerRef.current?.children[0] instanceof HTMLElement) {
      tabPanelContainerRef.current.children[0].scrollTo(0, 0);
    }
    tabNavContainerRef.current?.scrollTo(0, 0);
  };
  return (
    <AlbumContext.Provider
      value={{
        categories,
        setCategories,
        albumImages,
        setAlbumImages,
        randomImages,
        setRandomImages,
        largestAlbum,
        setLargestAlbum,
        resetGalleryPanel,
        tabPanelContainerRef,
        tabNavContainerRef,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
