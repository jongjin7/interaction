'use client';

import React from 'react';
import Header from '@/app/_home/header/Header';
import Main from '@/app/_home/main/Main';

const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
