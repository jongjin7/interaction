'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { AlbumContext } from '@/app/_providers/AlbumProvider';
import Link from 'next/link';

interface TabProps {
  tabControl: {
    currentTabIndex: number;
    setCurrentTabIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}

const Tabs: React.FC<TabProps> = ({ tabControl }) => {
  const { currentTabIndex, setCurrentTabIndex } = tabControl;
  const { categories } = useContext(AlbumContext);
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeClass = `bg-gray-700 text-white`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    setCurrentTabIndex(index);
  };

  useEffect(() => {
    if (tabRefs.current[currentTabIndex]) {
      tabRefs.current[currentTabIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [currentTabIndex]);

  const getClassNames = (index: number) => (currentTabIndex === index ? activeClass : '');

  return (
    <div className="tabs">
      <div className="tab-nav text-gray-400">
        <Link
          href="#all"
          className={getClassNames(0)}
          ref={(el) => (tabRefs.current[0] = el)}
          onClick={(e) => handleClick(e, 0)}
        >
          전체
        </Link>
        {categories.map((category, index) => {
          const tabIndex = index + 1;
          return (
            <Link
              href={`#${category.id}`}
              key={category.id}
              className={getClassNames(tabIndex)}
              ref={(el) => (tabRefs.current[tabIndex] = el)}
              onClick={(e) => handleClick(e, tabIndex)}
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
