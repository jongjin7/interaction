import ApiGeoLocation from '@/app/_services/ApiGeoLocation';
import ApiService from '@/app/_services/ApiService';
import { buttonPrimaryClass, buttonSizeLarge, buttonDisabledClass } from '@/styles/tailwind.component';
import IconCloud from '@/app/_components/icons/cloud.svg';
import Loading from '@/app/_components/loading/Loading';
import React from 'react';

interface MainFormSubmitProps {
  submitProps: {
    selectedCategory: string;
    disabledForm: boolean;
    uploadFile: string;
    setUploadFile: (file) => void;
    setSubmitPlay: (submit) => void;
    uploading: boolean;
    setUploading: (upload) => void;
  };
}

const mainFormSubmit: React.FC<MainFormSubmitProps> = ({ submitProps }) => {
  const { selectedCategory, disabledForm, uploadFile, uploading, setUploading, setSubmitPlay } = submitProps;
  const createFormData = async () => {
    const geoInfo = await ApiGeoLocation.init();
    console.log('ageoInfo', geoInfo);
    const formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('type', 'image');
    formData.append('title', geoInfo.time ?? '제목 없음');
    formData.append('description', geoInfo.message ?? (geoInfo.error ? geoInfo.error : '설명 없음'));
    return formData;
  };

  const sendFileForm = async () => {
    try {
      const formData = await createFormData();
      return await ApiService.sendImageFile(formData, selectedCategory);
    } catch (error) {
      console.error('Failed to submit image:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (selectedCategory) {
      try {
        const homePanel = document.querySelector('#home');
        homePanel.classList.add('is-loading');
        setUploading(true); // 상태값을 변경하여 카메라 인풋과 버튼에 로딩 컴포넌트 활성
        const result = await sendFileForm();
        if (result) {
          setUploading(false);
          setSubmitPlay(true);
          setTimeout(() => {
            homePanel.classList.remove('is-loading');
          }, 3000);
        }
      } catch (error) {
        console.error('폼 제출 실패:', error);
      }
    } else {
      alert('카테고리를 선택하세요.');
    }
  };

  return (
    <button
      type="button"
      className={`${buttonPrimaryClass} ${buttonSizeLarge} py-3 w-full justify-center 
        ${disabledForm ? buttonDisabledClass : ''}
      `}
      onClick={handleSubmit}
      disabled={disabledForm}
    >
      <div className="icon-box">
        <IconCloud />
        {uploading && <Loading name="btn-loading" />}
      </div>
      <span>이미지 업로드</span>
    </button>
  );
};
export default mainFormSubmit;
