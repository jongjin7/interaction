import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { buttonDisabledClass, buttonPrimaryClass, buttonSizeLarge } from '@/styles/tailwind.component';
import IconCloud from '@/app/_components/icons/cloud.svg';
import Loading from '@/app/_components/loading/Loading';
import ApiGeoLocation from '@client-services/pin-gallery-service/ApiGeoLocation';
import ApiService from '@client-services/pin-gallery-service/ApiService';

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
  const [isDisabled, setIsDisabled] = useState<boolean>(disabledForm);
  const queryClient = useQueryClient();

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

  const refreshData = async () => {
    try {
      await queryClient.invalidateQueries(['albums']);
      setIsUploading(false);
      setSubmitPlay(true);
      console.log('등록완료2');
      // setTimeout(() => {}, 1000);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const handleSubmit = async () => {
    // 카테고리 선택 여부 검사
    if (!selectedCategory || selectedCategory.trim() === '') {
      alert('카테고리를 선택하세요.');
      return;
    }

    try {
      const homePanel = document.querySelector<HTMLElement>('#home');

      if (!homePanel) {
        console.warn('⚠️ [handleSubmit] #home 요소를 찾을 수 없습니다.');
      } else {
        homePanel.classList.add('is-loading'); // 로딩 UI 적용
      }

      setIsUploading(true); // 업로드 상태 활성화

      const result = await sendFileForm(); // 파일 업로드 API 호출

      if (result) {
        await refreshData(); // 성공 시 데이터 갱신
      } else {
        console.error('⚠️ [handleSubmit] 파일 업로드 실패 또는 응답이 없음.');
        setIsUploading(false); // 실패 시 로딩 해제
      }
      homePanel?.classList.remove('is-loading'); // 로딩 UI 제거
    } catch (error) {
      console.error('❌ [handleSubmit] 폼 제출 실패:', error);
      setIsUploading(false); // 오류 발생 시 로딩 해제
    }
  };

  useEffect(() => {
    const isDisabledState = !selectedCategory || selectedCategory.length < 1 || selectedCategory === 'user_add';
    setIsDisabled(isDisabledState);
    console.log('📌 [useEffect] isDisabled updated:', isDisabledState);
  }, [selectedCategory]);

  return (
    <button
      type="button"
      className={`${buttonPrimaryClass} ${buttonSizeLarge} py-3 w-full justify-center 
        ${isDisabled ? buttonDisabledClass : ''}
      `}
      onClick={handleSubmit}
      disabled={isDisabled}
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
