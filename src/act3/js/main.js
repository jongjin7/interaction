import {
  headerContent,
  pseudoCircle,
  vars,
  mainBodyContent,
  previewCircle,
  mainController,
  pageTypeList,
  container,
  iconLink,
  pageTypeMain,
  galleryList,
  pageToggleArea,
} from '../css/styles.css.js';
import { LoadingBasic } from '../css/loading.css';

// 페이지 랜더
const loading = (className) => `<div id="el-${className}" class="${LoadingBasic} ${className}">
                        <div class="ripple"></div>
                    </div>`;

const createFrame = (params) => {
  const { id, className, data } = params;
  const content = document.createElement('div');
  content.id = id;
  content.classList.add(className);
  content.classList.add('page-panel');
  content.innerHTML = data;

  return content;
};

// 컴포넌트 정의
const iconToggleDefault = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    </svg>`;
const iconToggleHome = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
</svg>`;

const iconDeleteFile = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`;

let currentPage = 'home';
let useCustomField = false;
let carousel;
let carouselItems;
let carouselItemStartPoints;
let currentTabIndex = 0;
let prevTabIndex = 0;

const buttonIconClass = ``;
const labelClass = `mb-3 block text-sm font-medium text-black dark:text-white`;
const buttonBasicClass = `inline-flex rounded-md shadow-sm transition`;
const buttonSizeLarge = `px-4 py-2 text-base`;
const buttonSizeMedium = `px-4 py-1.5 text-base`;
const buttonSizeSmall = `px-2 py-1.5 text-sm`;
const buttonOutlineClass = `${buttonBasicClass} border-solid border hover:bg-orange-100 hover:border-orange-500`;
const buttonOutlinePrimaryClass = `${buttonBasicClass} border-solid border border-orange-600 hover:bg-orange-50`;
const buttonPrimaryClass = `${buttonBasicClass} bg-orange-500 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700`;
const buttonDangerClass = `${buttonBasicClass} bg-rose-500 text-white hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700`;
const linkText = `font-semibold  text-gray-900`;
const inputFieldClass = `relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-orange-500 active:border-orange dark:border-form-strokedark dark:bg-form-input`;
const main = (params) => {
  // 파일 업로드 진행시 클래스 추가: is-loading
  // Target: page-container
  const htmlData = `
        <div class="page-container">
            <header class="${headerContent}">
                <div class="inner">
                    <div class="text-holder">
                        <h1 class="title">종진의 이미지 아카이브</h1>
                        <p class="sub-title">나의 폰으로 담는 컬러 세상</p>
                    </div>
                    
                    <div class="${pageToggleArea}">
                        <button id="site-toggle" type="button" class="btn-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <div class="${previewCircle}">
                    <!-- Loading -->
                   <!-- loading('uploading') -->
                    
                    <button type="button" class="btn-circle ${pseudoCircle}">
                        <div class="img-circle ${pseudoCircle}"><img src="./img/img_wide.png" alt=""></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-camera" viewBox="0 0 16 16">
                          <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                          <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                        </svg>
                    </button>
                </div>
                
                
                <div class="${mainController} --is-ready">
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
                    
                    <button type="button" class="${buttonPrimaryClass} ${buttonSizeLarge} py-3 w-full justify-center disabled:bg-gray-500 disabled:text-gray-700" disabled>
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
<!--            <img src="https://img.freepik.com/premium-photo/bench-is-against-white-wall-with-tree-branch-corner_818261-5830.jpg" alt="">-->
            <img src="https://png.pngtree.com/background/20230617/original/pngtree-moonlit-mystical-forest-a-3d-render-of-a-foggy-night-picture-image_3682560.jpg" alt="">
            <!--<img src="./img/img_wide.png" alt="">-->
        </div>
        `;
  return createFrame({ ...params, data: htmlData });
};

const pageGallery = (params) => {
  const listData = `<div className="${galleryList}">
        <h4>갤러리 제목입니다.</h4>
        <ul className="list">
            <li className="list-item"><a href=""><img
                src="https://media.istockphoto.com/id/1333977253/ko/%EC%82%AC%EC%A7%84/%EB%B0%94%EC%9C%84-%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%EB%82%A8%EC%84%B1-%EC%82%AC%EC%9E%90.webp?b=1&s=170667a&w=0&k=20&c=MRGJuh2fNkPxiDnv0zv45jmOruLDOAc3-Yym9AXJNT0="
                alt=""></a></li>
            <li className="list-item"><a href=""><img
                src="https://cdn.pixabay.com/photo/2012/02/27/15/35/lion-17335_640.jpg" alt=""></a></li>
            <li className="list-item"><a href=""><img
                src="https://images.unsplash.com/photo-1601625463687-25541fb72f62?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                alt=""></a></li>
            <li className="list-item"><a href=""><img
                src="https://img.freepik.com/premium-photo/lion-image_811396-3531.jpg" alt=""></a></li>
            <li className="list-item"><a href=""><img
                src="https://t3.ftcdn.net/jpg/07/59/30/58/360_F_759305850_5mhndrh9wVMCWaNXuPmxcbFlPBSW65cO.jpg" alt=""></a>
            </li>
        </ul>
    </div>`;

  const htmlData = `<div class="page-container">
<!--<div class="page-header">-->
<!--    <h1 class="text-2xl text-neutral-900">갤러리 상세</h1>-->
<!--</div>-->
<div class="tabs">
<div class="tab-nav text-gray-400">
<a href="">전체</a><a href="">배경</a><a href="">건물 이미지</a><!--<a href="">인테리어</a>
<a href="">그래픽 이미</a><a href="">탭6 이미지 이미지</a><a href="">탭7 이미지</a><a href="">탭8 이미지</a>-->
</div>
</div>

<div id="el-tab-contents" class="tab-contents">
    <!-- tab1 -->
    <div class="tab-panel" id="tab-panel-1">
        <div class="${galleryList}">
            <div class="list-header">
                <h4 class="font-semibold">#전체</h4>
            </div>
            <ul class="list">
            <li class="list-item">
                <button type="button" title="삭제" class="btn-delete text-rose-500">${iconDeleteFile}</button>
                <a href=""><img src="https://media.istockphoto.com/id/1333977253/ko/%EC%82%AC%EC%A7%84/%EB%B0%94%EC%9C%84-%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%EB%82%A8%EC%84%B1-%EC%82%AC%EC%9E%90.webp?b=1&s=170667a&w=0&k=20&c=MRGJuh2fNkPxiDnv0zv45jmOruLDOAc3-Yym9AXJNT0=" alt=""></a>
            </li>
            <li class="list-item">
                <button type="button" title="삭제" class="btn-delete text-rose-500 selected">${iconDeleteFile}</button>
                <a href=""><img src="https://cdn.pixabay.com/photo/2012/02/27/15/35/lion-17335_640.jpg" alt=""></a>
            </li>
            <li class="list-item"><a href=""><img src="https://images.unsplash.com/photo-1601625463687-25541fb72f62?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://img.freepik.com/premium-photo/lion-image_811396-3531.jpg" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/1730E/production/_116709949_thumbnail-3.jpg.webp" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://t3.ftcdn.net/jpg/07/59/30/58/360_F_759305850_5mhndrh9wVMCWaNXuPmxcbFlPBSW65cO.jpg" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://img.sbs.co.kr/newimg/news/20221202/201726672_1280.jpg" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://www.ntoyshop.com/shopimages/fstr07/mobile/9/1065379_2" alt=""></a></li>
            </ul>
            
            <div class="btn-group">
                <button type="button" class="${buttonDangerClass} ${buttonSizeSmall}">카테고리 전체 삭제</button>
                <button type="button" class="${buttonOutlineClass} ${buttonSizeSmall}">선택 삭제</button>
            </div>
        </div>
        <div class="${galleryList} ">
            <div class="list-header">
                <h4 class="font-semibold">#1인테리어</h4>
            </div>
        
            <ul class="list">
            <li class="list-item"><a href=""><img src="https://media.istockphoto.com/id/1333977253/ko/%EC%82%AC%EC%A7%84/%EB%B0%94%EC%9C%84-%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%EB%82%A8%EC%84%B1-%EC%82%AC%EC%9E%90.webp?b=1&s=170667a&w=0&k=20&c=MRGJuh2fNkPxiDnv0zv45jmOruLDOAc3-Yym9AXJNT0=" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://cdn.pixabay.com/photo/2012/02/27/15/35/lion-17335_640.jpg" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://images.unsplash.com/photo-1601625463687-25541fb72f62?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://img.freepik.com/premium-photo/lion-image_811396-3531.jpg" alt=""></a></li>
            <li class="list-item"><a href=""><img src="https://t3.ftcdn.net/jpg/07/59/30/58/360_F_759305850_5mhndrh9wVMCWaNXuPmxcbFlPBSW65cO.jpg" alt=""></a></li>
            </ul>
            <div>
                <button type="button" class="${buttonPrimaryClass} ${buttonSizeLarge}">큰것</button>
                <button type="button" class="${buttonPrimaryClass} ${buttonSizeMedium}">펼쳐보기기본</button>
                <button type="button" class="${buttonPrimaryClass} ${buttonSizeSmall}">펼쳐보기 작은것</button></div>
                <button type="button" class="${linkText} ${buttonSizeSmall} hover:bg-gray-200 btn-toggle" title="펼쳐보기">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10"/>
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"/>
                    </svg>
                </button>
            </div>
    </div>
    <!-- tab2-->
    <div class="tab-panel" id="tab-panel-2">
        <div class="${galleryList} ">
                <div class="list-header">
                    <h4 class="font-semibold">#2배경</h4>
                </div>
                <ul class="list">
                <li class="list-item"><a href=""><img src="https://images.unsplash.com/photo-1601625463687-25541fb72f62?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://media.istockphoto.com/id/1333977253/ko/%EC%82%AC%EC%A7%84/%EB%B0%94%EC%9C%84-%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%EB%82%A8%EC%84%B1-%EC%82%AC%EC%9E%90.webp?b=1&s=170667a&w=0&k=20&c=MRGJuh2fNkPxiDnv0zv45jmOruLDOAc3-Yym9AXJNT0=" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://img.freepik.com/premium-photo/lion-image_811396-3531.jpg" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://t3.ftcdn.net/jpg/07/59/30/58/360_F_759305850_5mhndrh9wVMCWaNXuPmxcbFlPBSW65cO.jpg" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://cdn.pixabay.com/photo/2012/02/27/15/35/lion-17335_640.jpg" alt=""></a></li>
                </ul>
        </div>
    </div>
    <!-- tab3-->
    <div class="tab-panel" id="tab-panel-3">
        <div class="${galleryList} ">
                <div class="list-header">
                    <h4 class="font-semibold">#3 건물 이미지</h4>
                </div>
                <ul class="list">
                <li class="list-item"><a href=""><img src="https://img.freepik.com/premium-photo/lion-image_811396-3531.jpg" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://t3.ftcdn.net/jpg/07/59/30/58/360_F_759305850_5mhndrh9wVMCWaNXuPmxcbFlPBSW65cO.jpg" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://media.istockphoto.com/id/1333977253/ko/%EC%82%AC%EC%A7%84/%EB%B0%94%EC%9C%84-%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%EB%82%A8%EC%84%B1-%EC%82%AC%EC%9E%90.webp?b=1&s=170667a&w=0&k=20&c=MRGJuh2fNkPxiDnv0zv45jmOruLDOAc3-Yym9AXJNT0=" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://cdn.pixabay.com/photo/2012/02/27/15/35/lion-17335_640.jpg" alt=""></a></li>
                <li class="list-item"><a href=""><img src="https://images.unsplash.com/photo-1601625463687-25541fb72f62?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D" alt=""></a></li>
                </ul>
        </div>
    </div>
</div> `;
  return createFrame({ ...params, data: htmlData });
};

const setCurrentPage = () => {
  currentPage = currentPage === 'home' ? 'list' : 'home';
  document.body.dataset.currentPage = currentPage;
  if (currentPage === 'home') initCarousel();
};

// router
// https://velog.io/@sjoleee_/VanillaJS-%EB%B0%94%EB%8B%90%EB%9D%BCJS%EB%A1%9C-SPA-%EC%BB%A4%EB%A8%B8%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0
const routes = [
  {
    path: '/act3/',
    view: () => {
      console.log('---- 메인화면입니다.');
      currentPage = 'home';
    },
  },
  {
    path: '/act3/list',
    view: () => {
      console.log('---- 갤러리 리스트입니다.');
      // const pageId = 'list'
      // const page = document.querySelector(`#${pageId}`)
      // page.classList.add('show');
      // document.body.dataset.currentPage = pageId;
    },
  },
];

function navigateTo(url) {
  window.history.pushState(null, null, url);
  route();
}

const route = async (app) => {
  const pageMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: window.location.pathname === route.path,
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0], // 기본 라우트로 설정 (예: 메인 화면)
      isMatch: true,
    };
  }

  match.route.view();
};

function generatePage(app) {
  app.append(main({ id: 'home', className: pageTypeMain }));
  app.append(pageGallery({ id: 'list', className: pageTypeList }));
}

function initCarousel() {
  console.log('캐러셀 초기화');
  carousel.scrollTo(carouselItemStartPoints[0], 0);
  carouselItems[currentTabIndex].scrollTo(0, 0);
}
function init() {
  // app Loading
  const parser = new DOMParser();
  const appContainer = document.querySelector('#app');
  const doc = parser.parseFromString(loading('app-loading'), 'text/html');
  const element = doc.body.firstChild;
  document.body.append(element);
  setTimeout(() => {
    const appLoading = document.querySelector('#el-app-loading');
    generatePage(appContainer);
    appStart();

    appLoading.classList.add('fadeout');
    appContainer.classList.remove('fadeout');
    appLoading.addEventListener('transitionend', () => {
      appLoading.remove();
      document.body.dataset.currentPage = 'home';
    });
  }, 1000);

  function appStart() {
    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('a') || e.target.closest('button');
      if (!target || !(target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement)) return;

      e.preventDefault();
      if (target.tagName.toLowerCase() === 'a') navigateTo(target.href);
      if (target.tagName.toLowerCase() === 'button') {
        if (target.classList.contains('btn-toggle')) {
          setCurrentPage();
        } else if (target.classList.contains('btn-circle')) {
          console.log('카메라 버튼');
        }
      }
    });

    // 카테고리 선택
    const categorySelect = document.querySelector('#pic-category');
    categorySelect.addEventListener('change', (e) => {
      console.log('현재 선택된 카테고리', e.target.value);
      const customField = document.querySelector('#el-custom-filed');
      if (e.target.value === 'user_add' && customField.classList.contains('none')) {
        customField.classList.remove('none');
        customField.querySelector('input').focus();
      } else {
        if (!customField.classList.contains('none')) customField.classList.add('none');
      }
    });

    // carousel
    carousel = document.querySelector('#el-tab-contents');
    carouselItems = carousel.querySelectorAll('.tab-panel');

    // 아이템의 좌표 등록
    function getItemOffsetInfo() {
      carouselItemStartPoints = Array.from(carouselItems).map((item, index) => {
        return item.offsetLeft;
      });
    }
    getItemOffsetInfo();

    window.addEventListener('resize', () => {
      getItemOffsetInfo();
    });
    console.log('position ==>', carouselItemStartPoints);

    let isScrolling;
    const tabNav = document.querySelectorAll('.tab-nav > a');
    tabNav.forEach((nav, idx) => {
      nav.onclick = (e) => {
        e.preventDefault();
        carousel.scrollTo(carouselItemStartPoints[idx], 0);
      };
    });

    const scrollHandler = () => {
      const endDelayTime = 60;
      // Clear the existing timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(() => {
        console.log('------ Scrolling has stopped.');
        prevTabIndex = currentTabIndex;
        carouselItemStartPoints.forEach((position, index) => {
          if (carousel.scrollLeft === position) {
            currentTabIndex = index;
            if (prevTabIndex === currentTabIndex) return false;

            carouselItems[prevTabIndex].scrollTo(0, 0);
            tabNav.forEach((nav, idx) => {
              if (nav.classList.contains('bg-gray-700')) {
                nav.classList.remove('bg-gray-700', 'text-white');
              }
              if (idx === index) {
                nav.classList.add('bg-gray-700', 'text-white');
              }
            });
          }
        });

        isScrolling = null;
      }, endDelayTime); // Combine the delays to a single timeout
    };

    carousel.addEventListener('scroll', scrollHandler, false);

    initCarousel();
    tabNav[0].classList.add('bg-gray-700', 'text-white');
  }

  //window.addEventListener("popstate", route);

  //route();
  /*
    const okSubmit = lottie.loadAnimation({
        container: document.getElementById('loading'), // the dom element that will contain the animation
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        path: '/act3/js/lottie.submit.json', // the path to the animation json
        name: "Hello World",
    });
    setTimeout(()=>{
        okSubmit.destroy()
    },3000)
    */
}
document.addEventListener('DOMContentLoaded', init);
