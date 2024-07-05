import Layout from './components/Layout.js';
import Gallery from './components/GalleryList.js';
import EventManager from './components/EventManager.js';
// vanilla extract
import '../css/main.css.js'
import { pageTypeMain, pageTypeList} from '../css/pages.css'
import HomeFrame from "./pages/Home";

document.addEventListener('DOMContentLoaded', () => {
    console.log('------ DOMContentLoaded ------')

    const pageNames = [
        { id:'home', className: pageTypeMain},
        { id:'list', className: pageTypeList,}
    ];
    const appLayout = new Layout('#app');
    appLayout.createPageFrames(pageNames);

    const homeFrame = new HomeFrame('#home');
    homeFrame.loadData();
});
