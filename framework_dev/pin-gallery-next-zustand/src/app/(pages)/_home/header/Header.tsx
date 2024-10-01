import React from 'react';
import { mainHeader } from '@/styles/pages.css';
import HeaderButtonToggle from './HeaderButtonToggle';
import HeaderTitle from './HeaderTitle';

const Header = () => {
  return (
    <header className={mainHeader}>
      <div className="inner">
        <HeaderTitle />
        <HeaderButtonToggle />
      </div>
    </header>
  );
};

export default Header;
