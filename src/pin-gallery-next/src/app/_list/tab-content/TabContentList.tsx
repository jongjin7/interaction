import Link from 'next/link';
import React from 'react';
import NoneData from '@/app/_components/layout/NoneData';
import TabContentListTitle from '@/app/_list/tab-content/TabContentListTitle';
import TabContentListWrapper from '@/app/_list/tab-content/TabContentListWrapper';

const DeleteItemButton = () => {
  const IconDeleteFile = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
  return (
    <button type="button" title="삭제" className="btn-delete text-rose-500" data-item-id="">
      <IconDeleteFile />
    </button>
  );
};

const GalleryList = ({ data }) => {
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

  return (
    <>
      {data.length ? (
        <ul className="list">
          {data.map((item, index) => (
            <li className="list-item" key={index}>
              <DeleteItemButton />
              <Link href="#" title={item.title ?? new Date(data.datetime * 1000).toDateString()} data-item-id={item.id}>
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

const TabContentList = ({ title, dataItem }) => {
  return (
    <TabContentListWrapper>
      <TabContentListTitle title={title} itemLength={dataItem?.length} />
      <GalleryList data={dataItem} />
    </TabContentListWrapper>
  );
};

export default TabContentList;
