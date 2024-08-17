import { mainFormGroup } from '@/styles/pages.css';
import IconCloud from '@/app/_components/icons/cloud.svg';
import { buttonDisabledClass, buttonPrimaryClass, buttonSizeLarge, inputFieldClass } from '@/styles/tailwind.component';
import React from 'react';
import MainAlbumSelect from '@/app/_home/main/MainAlbumSelect';

const MainFormGroup = () => {
  console.log('-----MainFormGroup-----');
  return (
    <div className={mainFormGroup}>
      <MainAlbumSelect />

      <button
        type="button"
        id="submit-upload"
        className={`${buttonPrimaryClass} ${buttonSizeLarge} ${buttonDisabledClass} py-3 w-full justify-center`}
        disabled="disabled"
      >
        <div className="icon-box">
          <IconCloud />
        </div>
        <span>이미지 업로드</span>
      </button>

      <div className="copyright">Copyright © 2024 ttl2875. All rights reserved.</div>
    </div>
  );
};

export default MainFormGroup;
