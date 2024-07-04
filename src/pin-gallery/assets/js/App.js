import Layout from './components/Layout.js';
import Gallery from './components/GalleryList.js';
import EventManager from './components/EventManager.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('------ DOMContentLoaded ------')

    const appLayout = new Layout('app');
    appLayout.createBaseLayout();
});
