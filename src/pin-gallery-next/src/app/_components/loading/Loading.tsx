import React from 'react';
import { LoadingBasic as LoadingStyle } from '@/styles/loading.css';

type LoadingProps = {
  name?: string;
  className?: string;
};

const Loading: React.FC<LoadingProps> = ({ name = '', className = '' }) => {
  return (
    <div className={`${LoadingStyle} ${name} ${className}`}>
      <div className="ripple"></div>
    </div>
  );
};

export default Loading;
