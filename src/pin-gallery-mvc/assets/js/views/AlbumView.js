// src/views/albumView.js
import lottie from 'lottie-web';
import { mainFormGroup } from '../../css/pages.css';
import DomParser from '../utils/dom';
import { LoadingBasic as Loading } from '../components/Loading';

let containerBgImg = null;
let centerThumbImg = null;
let customField;
let forms;
let formsItemSelect;
let formsItemInput;
let formsItemSubmit;
let stateCenterIcon;

export function initialize(rootEl) {
  containerBgImg = rootEl.querySelector('.bg-container');
  centerThumbImg = rootEl.querySelector('.img-circle img');

  forms = rootEl.querySelector(`.${mainFormGroup}`);
  formsItemSelect = rootEl.querySelector('#category-select');
  formsItemInput = rootEl.querySelector('#add-category');
  formsItemSubmit = rootEl.querySelector('#submit-upload');

  initializeIconShot();
}

export function initializeIconShot() {
  stateCenterIcon = lottie.loadAnimation({
    container: document.getElementById('el-icon-shot'),
    renderer: 'canvas',
    loop: true,
    autoplay: true,
    path: '/assets/pin-gallery/lotties/lottie.smile.json',
  });
}

export function updateCategoryOptions(categories) {
  const options = categories.map((item) => `<option value='${item.id}'>${item.title}</option>`).join(' ');
  formsItemSelect.innerHTML = `
    <option value=''>앨범을 선택하세요</option>
    ${options}
    <option value='user_add'>신규 카테고리 직접 입력</option>
  `;
}

export function toggleFormDisabled() {
  const formItems = forms.querySelectorAll('select, button');
  formItems.forEach((item) => {
    if (item.getAttribute('disabled')) {
      item.removeAttribute('disabled');
    } else {
      item.setAttribute('disabled', 'disabled');
    }
  });
}

export function setImage(imgsrc) {
  containerBgImg.src = centerThumbImg.src = imgsrc;
}

export function setRandomImage() {
  const arrayLength = 10;
  const randomImages = [];
  for (let i = 0; i < arrayLength; i++) {
    randomImages.push(`/assets/pin-gallery/imgs/@random_${i}.png`);
  }
  const randomIndex = () => Math.floor(Math.random() * arrayLength);
  setImage(randomImages[randomIndex()]);
}

export function showCustomField() {
  customField.classList.remove('none');
  customField.querySelector('input').focus();
}

export function hideCustomField() {
  customField.classList.add('none');
}

export function showLoading() {
  root.querySelector('.btn-circle').before(DomParser(Loading('uploading')));
  root.querySelector('.icon-box').append(DomParser(Loading('btn-loading')));
}

export function hideLoading() {
  const loading = document.querySelector('#el-uploading');
  const btnLoading = document.querySelector('#el-btn-loading');
  loading.remove();
  setTimeout(() => {
    btnLoading.remove();
  }, 200);
}

export function resetForm() {
  formsItemInput.value = '';
  formsItemSelect.value = '';
}
