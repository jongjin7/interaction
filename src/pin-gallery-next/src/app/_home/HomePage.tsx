'use client';

import React, { useContext, useRef, useState } from 'react';
import { CategoryContext } from '@/app/_data/CategoryProvider';
import lottie from 'lottie-web';
import {
  mainHeader,
  mainFormGroup,
  mainToggleBtnArea,
  mainPreviewCircleButton,
  mainPseudoCircle,
} from '@/styles/pages.css';

import { buttonSizeLarge, buttonPrimaryClass, buttonDisabledClass, inputFieldClass } from '@/styles/tailwind.component';
import Main from '@/app/_home/main/Main';
import Header from './header/Header';

const CreateContentHTML = () => {
  const context = useContext(CategoryContext);
  const { categories } = context;
  console.log('home:::category', categories);
  // const categoryOptions = categories.map((item) => (
  //   <option value={item.id} key={item.id}>
  //     {item.title}
  //   </option>
  // ));

  return (
    <>
      <main>
        <div className={mainPreviewCircleButton}>
          <div className={`btn-circle ${mainPseudoCircle}`}>
            <div className={`img-circle ${mainPseudoCircle}`}>
              <label htmlFor="input-camera">
                <img src="" alt="" />
              </label>
              <input type="file" id="input-camera" capture="environment" accept=".jpg, .jpeg, .png" />
            </div>
            <div id="el-icon-shot" className="icon icon-shot"></div>
            <div id="el-icon-submit" className="icon icon-submit"></div>
          </div>
        </div>

        <div className={mainFormGroup}>
          <div className="flex w-full gap-2">
            <select id="category-select" className={inputFieldClass} disabled="disabled">
              <option value="">앨범을 선택하세요</option>
              {/* {categoryOptions} */}
              <option value="user_add">신규 카테고리 직접 입력</option>
            </select>
          </div>

          <div className="custom-field w-full none">
            <div className="flex gap-2">
              <input type="text" id="add-category" className={inputFieldClass} placeholder="입력하세요" />
              <button className="rounded border border-stroke w-2/4">확인</button>
            </div>
          </div>

          <button
            type="button"
            id="submit-upload"
            className={`${buttonPrimaryClass} ${buttonSizeLarge} ${buttonDisabledClass} py-3 w-full justify-center`}
            disabled="disabled"
          >
            <div className="icon-box">
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                ></path>
              </svg>
            </div>
            <span>이미지 업로드</span>
          </button>

          <div className="copyright">Copyright © 2024 ttl2875. All rights reserved.</div>
        </div>
      </main>
      <img className="bg-container" src="" alt="" />
    </>
  );
};

export default function HomePage() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
