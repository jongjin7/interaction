'use client';

import React, { useContext } from 'react';
import { AlbumContext } from '@/app/_data/CategoryProvider';
import Link from 'next/link';

interface Category {
  id: string;
  title: string;
  index: number;
}

interface TabProps {
  tabControl: {
    currentTabIndex: number;
    setCurrentTabIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}

const Tabs: React.FC<TabProps> = ({ tabControl }) => {
  const { currentTabIndex, setCurrentTabIndex } = tabControl;
  const { categories } = useContext(AlbumContext);
  const activeClass = `bg-gray-700 text-white`;
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    setCurrentTabIndex(index);

    const target = event.target as HTMLAnchorElement;

    if (target && 'scrollIntoView' in target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="tabs">
      <div className="tab-nav text-gray-400">
        <Link className={currentTabIndex === 0 ? activeClass : ''} href={'#all'} onClick={(e) => handleClick(e, 0)}>
          전체
        </Link>
        {categories.map((category, index) => (
          <Link
            href={`#${category.id}`}
            key={category.id}
            className={currentTabIndex === index + 1 ? activeClass : ''}
            onClick={(e) => handleClick(e, index + 1)}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
