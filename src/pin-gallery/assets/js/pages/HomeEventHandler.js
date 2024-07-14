import lottie from 'lottie-web';
import { mainFormGroup } from '../../css/pages.css';
import DomParser from '../utils/dom';
import { LoadingBasic as Loading } from '../components/Loading';
import { addNewCategory, fetchCategory, sendImageFile } from '../utils/api';

let root;
let containerBgImg = null;
let centerThumbImg = null;
let customField;
let forms;
let formsItemSelect;
let formsItemInput;
// let formsItemSubmit;
let uploadFile;
let stateCenterIcon;

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

export function initializeIconShot() {
  stateCenterIcon = lottie.loadAnimation({
    container: document.getElementById('el-icon-shot'),
    renderer: 'canvas',
    loop: true,
    autoplay: true,
    path: '/pin-gallery/assets/lotties/lottie.smile.json',
  });
}

export function getElements(rootEl) {
  root = rootEl;
  containerBgImg = root.querySelector('.bg-container');
  centerThumbImg = root.querySelector('.img-circle img');

  forms = root.querySelector(`.${mainFormGroup}`);
  formsItemSelect = root.querySelector('#category-select');
  formsItemInput = root.querySelector('#add-category');
  // formsItemSubmit = root.querySelector('#submit-upload');

  // 아이콘 등록
  initializeIconShot();
}

export async function getAlbumCategory() {
  const resData = await fetchCategory();
  const lis = resData.data
    .map((item) => {
      return `<option value='${item.id}'>${item.title}</option>`;
    })
    .join(' ');

  // 셀렉트박스에 옵션 추가
  formsItemSelect.innerHTML = `
       <option value=''>앨범을 선택하세요</option>
        ${lis}
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
  // eslint-disable-next-line no-multi-assign
  containerBgImg.src = centerThumbImg.src = imgsrc;
}

export function setRandomImage() {
  const arrayLength = 10;
  const randomImages = [];
  for (let i = 0; i < arrayLength; i++) {
    randomImages.push(`./assets/img/@random_${i}.png`);
  }
  const randomIndex = () => Math.floor(Math.random() * arrayLength);
  setImage(randomImages[randomIndex()]);
}

export function handleCategoryChange(e) {
  customField = document.querySelector('#el-custom-filed');
  if (e.target.value === 'user_add' && customField.classList.contains('none')) {
    customField.classList.remove('none');
    customField.querySelector('input').focus();
  } else {
    if (!customField.classList.contains('none')) customField.classList.add('none');
    selectedAlbumCategory.selected = e.target.value;
  }
}

export function handleCaptureCamera(e) {
  // eslint-disable-next-line prefer-destructuring
  uploadFile = e.target.files[0];

  if (uploadFile) {
    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = window.URL.createObjectURL(uploadFile);
      window.URL.revokeObjectURL(uploadFile);
      setImage(imgUrl);
      toggleFormDisabled();
      stateCenterIcon.stop();
    };
    reader.readAsDataURL(uploadFile);
    reader.onerror = (err) => {
      console.error('Error reading file:', err);
    };
  }
}

export async function handleNewCategory(e) {
  const formdata = new FormData();
  formdata.append('title', e.target.value);
  formdata.append('description', 'This albums contains a lot of dank memes. Be prepared.');
  const result = await addNewCategory(formdata);
  if (result) {
    customField.classList.add('none');
    await getAlbumCategory();
  }
}

function resetStatePage() {
  toggleFormDisabled();
  root.classList.remove('is-loading');
  stateCenterIcon.play();
}

function resetForm() {
  formsItemInput.value = '';
  formsItemSelect.value = '';
}

export async function handleSubmit() {
  if (!selectedAlbumCategory.selected) {
    // eslint-disable-next-line no-alert
    alert('카테고리를 선택해 주세요.');
    formsItemSelect.focus();
  } else {
    console.log('------ 전송 ------');
    root.classList.add('is-loading');
    root.querySelector('.btn-circle').before(DomParser(Loading('uploading')));

    const formdata = new FormData();
    formdata.append('image', uploadFile);
    formdata.append('type', 'image');
    formdata.append('title', '업로드용 파일');
    formdata.append('description', '새로운 곳에서 브라우저에서 올리는 것이다.');

    const result = await sendImageFile(formdata, selectedAlbumCategory.selected);
    console.log('submit result=>', result);
    if (result) {
      // 등록 성공시
      const iconSubmit = lottie.loadAnimation({
        container: document.getElementById('el-icon-submit'),
        renderer: 'canvas',
        loop: false,
        autoplay: false,
        path: '/pin-gallery/assets/lotties/lottie.submit.json',
      });

      const loading = document.querySelector('#el-uploading');
      loading.remove();

      iconSubmit.setSpeed(1.5);
      iconSubmit.play();

      iconSubmit.addEventListener('complete', () => {
        resetStatePage();
        resetForm();
        iconSubmit.destroy();
        window.location.reload();
      });
    }
  }
}
