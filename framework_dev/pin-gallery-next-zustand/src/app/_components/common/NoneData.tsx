import React from 'react';

const NoneData: React.FC = () => {
  return (
    <div className={'none-data'}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
        <path d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
      </svg>
      <small className={'text'}>등록된 이미지가 없습니다.</small>
    </div>
  );
};
export default NoneData;