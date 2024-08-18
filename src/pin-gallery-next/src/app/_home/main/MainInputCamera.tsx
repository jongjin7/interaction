import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { mainPreviewCircleButton, mainPseudoCircle } from '@/styles/pages.css';

import lottieJsonSmile from '@/app/_components/lotties/lottie.smile.json';
import lottieJsonSubmit from '@/app/_components/lotties/lottie.submit.json';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
});

interface MainInputCameraProps {
  cameraProps: {
    bgImage: string;
    setBgImage: (bgImage: string) => void;
    setDisabledForm: (disabledForm: boolean) => void;
    shotPlay: boolean;
    setShotPlay: (shotPlay) => void;
    submitPlay: boolean;
    setUploadFile: (file) => void;
  };
}

const MainInputCamera = forwardRef<HTMLDivElement, MainInputCameraProps>(({ cameraProps }, ref) => {
  const refShotPlay = useRef<HTMLDivElement | null>(null);
  const { bgImage, setBgImage, setDisabledForm, shotPlay, setShotPlay, submitPlay, setUploadFile } = cameraProps;
  const [loaded, setLoaded] = useState<boolean>(false);

  console.log('MainInputCamera==>', shotPlay);

  const handleCaptureCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = window.URL.createObjectURL(uploadFile);
        setBgImage(imgUrl);
        setDisabledForm(false);
        window.URL.revokeObjectURL(uploadFile);
        setShotPlay(false);
        setUploadFile(uploadFile);
      };
      reader.readAsDataURL(uploadFile);
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
        alert('파일을 읽는 도중 오류가 발생했습니다. 다시 시도해 주세요.');
      };
    }
  };

  return (
    <div className={mainPreviewCircleButton}>
      <div className={`btn-circle ${mainPseudoCircle}`}>
        <div className={`img-circle ${mainPseudoCircle}`}>
          <label htmlFor="input-camera">
            {bgImage && <Image src={bgImage} width={400} height={400} alt="Captured Image" priority />}
          </label>
          <input
            id="input-camera"
            type="file"
            capture="environment"
            accept=".jpg, .jpeg, .png"
            onChange={handleCaptureCamera}
          />
        </div>

        {/* 상태 애니메이션 아이콘 */}
        <Lottie className="icon icon-shot" loop animationData={lottieJsonSmile} play={shotPlay} />
        {submitPlay && <Lottie className="icon icon-submit" animationData={lottieJsonSubmit} play={submitPlay} />}
      </div>
    </div>
  );
});

export default MainInputCamera;
