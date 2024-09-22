import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { mainPreviewCircleButton, mainPseudoCircle } from '@/styles/pages.css';

import lottieJsonSmile from '@/app/_components/lotties/lottie.smile.json';
import lottieJsonSubmit from '@/app/_components/lotties/lottie.submit.json';
import Loading from '@/app/_components/loading/Loading';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
});

interface MainInputCameraProps {
  cameraProps: {
    bgImage: string; // 배경 이미지 URL 또는 경로
    shotPlay: boolean; // 촬영 중인지 여부를 나타내는 상태
    submitPlay: boolean; // 제출 중인지 여부를 나타내는 상태
    isUploading: boolean; // 파일 업로드 중인지 여부를 나타내는 상태
    setBgImage: React.Dispatch<React.SetStateAction<string>>;
    setDisabledForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShotPlay: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadFile: React.Dispatch<React.SetStateAction<File | null>>;
  };
  onCompletedSubmit: () => void; // 제출 완료 시 호출되는 함수
}

const MainInputCamera: React.FC<MainInputCameraProps> = ({ cameraProps, onCompletedSubmit }) => {
  const { bgImage, setBgImage, setDisabledForm, shotPlay, setShotPlay, submitPlay, setUploadFile, isUploading } =
    cameraProps;

  const handleCaptureCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInfo = event.target.files?.[0];
    if (fileInfo) {
      const reader = new FileReader();
      const imgUrl = window.URL.createObjectURL(fileInfo);
      setBgImage(imgUrl);
      setDisabledForm(false);
      setShotPlay(false);
      setUploadFile(fileInfo);
      reader.onload = () => {
        window.URL.revokeObjectURL(imgUrl);
      };
      reader.readAsDataURL(fileInfo);
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
        // eslint-disable-next-line no-alert
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
        {submitPlay && (
          <Lottie
            className="icon icon-submit"
            loop={false}
            animationData={lottieJsonSubmit}
            play={submitPlay}
            onComplete={onCompletedSubmit}
          />
        )}

        {/* 로딩 */}
        {isUploading && <Loading name="uploading" />}
      </div>
    </div>
  );
};

export default MainInputCamera;
