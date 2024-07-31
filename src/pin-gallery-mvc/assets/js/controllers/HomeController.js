import lottie from 'lottie-web';
import HomeModel from '../models/HomeModel';
import HomeView from '../views/HomeView';

class HomeController {
  constructor(containerId) {
    this.model = new HomeModel();
    this.view = new HomeView(containerId);
  }

  async initialize() {
    try {
      const categories = await this.model.fetchCategories();
      this.view.render(categories);
      this.view.bindEvents(this.getHandlers());
      this.view.initializeIconShot();
      this.setRandomImage();
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }

  setRandomImage() {
    const arrayLength = 10;
    const randomImages = Array.from({ length: arrayLength }, (_, i) => `/assets/pin-gallery/imgs/@random_${i}.png`);
    const randomIndex = () => Math.floor(Math.random() * arrayLength);
    this.view.setImage(randomImages[randomIndex()]);
  }

  getHandlers() {
    return {
      handleCaptureCamera: this.handleCaptureCamera.bind(this),
      handleCategoryChange: this.handleCategoryChange.bind(this),
      handleNewCategory: this.handleNewCategory.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
    };
  }

  handleCaptureCamera(e) {
    const uploadFile = e.target.files[0];
    if (uploadFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = window.URL.createObjectURL(uploadFile);
        window.URL.revokeObjectURL(uploadFile);
        this.view.setImage(imgUrl);
        this.view.toggleFormDisabled();
        this.model.setUploadFile(uploadFile);
      };
      reader.readAsDataURL(uploadFile);
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
        this.model.setUploadFile(uploadFile);
      };
    }
  }

  async handleCategoryChange(e) {
    if (e.target.value === 'user_add') {
      this.view.root.querySelector('#el-custom-filed').classList.remove('none');
      this.view.root.querySelector('#add-category').focus();
    } else {
      this.view.root.querySelector('#el-custom-filed').classList.add('none');
      this.model.setSelectedAlbumCategory(e.target.value);
    }
  }

  async handleNewCategory(e) {
    try {
      const result = await this.model.addCategory(e.target.value);
      this.view.root.querySelector('#el-custom-filed').classList.add('none');
      this.view.render(result); // Update categories
    } catch (error) {
      console.error('Failed to add new category:', error);
    }
  }

  async handleSubmit() {
    if (!this.model.selectedAlbumCategory) {
      alert('카테고리를 선택해 주세요.');
      this.view.root.querySelector('#category-select').focus();
    } else {
      this.view.showLoading();
      this.view.showButtonLoading();
      try {
        const result = await this.model.submitImage();
        if (result) {
          const iconSubmit = lottie.loadAnimation({
            container: document.getElementById('el-icon-submit'),
            renderer: 'canvas',
            loop: false,
            autoplay: false,
            path: '/assets/pin-gallery/lotties/lottie.submit.json',
          });

          this.view.removeLoading();
          this.view.removeButtonLoading();

          iconSubmit.setSpeed(1.5);
          iconSubmit.play();

          iconSubmit.addEventListener('complete', () => {
            this.view.toggleFormDisabled();
            iconSubmit.destroy();
            this.setRandomImage();
          });
        }
      } catch (error) {
        console.error('Submit failed:', error);
      }
    }
  }
}

export default HomeController;
