'use client';

import React, { useContext } from 'react';
import { CategoryContext } from '@/app/_data/CategoryProvider';

interface Category {
  id: string;
  title: string;
}

const Tabs: React.FC = () => {
  const context = useContext(CategoryContext);
  const { categories } = context;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, category: Category) => {
    event.preventDefault();
    console.log(`Category clicked: ${category.title}`);
    // 여기서 다른 동작을 수행할 수 있습니다.
  };

  return (
    <div className="tabs">
      <div className="tab-nav text-gray-400">
        <a href="#all" onClick={(e) => handleClick(e, { id: 'all', title: '전체' })}>
          전체
        </a>
        {categories.map((category) => (
          <a href={`#${category.id}`} key={category.id} onClick={(e) => handleClick(e, category)}>
            {category.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
