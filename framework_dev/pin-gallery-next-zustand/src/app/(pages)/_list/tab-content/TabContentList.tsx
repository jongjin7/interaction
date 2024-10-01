import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
import ApiService from '@/app/_services/ApiService';
import NoneData from '@/app/_components/layout/NoneData';
import TabContentListTitle from '@/app/(pages)/_list/tab-content/TabContentListTitle';
import TabContentListWrapper from '@/app/(pages)/_list/tab-content/TabContentListWrapper';
import { ShowDetailContext } from '@/app/_providers/ShowDetailProvider';
import { buttonOutlineClass, buttonSizeSmall } from '@/styles/tailwind.component';
import { AlbumContext } from '@/app/_providers/AlbumProvider';
import { AlbumImage } from '@/app/_types/galleryType';
import { Skeleton } from '@nextui-org/skeleton';
import useAlbumStore from '@/app/_stores/useAlbumStore';

interface tabContentListProps {
  title: string;
  subTitle?: string;
  dataItem: AlbumImage[];
  useToggleDel?: boolean;
  url?: string;
  datetime?: number;
}

interface DeleteItemButtonProps {
  clickHandleDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteItemButton: React.FC<DeleteItemButtonProps> = ({ clickHandleDelete }) => {
  const IconDeleteFile = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
  return (
    <button type="button" title="삭제" className="btn-delete text-rose-500" onClick={clickHandleDelete}>
      <IconDeleteFile />
    </button>
  );
};

interface GalleryListProps {
  data: AlbumImage[];
  isToggleDel?: boolean;
}

const GalleryList: React.FC<GalleryListProps> = ({ data, isToggleDel }) => {
  const { categories, setAlbumImages } = useAlbumStore();
  const detailContext = useContext(ShowDetailContext);

  if (!detailContext) {
    throw new Error('detailContext must be used within an ShowDetailContext');
  }

  const { setCurrentDetailLink } = detailContext;

  function changeImageSize(url: string) {
    const suffix = 'h';
    return url.replace(/\/([^/?#]+)(?=[^/]*$)/, (match, filename) => {
      const parts = filename.split('.');
      const name = parts[0];
      const extension = parts[1];
      const newFileName = `${name}${suffix}.${extension}`;
      return `/${newFileName}`;
    });
  }

  const clickHandleDetail = (event: React.MouseEvent<HTMLAnchorElement>, value: string) => {
    setCurrentDetailLink(value);
  };

  const refreshData = async () => {
    try {
      const resAlbumImages = await ApiService.fetchGalleryList(categories.map((album) => album.id));
      console.log('resAlbumImages', resAlbumImages);
      setAlbumImages(resAlbumImages);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const clickHandleDelete = async (event: React.MouseEvent<HTMLButtonElement>, imageId: string) => {
    const targetBtn = event.currentTarget;
    targetBtn.classList.add('selected');
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
      targetBtn.classList.remove('selected');
    }, 30);
  };

  // Skeleton
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(data.length).fill(false));

  const onLoadThumb = (index: number) => {
    // console.log(`이미지가 로딩되었습니다. Index: ${index}`);
    setLoadedImages((prev) => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = true; // 해당 이미지의 로딩 상태를 true로 변경
      return newLoadedImages;
    });
  };

  const SkeletonElement = () => (
    <div className={'flex items-center justify-center w-full h-48 bg-gray-300'}>
      <svg
        className="w-10 h-10 text-gray-200"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>
  );

  return (
    <>
      {data.length ? (
        <ul className="list">
          {data.map((item, index) => (
            <li className="list-item" key={index}>
              {isToggleDel && (
                <DeleteItemButton
                  clickHandleDelete={(event: React.MouseEvent<HTMLButtonElement>) => clickHandleDelete(event, item.id)}
                />
              )}
              {!loadedImages[index] ? <SkeletonElement /> : null}
              <Link
                className={!loadedImages[index] ? 'h-0' : ''}
                href="#"
                title={(item as any).title ?? new Date(item.datetime * 1000).toDateString()} // 타입 단언 사용
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                  clickHandleDetail(event, changeImageSize(item.link))
                } // onClick 핸들러의 타입 자동 추론
              >
                <img
                  src={changeImageSize(item.link)}
                  title={item.description ?? ''}
                  className={`transition ${!loadedImages[index] ? 'opacity-0' : 'opacity-1'}`}
                  alt=""
                  onLoad={() => onLoadThumb(index)}
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

// Props 인터페이스 정의
interface ToggleModeDeleteButtonProps {
  isToggleDel: boolean;
  clickHandleToggleMode: () => void;
}
// 삭제 모드 토글
const ToggleModeDeleteButton: React.FC<ToggleModeDeleteButtonProps> = ({ isToggleDel, clickHandleToggleMode }) => {
  return (
    <button
      type="button"
      className={`
        ${buttonOutlineClass} ${buttonSizeSmall} btn-del-sel
      `}
      onClick={clickHandleToggleMode}
    >
      {`선택 ${!isToggleDel ? '삭제' : '해제'}`}
    </button>
  );
};

const TabContentList: React.FC<tabContentListProps> = ({ title, subTitle, dataItem, useToggleDel = false }) => {
  const [isToggleDel, setIsToggleDel] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const clickHandleToggleDeleteMode = () => {
    const currentPanel = listRef.current?.closest('.tab-panel');
    currentPanel?.classList.toggle('is-removable');
    setIsToggleDel(!isToggleDel);
  };

  // console.log('tabContentList==>', dataItem);
  return (
    <TabContentListWrapper>
      <div className="list-header" ref={listRef}>
        <TabContentListTitle title={title} subTitle={subTitle} itemLength={dataItem?.length} />
        {dataItem.length > 0 && useToggleDel && (
          <ToggleModeDeleteButton isToggleDel={isToggleDel} clickHandleToggleMode={clickHandleToggleDeleteMode} />
        )}
      </div>
      <GalleryList data={dataItem} isToggleDel={isToggleDel} />
    </TabContentListWrapper>
  );
};

export default TabContentList;
