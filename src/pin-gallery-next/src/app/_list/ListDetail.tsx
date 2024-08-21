import Image from 'next/image';
import { galleryDetail, galleryList } from '@/styles/pages.css';

interface ListDetailProps {
  imageSrc?: string;
}

const ListDetail: React.FC<ListDetailProps> = ({ imageSrc }) => {
  return (
    <div className={`gallery-detail ${galleryDetail}`}>
      <div className="inner">
        {imageSrc && <Image className="img" src={imageSrc} alt="" />}
        <button type="button" className="btn-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707 2.854 14.854a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ListDetail;
