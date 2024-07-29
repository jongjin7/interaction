import LayoutController from './controllers/LayoutController';

// vanilla extract
import '../css/main.css.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('------ DOMContentLoaded ------');
  const layoutController = new LayoutController('#app');
  layoutController.init();
});
