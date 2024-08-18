import ApiGeoLocation from '@/app/_services/ApiGeoLocation';
import ApiService from '@/app/_services/ApiService';
import { buttonPrimaryClass, buttonSizeLarge } from '@/styles/tailwind.component';
import IconCloud from '@/app/_components/icons/cloud.svg';
import React from 'react';

interface MainFormSubmitProps {
  submitProps: {
    selectedCategory: string;
  };
}

const mainFormSubmit: React.FC<MainFormSubmitProps> = ({ submitProps }) => {
  const { selectedCategory } = submitProps;
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
      return await ApiService.sendImageFile(formData, this.selectedAlbumCategory);
    } catch (error) {
      console.error('Failed to submit image:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (selectedCategory) {
      try {
        if (selectedCategory === 'user_add') {
          // 신규 카테고리 추가 로직
          const response = await ApiService.addNewCategory({ title: formData.customCategory });

          // 서버로부터 받은 응답에서 신규 카테고리의 ID를 추출
          const newCategoryId = response.data.id;

          // 추가된 카테고리로 selectedCategory 업데이트
          setSelectedCategory(newCategoryId);

          // 나머지 폼 데이터 전송
          sendFileForm();

          // 카테고리 목록 업데이트
          const updatedCategories = await ApiService.fetchCategory();
          setCategories(updatedCategories.data);
        } else {
          sendFileForm();
        }

        console.log('폼 제출 성공');
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
      className={`${buttonPrimaryClass} ${buttonSizeLarge} py-3 w-full justify-center`}
      onClick={handleSubmit}
    >
      <div className="icon-box">
        <IconCloud />
      </div>
      <span>이미지 업로드 {selectedCategory}</span>
    </button>
  );
};
export default mainFormSubmit;
