import React, { useEffect, useState } from 'react';
import ApiGeoLocation from '@/app/_services/ApiGeoLocation';
import { buttonDisabledClass, buttonPrimaryClass, buttonSizeLarge } from '@/styles/tailwind.component';
import IconCloud from '@/app/_components/icons/cloud.svg';
import Loading from '@/app/_components/loading/Loading';
import useAlbumStore from '@/app/_stores/useAlbumStore';
import ApiService from '@/../../../client-services/pin-gallery-service/ApiService';

interface MainFormSubmitProps {
  submitProps: {
    selectedCategory: string; // 선택된 카테고리, 없을 수도 있음
    disabledForm: boolean; // 폼이 비활성화된 상태인지 여부
    uploadFile: File | null; // 업로드할 파일, 없을 수도 있음
    setSubmitPlay: React.Dispatch<React.SetStateAction<boolean>>; // 제출 상태를 설정하는 함수
    isUploading: boolean; // 업로드 중인지 여부
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>; // 업로드 중 상태를 설정하는 함수
  };
}

const MainFormSubmit: React.FC<MainFormSubmitProps> = ({ submitProps }) => {
  const { selectedCategory, disabledForm, uploadFile, isUploading, setIsUploading, setSubmitPlay } = submitProps;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { setAlbumImages } = useAlbumStore();

  const createFormData = async () => {
    const geoInfo = await ApiGeoLocation.init();
    const formData = new FormData();
    if (uploadFile) {
      formData.append('file', uploadFile); // 'File | null' 타입을 'Blob'으로 처리
    }
    formData.append('albumId', selectedCategory);
    formData.append('title', geoInfo ? geoInfo.time : '제목 없음');
    formData.append('description', geoInfo ? geoInfo.message : '설명 없음');
    return formData;
  };

  const sendFileForm = async () => {
    try {
      const formData = await createFormData();
      if (!selectedCategory) {
        throw new Error('Category must be selected');
      }
      return await ApiService.sendImageFile(formData);
    } catch (error) {
      console.error('Failed to submit image:', error);
      throw error;
    }
  };

  const refreshData = async (target) => {
    try {
      const resCategories = await ApiService.fetchCategory();
      const resAlbumImages = resCategories.map((album) => album.images);
      // console.log('resAlbumImages==>', resAlbumImages);
      setAlbumImages(resAlbumImages);
      target.classList.remove('is-loading');
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const handleSubmit = async () => {
    if (selectedCategory) {
      try {
        const homePanel = document.querySelector<HTMLElement>('#home');
        homePanel?.classList.add('is-loading');
        setIsUploading(true); // 상태값을 변경하여 카메라 인풋과 버튼에 로딩 컴포넌트 활성
        const result = await sendFileForm();
        if (result) {
          setIsUploading(false);
          setSubmitPlay(true);
          await refreshData(homePanel);
        }
      } catch (error) {
        console.error('폼 제출 실패:', error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('카테고리를 선택하세요.');
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      return (selectedCategory?.length ?? 0) < 1 || selectedCategory === 'user_add';
    });
  }, [selectedCategory]);

  return (
    <button
      type="button"
      className={`${buttonPrimaryClass} ${buttonSizeLarge} py-3 w-full justify-center 
        ${disabledForm || isDisabled ? buttonDisabledClass : ''}
      `}
      onClick={handleSubmit}
      disabled={disabledForm || isDisabled}
    >
      <div className="icon-box">
        <IconCloud />
        {isUploading && <Loading name="btn-loading" />}
      </div>
      <span>이미지 업로드</span>
    </button>
  );
};
export default MainFormSubmit;
