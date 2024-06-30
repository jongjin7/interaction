import {
    headerContent,
    pseudoCircle,
    vars,
    bodyContent,
    previewCircle,
    mainController,
    galleryList,
    container,
    iconLink,
    mainPage,
    pageToggleArea,
} from '../css/styles.css.js';

const createFrame = (params) =>{
    const {id, className, data} = params;
    const content = document.createElement('div');
    content.id= id;
    content.classList.add(className);
    content.classList.add('route-frame');
    content.innerHTML = data;

    if(id==='list'){

    }
    return content;
}

// 컴포넌트 정의
const toggleIconDefault = `<button type="button" class="btn-toggle">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    </svg>
</button>`;
const toggleIconHome = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>`;

const buttonIconClass = ``;
const labelClass = `mb-3 block text-sm font-medium text-black dark:text-white`;
const buttonBasicClass = `inline-flex rounded-md px-3.5 py-2.5 text-md`;
const buttonPrimaryClass = `${buttonBasicClass} bg-orange-500 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700`
const linkText = `font-semibold leading-6 text-gray-900`;
const inputFieldClass = `relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`
const main= (params)=>{
    const htmlData = `
        <div class="${bodyContent}">
            <header class="${headerContent}">
                <div class="text-holder">
                    <h1 class="title">종진의 이미지 아카이브</h1>
                    <p class="sub-title">핸드폰 카메라로 담는 컬러</p>
                </div>
            </header>
            
            <main>
                <div class="${previewCircle}">
                    <button type="button" class="ui-circle ${pseudoCircle}">
                        <div class="img ${pseudoCircle}"><img src="./img/img_wide.png" alt=""></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-camera" viewBox="0 0 16 16">
                          <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                          <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                        </svg>
                    </button>
                </div>
                
                <div>
                    <a href="./" class="${buttonPrimaryClass}">메인으로</a>
                        <a href="./list" class="${linkText}">갤러리 목록으로</a>
                </div>
                
                <div class="${mainController} is-ready">
                    <select class="${inputFieldClass}" name="" id="">
                        <option value="">선택하세요</option>
                        <option value="">옵션1</option>
                        <option value="">옵션2</option>
                    </select>
                    <button type="button" class="${buttonPrimaryClass} py-3 w-full justify-center">
                        <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                        </svg>
                        <span>이미지 업로드</span>
                    </button>
                    
                    <div class="copyright">
                        Copyright © 2024 ttl2875. All rights reserved. 
                    </div>
                </div>
            </main>
            <img src="./img/img_wide.png" alt="">
        </div>
        `;
    return createFrame({...params, data: htmlData});
}

const pageGallery= (params)=>{
    const htmlData = `<div class="container"><div>갤러리 리스트 <a href="./">메인으로</a></div></div>`;
    return createFrame({...params, data: htmlData});
}

// router
// https://velog.io/@sjoleee_/VanillaJS-%EB%B0%94%EB%8B%90%EB%9D%BCJS%EB%A1%9C-SPA-%EC%BB%A4%EB%A8%B8%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0
const routes = [
    {
        path: "/act3/",
        view: ()=>{
            console.log("---- 메인화면입니다.", )
            const pageId = 'home'
            document.body.dataset.currentPage = pageId;
            const list = document.querySelector(`#list`)
            const listHandler = ()=>{
                list.classList.remove('show');
                list.removeEventListener('transitionend', listHandler)
            }

            if(list.classList.contains('show')) {
                list.addEventListener('transitionend', listHandler)
            }
        }
    },
    {
        path: "/act3/list",
        view: ()=>{
            console.log("---- 갤러리 리스트입니다.")
            const pageId = 'list'
            const page = document.querySelector(`#${pageId}`)
            page.classList.add('show');
            document.body.dataset.currentPage = pageId;
        }
    }
];


function navigateTo(url) {
    window.history.pushState(null, null, url);
    route();
}

const route = async (app) => {
    const pageMatches = routes.map(route => {
        return {
            route: route,
            isMatch: window.location.pathname === route.path,
        };
    });

    let match = pageMatches.find(pageMatch => pageMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0], // 기본 라우트로 설정 (예: 메인 화면)
            isMatch: true
        };
    }

    match.route.view();
}

function generatePage(){
    const appContainer = document.querySelector('#app');
    appContainer.append(main({id:'home', className: mainPage}));
    appContainer.append(pageGallery({id:'list', className: galleryList}));

    // 홈과 상세페이지 전환
    const siteToggleBtn = document.createElement('div');
    siteToggleBtn.id = 'site-toggle';
    siteToggleBtn.classList.add(`${pageToggleArea}`);
    siteToggleBtn.innerHTML = toggleIconDefault;
    appContainer.append(siteToggleBtn);
}
function init(){
    generatePage();

    document.body.addEventListener("click", e => {
        const target = e.target.closest("a");
        if (!target || !(target instanceof HTMLAnchorElement)) return;
        e.preventDefault();
        navigateTo(target.href);
    });

    window.addEventListener("popstate", route);

    route();
}
document.addEventListener('DOMContentLoaded', init)
