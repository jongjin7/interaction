import HomeView from '../views/HomeView';
import HomeModel from '../models/HomeModel';

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
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }

  getHandlers() {
    return {
      handleCaptureCamera: this.handleCaptureCamera.bind(this),
      handleCategoryChange: this.handleCategoryChange.bind(this),
      handleNewCategory: this.handleNewCategory.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
    };
  }

  handleCaptureCamera(event) {
    const uploadFile = event.target.files[0];
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

  handleCategoryChange(event) {
    if (event.target.value === 'user_add') {
      this.view.root.querySelector('#el-custom-filed').classList.remove('none');
      this.view.root.querySelector('#add-category').focus();
    } else {
      this.view.root.querySelector('#el-custom-filed').classList.add('none');
      this.model.setSelectedAlbumCategory(event.target.value);
    }
  }

  async handleNewCategory(event) {
    event.preventDefault();
    const title = event.target.querySelector('#add-category').value;
    try {
      await this.model.addCategory(title);
      const categories = await this.model.fetchCategories();
      this.view.render(categories);
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.model.submitImage();
      const categories = await this.model.fetchCategories();
      this.view.render(categories);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
}

export default HomeController;
