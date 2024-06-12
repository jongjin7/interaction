import { myStyle, themeClass, container } from './styles.css.js';

function init(){
        const el1 = document.createElement('div');
        el1.innerHTML = `<section class="${themeClass} ${container}">
            <h1 class="${myStyle} ${container}">3번째 파일</h1>
          </section>`;
        document.body.append(el1);
}
document.addEventListener('DOMContentLoaded', init)
