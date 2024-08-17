import React, { useState, useEffect, useRef, useMemo } from 'react';
import MainInputCamera from './MainInputCamera';
import MainFormGroup from './MainFormGroup';

const randomImages = (() => {
  const arrayLength = 10;
  return Array.from({ length: arrayLength }, (_, i) => `/images/@random_${i}.png`);
})();

const Main = () => {
  const refMain = useRef(null);
  const [bgImage, setBgImage] = useState('');

  const setRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    const newImage = randomImages[randomIndex];

    // 상태가 변경된 경우에만 업데이트
    if (newImage !== bgImage) {
      setBgImage(newImage);
    }
  };

  useEffect(() => {
    setRandomImage();
  }, []);

  const clickHandle = () => {
    console.log('Test', refMain.current);
  };

  return (
    <>
      <main>
        <button
          onClick={clickHandle}
          style={{ position: 'fixed', top: '50vh', left: 0, background: 'white', fontSize: '4em' }}
        >
          버튼
        </button>
        <MainInputCamera image={bgImage} ref={refMain} />
        <MainFormGroup />
      </main>
      {bgImage && <img className="bg-container" src={bgImage} alt="" />}
    </>
  );
};
export default Main;
