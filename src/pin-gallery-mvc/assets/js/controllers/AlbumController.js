// src/controllers/albumController.js
import * as model from '../models/albumModel.js';
import * as view from '../views/albumView.js';

let root;
const selectedAlbumCategory = {
  category: '',

  get selected() {
    return this.category;
  },

  set selected(val) {
    console.log('selected!');
    this.category = val;
  },
};

export async function initialize(rootEl) {
  root = rootEl;
  view.initialize(rootEl);
  const categories = await model.getAlbumCategory();
  view.updateCategoryOptions(categories);

  // Event Listeners
  view.formsItemSelect.addEventListener('change', handleCategoryChange);
  view.formsItemInput.addEventListener('change', handleNewCategory);
  view.formsItemSubmit.addEventListener('click', handleSubmit);
  view.containerBgImg.addEventListener('change', handleCaptureCamera);
}

export function handleCategoryChange(e) {
  if (e.target.value === 'user_add') {
    view.showCustomField();
  } else {
    view.hideCustomField();
    selectedAlbumCategory.selected = e.target.value;
  }
}

export async function handleNewCategory(e) {
  const result = await model.createCategory(e.target.value, 'This album contains a lot of dank memes. Be prepared.');
  if (result) {
    view.hideCustomField();
    const categories = await model.getAlbumCategory();
    view.updateCategoryOptions(categories);
  }
}

export function handleCaptureCamera(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = window.URL.createObjectURL(file);
      window.URL.revokeObjectURL(file);
      view.setImage(imgUrl);
      view.toggleFormDisabled();
      stateCenterIcon.stop();
    };
    reader.readAsDataURL(file);
    reader.onerror = (err) => {
      console.error('Error reading file:', err);
    };
  }
}

export async function handleSubmit() {
  if (!selectedAlbumCategory.selected) {
    alert('카테고리를 선택해 주세요.');
    view.formsItemSelect.focus();
  } else {
    console.log('------ 전송 ------');
    view.showLoading();
    view.formsItemSubmit.blur(); // 업로드 버튼

    const result = await model.uploadImage(
      uploadFile,
      selectedAlbumCategory.selected,
      '업로드용 파일',
      '새로운 곳에서 브라우저에서 올리는 것이다.',
    );
    console.log('submit result=>', result);
    if (result) {
      const iconSubmit = lottie.loadAnimation({
        container: document.getElementById('el-icon-submit'),
        renderer: 'canvas',
        loop: false,
        autoplay: false,
        path: '/assets/pin-gallery/lotties/lottie.submit.json',
      });

      iconSubmit.setSpeed(1.5);
      iconSubmit.play();

      iconSubmit.addEventListener('complete', () => {
        view.resetForm();
        view.hideLoading();
        view.toggleFormDisabled();
        stateCenterIcon.play();
        iconSubmit.destroy();
        window.location.reload();
      });
    }
  }
}
