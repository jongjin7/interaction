import Layout from './components/Layout.js';

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
