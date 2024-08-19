import React from 'react';
import { mainFormGroup } from '@/styles/pages.css';
import MainFormSelect from '@/app/_home/main/MainFormSelect';
import MainFormSubmit from '@/app/_home/main/mainFormSubmit';

const MainFormGroup: React.FC = ({ formProps }) => {
  const {
    disabledForm,
    setSubmitPlay,
    uploadFile,
    setUploadFile,
    uploading,
    setUploading,
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
          setUploadFile,
          setSubmitPlay,
          uploading,
          setUploading,
        }}
      />
      <div className="copyright">Copyright © 2024 ttl2875. All rights reserved.</div>
    </div>
  );
};

export default MainFormGroup;
