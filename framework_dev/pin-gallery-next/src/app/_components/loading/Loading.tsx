import React from 'react';
import { LoadingBasic as LoadingStyle } from '@/styles/loading.css';

type LoadingProps = {
  name?: string;
};

const Loading: React.FC<LoadingProps> = ({ name = '' }) => {
  return (
    <div className={`${LoadingStyle} ${name}`}>
      <div className="ripple"></div>
    </div>
  );
};

export default Loading;
