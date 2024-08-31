'use client';

import React, { createContext, ReactNode, useRef, useState } from 'react';

// Category 타입 정의
export interface Category {
  id: string; // 각 카테고리의 고유 식별자
  name: string; // 카테고리 이름
  description?: string; // 카테고리 설명 (선택적)
}

// AlbumImages 타입 정의
export interface AlbumImages {
  id: string;
  name: string;
  description?: string;
}

// 데이터 타입 정의
interface AlbumContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  albumImages: AlbumImages[];
  setAlbumImages: React.Dispatch<React.SetStateAction<AlbumImages[]>>;
}

// 컨텍스트 생성
export const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

interface AlbumProviderProps {
  children: ReactNode;
  initialCategories: Category[];
  initialAlbumImages: AlbumImages[];
  initialRandomImage: [];
  initialLargestAlbum: [];
}

export const AlbumProvider: React.FC<AlbumProviderProps> = ({
  children,
  initialCategories,
  initialAlbumImages,
  initialRandomImage,
  initialLargestAlbum,
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [albumImages, setAlbumImages] = useState<AlbumImages[]>(initialAlbumImages);
  const randomImages = initialRandomImage;
  const largestAlbum = initialLargestAlbum;
  const tabPanelContainerRef = useRef(null);

  const resetGalleryPanel = () => {
    if (tabPanelContainerRef.current) {
      tabPanelContainerRef.current.scrollTo(0, 0);
      tabPanelContainerRef.current.children[0].scrollTo(0, 0);
    }
  };
  return (
    <AlbumContext.Provider
      value={{
        categories,
        setCategories,
        albumImages,
        setAlbumImages,
        randomImages,
        largestAlbum,
        resetGalleryPanel,
        tabPanelContainerRef,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
