'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import useAlbumStore from '@/app/_stores/useAlbumStore';

interface TabProps {
  tabControl: {
    currentTabIndex: number;
    setCurrentTabIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}

const Tabs: React.FC<TabProps> = ({ tabControl }) => {
  const { categories, tabNavContainerRef } = useAlbumStore();

  const { currentTabIndex, setCurrentTabIndex } = tabControl;
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
      <div ref={tabNavContainerRef} className="tab-nav text-gray-400">
        <Link
          href="#tab-panel-0"
          className={getClassNames(0)}
          ref={(el) => {
            if (el) tabRefs.current[0] = el;
          }}
          onClick={(e) => handleClick(e, 0)}
        >
          전체
        </Link>
        {categories.map((category, index) => {
          const tabIndex = index + 1;
          return (
            <Link
              href={`#tab-panel-${tabIndex}`}
              key={category.id}
              className={getClassNames(tabIndex)}
              ref={(el) => {
                if (el) tabRefs.current[tabIndex] = el;
              }}
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
