import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import MainInputCamera from './MainInputCamera';
import MainFormGroup from './MainFormGroup';

const randomImages: string[] = (() => {
  const arrayLength = 10;
  return Array.from({ length: arrayLength }, (_, i) => `/images/@random_${i}.png`);
})();

const Main: React.FC = () => {
  const [shotPlay, setShotPlay] = useState<boolean>(true);
  const [submitPlay, setSubmitPlay] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string>('');
  const [disabledForm, setDisabledForm] = useState<boolean>(true);
  const [uploadFile, setUploadFile] = useState<object>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const setRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    const newImage = randomImages[randomIndex];
    console.log('newImage', bgImage, newImage);
    // 상태가 변경된 경우에만 업데이트
    if (newImage !== bgImage) {
      setBgImage(newImage);
    }
  };

  useEffect(() => {
    setRandomImage();
  }, []);

  return (
    <>
      <main>
        <MainInputCamera
          cameraProps={{
            bgImage,
            setBgImage,
            setDisabledForm,
            shotPlay,
            setShotPlay,
            submitPlay,
            setUploadFile,
            uploading,
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
            setUploading,
          }}
        />
      </main>
      {bgImage && <Image src={bgImage} width={400} height={400} className="bg-container" alt="" />}
    </>
  );
};
export default Main;
