import EventManager from './EventManager.js';
import { uploadImage } from '../utils/api.js';
import { DomParser } from "../utils/dom";

export default class Layout{
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.eventManager = new EventManager();
    }

    createBaseLayout() {
        const layoutHTML = `
            <div>프레임이다.</div>
        `;
        this.container.innerHTML = layoutHTML;
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
