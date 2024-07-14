import {
  mainHeader,
  mainFormGroup,
  mainToggleBtnArea,
  mainPreviewCircleButton,
  mainPseudoCircle,
} from '../../css/pages.css';

import { buttonSizeLarge, buttonPrimaryClass, buttonDisabledClass, inputFieldClass } from '../utils/tailwind.component';

import {
  getElements,
  setRandomImage,
  handleCaptureCamera,
  handleCategoryChange,
  handleNewCategory,
  handleSubmit,
  getAlbumCategory,
} from './HomeEventHandler';

export default class HomeFrame {
  constructor(containerId) {
    this.root = document.querySelector(containerId);
    this.container = this.root.querySelector('.page-container');
  }

  loadData() {
    this.createContentHTML();
    this.render();
  }

  createContentHTML() {
    const htmlData = `
            <header class='${mainHeader}'>
                <div class='inner'>
                    <div class='text-holder'>
                        <h1 class='title'><small>JONGJIN'S</small> <span class='design'>이미지 아카이브</span></h1>
                        <p class='sub-title'>나의 폰으로 담는 컬러 세상</p>
                    </div>
                    
                    <div class='${mainToggleBtnArea}'>
                        <button id='site-toggle' type='button' class='btn-toggle'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <div class='${mainPreviewCircleButton}'>
                    <!-- Loading -->
                    
                    <div class='btn-circle ${mainPseudoCircle}'>
                        <div class='img-circle ${mainPseudoCircle}'>
                            <label for='input-camera'><img src='' alt=''></label>
                            <input type='file' id='input-camera' capture='environment'  accept='.jpg, .jpeg, .png' >
                        </div>
                        <div id='el-icon-shot' class='icon icon-shot'></div>
                        <div id='el-icon-submit' class='icon icon-submit'></div>
                    </div>
                </div>
                
                
                <div class='${mainFormGroup}'>
                    <div class='flex w-full gap-2'>
                        <select id='category-select' class='${inputFieldClass}' disabled='disabled'>
                            <!-- 옵션 리스트 -->
                        </select>
                        
                    </div>
                     
                    <div id='el-custom-filed' class='custom-field w-full none'>
                        <div class='flex'>
                            <label for='add-category' class='shrink-0 pr-2 text-white/50' style='line-height:3;'>신규 카테고리</label>
                            <input type='text' id='add-category' class='${inputFieldClass} w-full' placeholder='입력하세요'>
                        </div>
                    </div>
                    
                    <button type='button' id='submit-upload' class='${buttonPrimaryClass} ${buttonSizeLarge} ${buttonDisabledClass} py-3 w-full justify-center' disabled='disabled'>
                        <svg class='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'>
                          <path stroke-linecap='round' stroke-linejoin='round' d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'></path>
                        </svg>
                        <span>이미지 업로드</span>
                    </button>
                    
                    <div class='copyright'>
                        Copyright © 2024 ttl2875. All rights reserved. 
                    </div>
                </div>
            </main>
            <!-- 배경 이미지 -->
            <img class='bg-container' src='' alt=''>
        `;
    this.container.innerHTML = htmlData;
  }

  render() {
    getElements(this.root);
    getAlbumCategory();
    this.bindEvents();
  }

  bindEvents() {
    // 앱 로딩 후 랜덤 이미지 세팅
    setRandomImage();

    // 미리보기 영역
    const circleInput = document.querySelector('#input-camera');
    circleInput.addEventListener('change', handleCaptureCamera);
    // circleBtn.onclick = handleCircleButtonClick(root, this.iconShot);

    // 카테고리 설정 및 선택
    this.categorySelect = document.querySelector('#category-select');
    this.categorySelect.addEventListener('change', handleCategoryChange);

    // 직접 입력
    const customField = this.root.querySelector('#add-category');
    customField.addEventListener('change', handleNewCategory);

    // 이미지 전송
    const btnSubmit = this.root.querySelector('#submit-upload');
    btnSubmit.addEventListener('click', handleSubmit);
  }
}
