import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import MainInputCamera from './MainInputCamera';
import MainFormGroup from './MainFormGroup';

const randomImages: string[] = (() => {
  const arrayLength = 10;
  return Array.from({ length: arrayLength }, (_, i) => `/images/@random_${i}.webp`);
})();

const Main: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [shotPlay, setShotPlay] = useState<boolean>(false);
  const [submitPlay, setSubmitPlay] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string>('');
  const [disabledForm, setDisabledForm] = useState<boolean>(true);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const setRandomImage = useCallback(() => {
    setBgImage((prevBgImage) => {
      const randomIndex = Math.floor(Math.random() * randomImages.length);
      const newImage = randomImages[randomIndex];

      return newImage !== prevBgImage ? newImage : prevBgImage;
    });
  }, []); // 의존성 배열을 빈 배열로 설정하여 불필요한 재생성 방지

  useEffect(() => {
    setRandomImage();
  }, [setRandomImage]);

  const completedSubmit = () => {
    setSelectedCategory(undefined);
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
            setSubmitPlay,
            uploadFile,
            isUploading,
            setIsUploading,
            selectedCategory,
            setSelectedCategory,
          }}
        />
      </main>
      {bgImage && <Image src={bgImage} width={500} height={700} quality={90} className="bg-container" alt="" />}
    </>
  );
};
export default Main;
