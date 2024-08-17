'use client';

import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { Category } from '@/app/_types';

// 데이터 타입 정의
interface CategoryContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

// 컨텍스트 생성
export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
  initialCategories: Category[];
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children, initialCategories }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  return <CategoryContext.Provider value={{ categories, setCategories }}>{children}</CategoryContext.Provider>;
};
