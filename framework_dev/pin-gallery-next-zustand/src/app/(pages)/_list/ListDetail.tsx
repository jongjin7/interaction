import { galleryDetail } from '@/styles/pages.css';
import React, { useContext } from 'react';
import { ShowDetailContext } from '@/app/_providers/ShowDetailProvider';

interface ListDetailProps {
  imageSrc: string | null;
}

const ListDetail: React.FC<ListDetailProps> = ({ imageSrc }) => {
  const detailContext = useContext(ShowDetailContext);

  if (!detailContext) {
    throw new Error('detailContext must be used within an ShowDetailContext');
  }

  const { setCurrentDetailLink } = detailContext;

  const clickHandle = () => {
    setCurrentDetailLink(null);
  };

  return (
    <div className={`gallery-detail ${galleryDetail}`}>
      <div className="inner">
        {imageSrc && <img className="img" src={imageSrc} alt="" />}
        <button type="button" className="btn-close" onClick={clickHandle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707 2.854 14.854a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ListDetail;
