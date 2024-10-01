import React from 'react';
import LoadingBasic from '@/styles/loading.css';

type LoadingProps = {
  name?: string;
};

const Loading: React.FC<LoadingProps> = ({ name = '' }) => {
  return (
    <div className={`${LoadingBasic} ${name}`}>
      <div className="ripple"></div>
    </div>
  );
};

export default Loading;
