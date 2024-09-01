import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import MainInputCamera from './MainInputCamera';
import MainFormGroup from './MainFormGroup';

const randomImages: string[] = (() => {
  const arrayLength = 10;
  return Array.from({ length: arrayLength }, (_, i) => `/images/@random_${i}.png`);
})();

const Main: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [shotPlay, setShotPlay] = useState<boolean>(true);
  const [submitPlay, setSubmitPlay] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string>('');
  const [disabledForm, setDisabledForm] = useState<boolean>(true);
  const [uploadFile, setUploadFile] = useState<object>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const setRandomImage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    const newImage = randomImages[randomIndex];
    // 상태가 변경된 경우에만 업데이트
    if (newImage !== bgImage) {
      setBgImage(newImage);
    }
  }, [bgImage]);

  useEffect(() => {
    setRandomImage();
  }, [setRandomImage]);

  const completedSubmit = () => {
    setSelectedCategory('');
    setSubmitPlay(false);
    setRandomImage();
    setShotPlay(true);
    setDisabledForm(true);
  };

  return (
    <>
      <main>
        <MainInputCamera
          onCompletedSubmit={completedSubmit}
          cameraProps={{
            bgImage,
            setBgImage,
            setDisabledForm,
            shotPlay,
            setShotPlay,
            submitPlay,
            setUploadFile,
            isUploading,
          }}
        />
        <MainFormGroup
          formProps={{
            disabledForm,
            setDisabledForm,
            shotPlay,
            setShotPlay,
            setSubmitPlay,
            uploadFile,
            setUploadFile,
            isUploading,
            setIsUploading,
            selectedCategory,
            setSelectedCategory,
          }}
        />
      </main>
      {bgImage && <Image src={bgImage} width={400} height={400} className="bg-container" alt="" />}
    </>
  );
};
export default Main;
