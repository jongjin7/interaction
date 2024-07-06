import EventManager from './EventManager.js';
import { uploadImage } from '../utils/api.js';
import { DomParser } from "../utils/dom";
import { Loading } from "./CommonTemplate";
import HomeFrame from "../pages/Home";
import ListFrame from "../pages/List";

export default class Layout{
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.eventManager = new EventManager();
    }

    createBaseLayout(content) {
        document.body.append(DomParser(Loading('app-loading')));
        setTimeout(()=>{
            const appLoading = document.querySelector('#el-app-loading');
            appLoading.classList.add('fadeout')
            this.container.classList.remove('fadeout')

            this.createPageFrames(content)

            //임시
            const homeFrame = new HomeFrame('#home');
            homeFrame.loadData();
            const listFrame = new ListFrame('#list');
            listFrame.loadData();

            appLoading.addEventListener('transitionend', ()=> {
                appLoading.remove();
                document.body.dataset.currentPage = 'home';
            })
        },1000)
    }

    createPageFrames(pages){
        pages.forEach(page => {
            const {id, className} = page;
            const pageFrameHTML = `
                <div id="${id}" class="page-panel ${className}">
                    <div class="page-container"></div>
                </div>
            `;
            this.container.append(DomParser(pageFrameHTML));
        });
    }
}
