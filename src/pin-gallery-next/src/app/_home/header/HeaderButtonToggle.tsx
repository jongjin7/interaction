import { mainToggleBtnArea } from '@/styles/pages.css';
import React from 'react';

const HeaderButtonToggle = () => {
  const clickHandleToggle = () => {
    console.log('클릭! 토글');
  };
  return (
    <div className={mainToggleBtnArea}>
      <button onClick={clickHandleToggle} type="button" className="btn-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};
export default HeaderButtonToggle;
