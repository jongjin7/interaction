import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { mainPreviewCircleButton, mainPseudoCircle } from '@/styles/pages.css';

import lottieSmileJson from '@/app/_components/lotties/lottie.smile.json';
import lottieSubmitJson from '@/app/_components/lotties/lottie.submit.json';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
});

interface MainInputCameraProps {
  image: string;
  setBgImage: (image: string) => void;
}

const MainInputCamera = forwardRef<HTMLDivElement, MainInputCameraProps>(({ image, setBgImage }, ref) => {
  const loadLottieRef = useRef<any>(null); // LottiePlayer 타입을 사용해도 됩니다.
  const [loaded, setLoaded] = useState<boolean>(false);

  console.log('MainInputCamera==>');

  const handleCaptureCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = window.URL.createObjectURL(uploadFile);
        setBgImage(imgUrl);
        window.URL.revokeObjectURL(uploadFile);
        // 이 부분은 인스턴스 메서드를 사용할 때 'this'를 적절히 바꿔야 합니다.
        // 아래 주석처럼 필요에 따라 변환하세요.
        // this.toggleFormDisabled();
        // this.view.stateCenterIcon.stop();
        // this.model.setUploadFile(uploadFile);
      };
      reader.readAsDataURL(uploadFile);
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
        alert('파일을 읽는 도중 오류가 발생했습니다. 다시 시도해 주세요.');
      };
    }
  };

  return (
    <div className={mainPreviewCircleButton} ref={ref}>
      <div className={`btn-circle ${mainPseudoCircle}`}>
        <div className={`img-circle ${mainPseudoCircle}`}>
          <label htmlFor="input-camera">
            <Image src={image} width={400} height={400} alt="Captured Image" priority />
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
        <Lottie className="icon icon-shot" loop animationData={lottieSmileJson} play />
        {/* <Lottie className="icon icon-submit" loop animationData={lottieSubmitJson} play /> */}
      </div>
    </div>
  );
});

export default MainInputCamera;
