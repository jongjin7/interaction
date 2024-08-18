import ApiGeoLocation from '@/app/_services/ApiGeoLocation';
import ApiService from '@/app/_services/ApiService';
import { buttonPrimaryClass, buttonSizeLarge, buttonDisabledClass } from '@/styles/tailwind.component';
import IconCloud from '@/app/_components/icons/cloud.svg';
import React from 'react';

interface MainFormSubmitProps {
  submitProps: {
    selectedCategory: string;
    disabledForm: boolean;
    uploadFile: object;
    setUploadFile: (file) => void;
    setSubmitPlay: (submit) => void;
  };
}

const mainFormSubmit: React.FC<MainFormSubmitProps> = ({ submitProps }) => {
  const { selectedCategory, disabledForm, setSubmitPlay } = submitProps;
  const createFormData = async () => {
    const geoInfo = await ApiGeoLocation.init();
    const formData = new FormData();
    // formData.append('image', this.uploadFile);
    formData.append('type', 'image');
    formData.append('title', geoInfo ? geoInfo.time : '제목 없음');
    formData.append('description', geoInfo ? geoInfo.message : '설명 없음');
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
        setSubmitPlay(true);
        const result = sendFileForm();
        if (result) {
          console.log('폼 제출 성공', result, selectedCategory);
          setSubmitPlay(false);
        }
      } catch (error) {
        console.error('폼 제출 실패:', error);
      }
    } else {
      alert('카테고리를 선택하세요.');
    }
  };

  const handleSuccess = () => {};

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
      </div>
      <span>이미지 업로드</span>
    </button>
  );
};
export default mainFormSubmit;
