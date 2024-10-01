import React from 'react';
import { mainFormGroup } from '@/styles/pages.css';
import MainFormSelect from '@/app/(pages)/_home/main/MainFormSelect';
import MainFormSubmit from '@/app/(pages)/_home/main/mainFormSubmit';

interface MainFormGroupProps {
  formProps: {
    disabledForm: boolean;
    setSubmitPlay: React.Dispatch<React.SetStateAction<boolean>>;
    uploadFile: File | null;
    isUploading: boolean;
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCategory: string | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
}

const MainFormGroup: React.FC<MainFormGroupProps> = ({ formProps }) => {
  const {
    disabledForm,
    setSubmitPlay,
    uploadFile,
    isUploading,
    setIsUploading,
    selectedCategory,
    setSelectedCategory,
  } = formProps;

  return (
    <div className={mainFormGroup}>
      <MainFormSelect selectProps={{ selectedCategory, setSelectedCategory, disabledForm }} />
      <MainFormSubmit
        submitProps={{
          selectedCategory,
          disabledForm,
          uploadFile,
          setSubmitPlay,
          isUploading,
          setIsUploading,
        }}
      />
      <div className="copyright">Copyright © 2024 ttl2875. All rights reserved.</div>
    </div>
  );
};

export default MainFormGroup;
