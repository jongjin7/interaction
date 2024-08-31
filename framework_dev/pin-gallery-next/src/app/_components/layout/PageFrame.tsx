import React from 'react';

interface PageFrameProps {
  children: React.ReactNode;
  id: string;
  className: string;
}
const PageFrame: React.FC<PageFrameProps> = ({ children, id, className }) => {
  return (
    <div id={id} className={`${className} page-panel`}>
      {children}
    </div>
  );
};
export default PageFrame;
