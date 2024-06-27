import { sideContent, vars, themeClass, container, iconLink, mainBox} from '../css/styles.css.js';

// router
// https://velog.io/@sjoleee_/VanillaJS-%EB%B0%94%EB%8B%90%EB%9D%BCJS%EB%A1%9C-SPA-%EC%BB%A4%EB%A8%B8%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%9D%BC%EC%9A%B0%ED%84%B0
const routes = [
    { path: "/act3/", view: ()=>{console.log("---- 메인화면입니다.")} },
    { path: "/act3/mypage", view: ()=>{console.log("---- 마이페이지입니다.")} }
];

const App = async () => {
    const pageMatches = routes.map(route => {
        return {
            route: route,
            isMatch: window.location.pathname === route.path,
        };
    });
    let match = pageMatches.find(pageMatch => pageMatch.isMatch);
    match.route.view();
}

function init(){
    const mainEl = document.createElement('div');
    mainEl.id='app';
    mainEl.classList.add(mainBox);
    mainEl.innerHTML = `
    <div class="${sideContent}">
        <div class="text-holder">
            <h1 class="${container}">GO!</h1>
            <div class="">
                <strong style="color: ${vars.color.brand}">색깔별로 찍어보기</strong>
                <p class="subject">TAKE ON</p>
                <a href="./" class="${iconLink}">메인으로</a>
                <a href="./mypage">내 페이지로</a>
            </div>
        </div>
    </div>
    `;
    document.body.append(mainEl);


    const navigate = url => {
        window.history.pushState(null, null, url);
        App();
    };

    document.body.addEventListener("click", e => {
        const target = e.target.closest("a");
        if (!(target instanceof HTMLAnchorElement)) return;
        e.preventDefault();
        navigate(target.href);
    });

    window.addEventListener("popstate", App);
}
document.addEventListener('DOMContentLoaded', init)
