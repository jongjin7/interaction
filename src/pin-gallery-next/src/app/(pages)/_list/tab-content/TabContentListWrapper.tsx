import { galleryList } from '@/styles/pages.css';
import React from 'react';

const TabContentListWrapper: React.FC = ({ children }) => {
  return <div className={`gallery-list ${galleryList}`}>{children}</div>;
};

export default TabContentListWrapper;
