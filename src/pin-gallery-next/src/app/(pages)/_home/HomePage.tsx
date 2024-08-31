'use client';

import React from 'react';
import Header from '@/app/(pages)/_home/header/Header';
import Main from '@/app/(pages)/_home/main/Main';

const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
