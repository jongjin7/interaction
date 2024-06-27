import { myStyle, themeClass, container, backgroundImg, bodyBg} from './styles.css.js';

function init(){
    const mainEl = document.createElement('div');
    mainEl.id='wrapper';
    mainEl.classList.add(bodyBg);
    mainEl.innerHTML = `
    <div class="side-content">
        <div class="text-holder">
            <h1>GO!</h1>
            <div class="">
                <strong class="${themeClass.brand}">색깔별로 찍어보기</strong>
                <p class="subject">TAKE ON</p>
            </div>
        </div>
    </div>
    `;
    document.body.append(mainEl);
}
document.addEventListener('DOMContentLoaded', init)
