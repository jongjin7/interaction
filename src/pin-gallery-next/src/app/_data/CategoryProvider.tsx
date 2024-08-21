'use client';

import React, { createContext, ReactNode, useState } from 'react';

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
}

export const AlbumProvider: React.FC<AlbumProviderProps> = ({ children, initialCategories, initialAlbumImages }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [albumImages, setAlbumImages] = useState<AlbumImages[]>(initialAlbumImages);

  return (
    <AlbumContext.Provider value={{ categories, setCategories, albumImages, setAlbumImages }}>
      {children}
    </AlbumContext.Provider>
  );
};
