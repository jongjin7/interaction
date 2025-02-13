import React, { useEffect, useState } from 'react';
import { galleryDetail } from '@/styles/pages.css';
import useUIStore from '@/app/_stores/useUIStore';
import { AlbumImage } from '@/app/_types/galleryType';

interface ListDetailProps {
  imageData: AlbumImage | null;
}

const ListDetail: React.FC<ListDetailProps> = ({ imageData }) => {
  const { setCurrentDetailData } = useUIStore();
  const [isClosing, setIsClosing] = useState(false);
  let filePath, ratio;
  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setCurrentDetailData(null);
        setIsClosing(false);
      }, 50); // 짧은 딜레이로 React 내부 상태 정리
    }
  }, [isClosing, setCurrentDetailData]);
  console.log('aaa');
  if (imageData) {
    filePath = imageData.filePath;
    ratio = imageData.ratio;
  }

  const isPortrait = ratio < 1; // 세로 사진 판별
  const clickCloseHandle = () => {
    setIsClosing(true); // UI에서 사라지는 애니메이션 적용 후 상태 변경
  };

  return (
    <div className={`gallery-detail ${galleryDetail}`}>
      <div className="inner">
        {filePath && (
          <img
            className={`img w-full h-full ${isPortrait ? 'object-cover' : 'object-contain'}`}
            src={filePath}
            alt=""
          />
        )}
        <button type="button" className="btn-close" onClick={clickCloseHandle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707 2.854 14.854a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ListDetail;
