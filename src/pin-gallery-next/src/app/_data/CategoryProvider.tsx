'use client';

import React, { createContext, ReactNode, useState } from 'react';

// Category 타입 정의
export interface Category {
  id: string; // 각 카테고리의 고유 식별자
  name: string; // 카테고리 이름
  description?: string; // 카테고리 설명 (선택적)
}

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
