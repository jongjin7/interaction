import {
    mainHeader,
    mainFormGroup,
    mainToggleBtnArea,
    mainPreviewCircleButton,
    mainPseudoCircle
} from "../../css/pages.css";

import {
    buttonSizeLarge,
    buttonPrimaryClass,
    buttonDisabledClass,
    inputFieldClass,
    Loading,
} from '../components/CommonTemplate';
import {DomParser} from "../utils/dom";
import EventManager from "../components/EventManager";

export default class HomeFrame {
    constructor(containerId) {
        this.container = document.querySelector(containerId).querySelector('.page-container');
    }

    loadData(){
        this.createContentHTML();
        this.render();
    }

    createContentHTML(){
        const htmlData = `
            <header class="${mainHeader}">
                <div class="inner">
                    <div class="text-holder">
                        <h1 class="title">종진의 이미지 아카이브</h1>
                        <p class="sub-title">나의 폰으로 담는 컬러 세상</p>
                    </div>
                    
                    <div class="${mainToggleBtnArea}">
                        <button id="site-toggle" type="button" class="btn-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <div class="${mainPreviewCircleButton}">
                    <!-- Loading -->
                    
                    
                    <button type="button" class="btn-circle ${mainPseudoCircle}">
                        <div class="img-circle ${mainPseudoCircle}"><img src="./img/img_wide.png" alt=""></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-camera" viewBox="0 0 16 16">
                          <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                          <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                        </svg>
                    </button>
                </div>
                
                
                <div class="${mainFormGroup} --is-ready">
                    <div class="flex w-full gap-2">
                        <select class="${inputFieldClass}" id="pic-category" >
                            <option value="">선택하세요</option>
                            <option value="1">옵션1</option>
                            <option value="2">옵션2</option>
                            <option value="user_add">신규 카테고리 직접 입력</option>
                        </select>
                        
                    </div>
                     
                    <div id="el-custom-filed" class="custom-field w-full none">
                        <div class="flex">
                            <label for="add-category" class="shrink-0 pr-2 text-white/50" style="line-height:3;">신규 카테고리</label>
                            <input type="text" id="add-category" class="${inputFieldClass} w-full" placeholder="입력하세요">
                        </div>
                    </div>
                    
                    <button type="button" class="${buttonPrimaryClass} ${buttonSizeLarge} ${buttonDisabledClass} py-3 w-full justify-center" disabled>
                        <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                        </svg>
                        <span>이미지 업로드</span>
                    </button>
                    
                    <div class="copyright">
                        Copyright © 2024 ttl2875. All rights reserved. 
                    </div>
                </div>
            </main>
            <!--<img src="https://img.freepik.com/premium-photo/bench-is-against-white-wall-with-tree-branch-corner_818261-5830.jpg" alt="">-->
            <img src="https://png.pngtree.com/background/20230617/original/pngtree-moonlit-mystical-forest-a-3d-render-of-a-foggy-night-picture-image_3682560.jpg" alt="">
            <!--<img src="./img/img_wide.png" alt="">-->
        `;
        this.container.innerHTML = htmlData;
    }

    render(){
        this.bindEvents();
    }

    bindEvents(){
        const circleBtn = document.querySelector('.btn-circle');
        circleBtn.onclick = (e)=>{
            e.target.before(DomParser(Loading('uploading')))
        }
        //${ Loading('uploading') }

        // 카테고리 선택
        const categorySelect = document.querySelector('#pic-category');
        categorySelect.addEventListener('change', (e)=>{
            console.log('현재 선택된 카테고리', e.target.value)
            const customField = document.querySelector('#el-custom-filed');
            if(e.target.value === 'user_add' && customField.classList.contains('none')){
                customField.classList.remove('none');
                customField.querySelector('input').focus();
            }else{
                if(!customField.classList.contains('none')) customField.classList.add('none');
            }
        })
    }
}
