import LayoutViewModel from './viewmodels/LayoutViewModel';

// vanilla extract
import '../css/main.css.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('------ DOMContentLoaded ------');
  const layoutController = new LayoutViewModel('#app');
  layoutController.init();
});
