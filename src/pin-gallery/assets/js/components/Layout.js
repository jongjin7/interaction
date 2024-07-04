import EventManager from './EventManager.js';
import { uploadImage } from '../utils/api.js';

export default class Layout{
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.eventManager = new EventManager();
    }

    createBaseLayout() {
        const layoutHTML = `
            <div id="gallery-container"></div>
            <div id="detail-layer" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.8); color:white; z-index:1000;">
                <div id="detail-content"></div>
                <button id="close-button">Close</button>
            </div>
            <form id="upload-form">
                <input type="file" id="image-upload" name="image" accept="image/*" />
                <button type="submit">Upload</button>
            </form>
        `;
        this.container.innerHTML = layoutHTML;
        this.bindEvents();
    }

    bindEvents() {
        this.eventManager.delegateEvent('#close-button', 'click', () => this.toggleDetailLayer(false));
        this.eventManager.delegateEvent('#upload-form', 'submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            try {
                await uploadImage(formData);
                document.dispatchEvent(new CustomEvent('refreshGallery'));
            } catch (error) {
                console.error('Image upload failed', error);
            }
        });
    }
}
