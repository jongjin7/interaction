import dynamic from 'next/dynamic';

import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { mainPreviewCircleButton, mainPseudoCircle } from '@/styles/pages.css';

import lottieSmileJson from '@/app/_components/lotties/lottie.smile.json';
import lottieSubmitJson from '@/app/_components/lotties/lottie.submit.json';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
});

const MainInputCamera = forwardRef(({ image }, ref) => {
  const loadRottieRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  console.log('MainInputCamera==>');

  return (
    <div className={mainPreviewCircleButton} ref={ref}>
      <div className={`btn-circle ${mainPseudoCircle}`}>
        <div className={`img-circle ${mainPseudoCircle}`}>
          <label htmlFor="input-camera">
            <img src={image} alt="" />
          </label>
          <input type="file" id="input-camera" capture="environment" accept=".jpg, .jpeg, .png" />
        </div>

        {/* 상태 애니메이션 아이콘 */}
        <Lottie className="icon icon-shot" loop animationData={lottieSmileJson} play />
        <Lottie className="icon icon-submit" loop animationData={lottieSubmitJson} play />
      </div>
    </div>
  );
});

export default MainInputCamera;
