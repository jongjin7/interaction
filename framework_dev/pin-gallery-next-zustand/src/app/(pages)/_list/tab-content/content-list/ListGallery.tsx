import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { AlbumImage } from '@/app/_types/galleryType';
import { useQueryClient } from '@tanstack/react-query';
import SkeletonImage from '@/app/_components/skeleton/SkeletonImage';
import DeleteButton from '@/app/_components/common/DeleteButton';
import NoneData from '@/app/_components/common/NoneData';
import useUIStore from '@/app/_stores/useUIStore';
import ApiService from '@/../../../../client-services/pin-gallery-service/ApiService';

interface ListGalleryProps {
  data: AlbumImage[];
  isToggleDel?: boolean;
}

const ListGallery: React.FC<ListGalleryProps> = ({ data, isToggleDel }) => {
  const queryClient = useQueryClient();
  const { setCurrentDetailLink } = useUIStore();
  const listRef = useRef(null);
  const [isFocusin, setIsFocusin] = useState<boolean[]>(new Array(data.length).fill(false));

  const clickHandleDetail = (event: React.MouseEvent<HTMLAnchorElement>, value: string) => {
    setCurrentDetailLink(value);
  };

  const refreshData = async () => {
    try {
      await queryClient.invalidateQueries(['albums']);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const clickHandleDelete = async (event: React.MouseEvent<HTMLButtonElement>, imageId: string, index: number) => {
    setIsFocusin((prev) => {
      const newFocusin = [...prev];
      newFocusin[index] = true; // 해당 이미지의 로딩 상태를 true로 변경
      return newFocusin;
    });

    setTimeout(async () => {
      // eslint-disable-next-line no-alert
      if (window.confirm('현재 선택된 아이템을 삭제할까요?')) {
        try {
          await ApiService.deleteImageItem(imageId);
          // eslint-disable-next-line no-alert
          alert('선택한 이미지가 삭제되었습니다.');
          await refreshData();
        } catch (error) {
          console.error('Failed to delete image:', error);
        }
      }
      // 패널 삭제버튼 활성화 토글버튼
      const list = listRef.current as HTMLElement;
      list.parentElement.querySelector('.btn-del-sel').click();

      setIsFocusin((prev) => {
        const newFocusin = [...prev];
        newFocusin[index] = false;
        return newFocusin;
      });
    }, 30);
  };

  // Skeleton
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(data.length).fill(false));
  const [itemHeight, setItemHeight] = useState<number[]>(new Array(data.length).fill(0));
  const onLoadThumb = (event, index: number) => {
    // console.log(`이미지가 로딩되었습니다. Index: ${index}`);
    setLoadedImages((prev) => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = true; // 해당 이미지의 로딩 상태를 true로 변경
      return newLoadedImages;
    });
    setTimeout(() => {
      const boundingBox = event.target.getBoundingClientRect();

      setItemHeight((prev) => {
        const newImages = [...prev];
        newImages[index] = Math.floor((boundingBox.height / boundingBox.width) * 10);
        return newImages;
      });
    }, 100);
  };

  return (
    <>
      {data.length ? (
        <ul className="list" ref={listRef}>
          {data.map((item, index) => (
            <li className="list-item" key={index} style={{ gridRowEnd: `span ${itemHeight[index]}` }}>
              {isToggleDel && (
                <DeleteButton
                  clickHandleDelete={(event: React.MouseEvent<HTMLButtonElement>) =>
                    clickHandleDelete(event, item.id, index)
                  }
                  className={isFocusin[index] ? 'selected' : ''}
                />
              )}
              {!loadedImages[index] ? <SkeletonImage /> : null}
              <Link
                className={!loadedImages[index] ? 'h-0' : ''}
                href="#"
                title={item.fileName}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => clickHandleDetail(event, item.filePath)} // onClick 핸들러의 타입 자동 추론
              >
                <img
                  src={item.filePath}
                  title={item.description ?? ''}
                  className={`transition ${!loadedImages[index] ? 'opacity-0' : 'opacity-1'}`}
                  alt=""
                  onLoad={(e) => onLoadThumb(e, index)}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <NoneData />
      )}
    </>
  );
};

export default ListGallery;
