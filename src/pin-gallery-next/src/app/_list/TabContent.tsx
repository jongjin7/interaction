import React, { useContext } from 'react';
import { CategoryContext } from '@/app/_data/CategoryProvider';
import { galleryDetail, galleryList } from '@/styles/pages.css';
import { buttonOutlineClass, buttonSizeSmall } from '@/styles/tailwind.component';

const PanelTitle = (props) => {
  return (
    <div className="list-header">
      <div className="title">
        <h2>{props.title}</h2>
        {/* <h2 */}
        {/*  className='font-semibold'>${info.title} ${!info.subtitle && info.itemLength ? `(${info.itemLength})` : ''}</h2> */}
        {/* ${info.subtitle ? `<small class='text-gray-500'>${info.subtitle}(${info.itemLength})</small>` : ''} */}
      </div>
    </div>
  );
};

const TabContentListWrapper = ({ children }) => {
  return <div className={`gallery-list ${galleryList}`}>{children}</div>;
};

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

const GalleryList = () => {
  return (
    <ul className="list">
      <li className="list-item">
        <DeleteItemButton></DeleteItemButton>
        <a href="#" title="" data-item-id="">
          <img src="" alt="" />
        </a>
      </li>
    </ul>
  );
};

const TabContentPanel = ({ children, index }) => {
  return (
    <div className="tab-panel" id={`tab-panel-${index}`}>
      {children}
    </div>
  );
};

const TabContentFirst = ({ children }) => {
  return (
    <>
      <TabContentListWrapper>
        <PanelTitle title="전체 랜덤" />
        <GalleryList>리스트 항목</GalleryList>
      </TabContentListWrapper>

      <TabContentListWrapper>
        <PanelTitle title="인기 카테고리" subTitle="서브타이틀" itemLength="10" />
        <GalleryList>리스트 항목</GalleryList>
      </TabContentListWrapper>
    </>
  );
};

const TabContentList = ({ item, index }) => {
  return (
    <TabContentListWrapper>
      <PanelTitle title="" itemLength={item?.length} />
      <GalleryList>리스트 항목</GalleryList>
    </TabContentListWrapper>
  );
};

const ListDetailPanel = () => {
  return (
    <div className={`gallery-detail ${galleryDetail}`}>
      <div className="inner">
        <img className="img" src="" alt="" />
        <button type="button" className="btn-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707 2.854 14.854a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const TabContent: React.FC = async () => {
  return (
    <div id="el-tab-contents" className="tab-contents">
      <TabContentPanel>
        <TabContentFirst />
      </TabContentPanel>
      {/* {arrListData.props.data.map((item, index) => { */}
      {/*  return ( */}
      {/*    <TabContentPanel key={index} index={index + 1}> */}
      {/*      <TabContentList dataItem={item} /> */}
      {/*    </TabContentPanel> */}
      {/*  ); */}
      {/* })} */}
    </div>
  );
};

export default TabContent;