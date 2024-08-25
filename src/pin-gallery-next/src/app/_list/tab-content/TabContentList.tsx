import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
import NoneData from '@/app/_components/layout/NoneData';
import TabContentListTitle from '@/app/_list/tab-content/TabContentListTitle';
import TabContentListWrapper from '@/app/_list/tab-content/TabContentListWrapper';
import { ShowDetailContext } from '@/app/_data/ShowDetailProvider';
import ApiService from '@/app/_services/ApiService';
import { buttonOutlineClass, buttonSizeSmall } from '@/styles/tailwind.component';
import { AlbumContext } from '@/app/_data/CategoryProvider';

interface tabContentListProps {
  title: string;
  subTitle?: string;
  dataItem: [];
  useToggleDel?: boolean;
}
const DeleteItemButton = ({ clickHandleDelete }) => {
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

const GalleryList = ({ data, isToggleDel }) => {
  const { setShowDetail } = useContext(ShowDetailContext);
  const { categories, setAlbumImages } = useContext(AlbumContext);

  function changeImageSize(url) {
    const suffix = 'h';
    return url.replace(/\/([^\/?#]+)(?=[^\/]*$)/, (match, filename) => {
      const parts = filename.split('.');
      const name = parts[0];
      const extension = parts[1];
      const newFileName = `${name}${suffix}.${extension}`;
      return `/${newFileName}`;
    });
  }

  const clickHandleDetail = (e, value) => {
    setShowDetail(value);
  };

  const refreshData = async () => {
    try {
      const resAlbumImages = await ApiService.fetchGalleryList(categories.map((album) => album.id));
      setAlbumImages(resAlbumImages);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const clickHandleDelete = async (e, imageId) => {
    const targetBtn = e.currentTarget;
    targetBtn.classList.add('selected');
    setTimeout(async () => {
      if (window.confirm('현재 선택된 아이템을 삭제할까요?')) {
        try {
          await ApiService.deleteImageItem(imageId);
          alert('선택한 이미지가 삭제되었습니다.');
          refreshData();
          targetBtn.classList.remove('selected');
        } catch (error) {
          console.error('Failed to delete image:', error);
        }
      }
    }, 30);
  };

  return (
    <>
      {data.length ? (
        <ul className="list">
          {data.map((item, index) => (
            <li className="list-item" key={index}>
              {isToggleDel && <DeleteItemButton clickHandleDelete={(e) => clickHandleDelete(e, item.id)} />}
              <Link
                href="#"
                title={item.title ?? new Date(data.datetime * 1000).toDateString()}
                onClick={(e) => clickHandleDetail(e, changeImageSize(item.link))}
              >
                <img src={changeImageSize(item.link)} title={data.description} alt={''} />
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

// 삭제 모드 토글
const ToggleModeDeleteButton = ({ isToggleDel, clickHandleToggleMode }) => {
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
  const listRef = useRef<HTMLElement | null>(null);

  const clickHandleToggleDeleteMode = () => {
    const currentPanel = listRef.current.closest('.tab-panel');
    currentPanel.classList.toggle('is-removable');
    setIsToggleDel(!isToggleDel);
  };

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
