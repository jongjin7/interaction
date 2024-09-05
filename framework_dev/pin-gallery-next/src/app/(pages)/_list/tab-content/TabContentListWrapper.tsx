import { galleryList } from '@/styles/pages.css';
import React, { ReactNode } from 'react';

interface TabContentListWrapperProps {
  children: ReactNode;
}

const TabContentListWrapper: React.FC<TabContentListWrapperProps> = ({ children }) => {
  return <div className={`gallery-list ${galleryList}`}>{children}</div>;
};

export default TabContentListWrapper;
