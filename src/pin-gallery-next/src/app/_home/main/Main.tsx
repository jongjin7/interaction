import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import MainInputCamera from './MainInputCamera';
import MainFormGroup from './MainFormGroup';

const randomImages: string[] = (() => {
  const arrayLength = 10;
  return Array.from({ length: arrayLength }, (_, i) => `/images/@random_${i}.png`);
})();

const Main: React.FC = () => {
  const refMain = useRef<HTMLDivElement | null>(null);
  const [bgImage, setBgImage] = useState<string>('');
  const [disabledForm, setDisabledForm] = useState<boolean>(true);

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
        <MainInputCamera ref={refMain} cameraProps={{ bgImage, setBgImage, setDisabledForm }} />
        <MainFormGroup formProps={{ disabledForm, setDisabledForm }} />
        {disabledForm ? '비활성' : '활성'}
      </main>
      {bgImage && <Image src={bgImage} width={400} height={400} className="bg-container" alt="" />}
    </>
  );
};
export default Main;
