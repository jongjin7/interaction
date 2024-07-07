import Layout from './components/Layout.js';
import HomeFrame from "./pages/Home";
import ListFrame from './pages/List';
import EventManager from './components/EventManager.js';

// vanilla extract
import '../css/main.css.js'
import { pageTypeMain, pageTypeList} from '../css/pages.css'

document.addEventListener('DOMContentLoaded', () => {
    console.log('------ DOMContentLoaded ------')

    const pageList = [
        { id:'home', className: pageTypeMain},
        { id:'list', className: pageTypeList,}
    ];

    const appLayout = new Layout('#app');
    appLayout.createBaseLayout(pageList);


});
