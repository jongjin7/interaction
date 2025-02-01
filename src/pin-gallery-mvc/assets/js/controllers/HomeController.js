import lottie from 'lottie-web';
import HomeView from '../views/HomeView';
import HomeModel from '../models/HomeModel';
import DomParser from '../utils/dom';
import { LoadingBasic as Loading } from '../components/Loading';

export default class HomeController {
  constructor(containerId) {
    this.model = new HomeModel();
    this.view = new HomeView(containerId);
    this.listController = null;
  }

  async initialize(listController) {
    try {
      const categories = await this.model.fetchCategories();
      this.view.render(categories);
      this.view.bindEvents(this.getHandlers());
      this.listController = listController;
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
        this.toggleFormDisabled();
        this.view.stateCenterIcon.stop();
        this.model.setUploadFile(uploadFile);
      };
      reader.readAsDataURL(uploadFile);
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
        alert('파일을 읽는 도중 오류가 발생했습니다. 다시 시도해 주세요.');
      };
    }
  }

  handleCategoryChange(event) {
    if (event.target.value === 'user_add') {
      this.view.customField.classList.remove('none');
      this.view.formsItemInput.focus();
    } else {
      this.view.customField.classList.add('none');
      this.model.setSelectedAlbumCategory(event.target.value);
    }
  }

  toggleFormDisabled() {
    const formItems = this.view.formGroupBox.querySelectorAll('select, #submit-upload');
    formItems.forEach((item) => {
      if (item.getAttribute('disabled')) {
        item.removeAttribute('disabled');
      } else {
        item.setAttribute('disabled', 'disabled');
      }
    });
  }

  async handleNewCategory() {
    const title = this.view.formsItemInput.value;
    try {
      await this.model.addCategory(title);
      const result = await this.model.fetchCategories();
      if (result) {
        this.view.customField.classList.add('none');
        this.view.formsItemInput.value = '';
        this.generateAlbumCategory(result);
      }
    } catch (error) {
      //console.error('Error adding new category:', error.message);
      if (error.message.includes('409')) {
        alert(error);
      }
    }
  }

  generateAlbumCategory(categories) {
    const optionItems = categories
      .map((item) => {
        return `<option value='${item.id}'>${item.title}</option>`;
      })
      .join(' ');

    // 셀렉트박스에 옵션 추가
    this.view.formsItemSelect.innerHTML = `
       <option value=''>앨범을 선택하세요</option>
        ${optionItems}
       <option value='user_add'>신규 카테고리 직접 입력</option>
    `;
  }

  async handleSubmit() {
    if (!this.model.selectedAlbumCategory) {
      alert('카테고리를 선택해 주세요.');
      this.view.formsItemSelect.focus();
      return;
    }

    try {
      this.showSubmitProgressIndicator();
      const result = await this.model.sendFileForm();
      if (result) {
        this.handleSuccess();
      }
    } catch (error) {
      console.error('Error during submission:', error);
      if (error.message.includes('409')) {
        alert(error);
        location.reload();
      }
    }
  }

  showSubmitProgressIndicator() {
    this.view.root.classList.add('is-loading');
    this.view.container.querySelector('.btn-circle').before(DomParser(Loading('uploading'))); // 카메라 서클
    this.view.container.querySelector('.icon-box').append(DomParser(Loading('btn-loading'))); // submit 버튼
    this.view.formsItemSubmit.blur();
  }

  resetStatePage() {
    this.toggleFormDisabled();
    this.view.root.classList.remove('is-loading');
    this.view.stateCenterIcon.play();
  }

  resetForm() {
    this.view.formsItemInput.value = '';
    this.view.formsItemSelect.value = '';
  }

  handleSuccess() {
    const iconSubmit = lottie.loadAnimation({
      container: document.getElementById('el-icon-submit'),
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path: '/assets/pin-gallery/lotties/lottie.submit.json',
    });

    const loading = document.querySelector('#el-uploading'); // 카메라 인풋 영역 로딩 상태
    const btnLoading = document.querySelector('#el-btn-loading'); // Submit 버튼
    loading.remove();
    setTimeout(() => {
      btnLoading.remove();
    }, 200);

    iconSubmit.setSpeed(1.5);
    iconSubmit.play();

    iconSubmit.addEventListener('complete', () => {
      this.resetStatePage();
      this.resetForm();
      iconSubmit.destroy();
      this.view.setRandomImage();
      this.listController.updateList();
    });
  }
}
