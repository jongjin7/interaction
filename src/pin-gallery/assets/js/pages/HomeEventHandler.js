import lottie from 'lottie-web';
import { mainFormGroup} from "../../css/pages.css";
import { DomParser } from '../utils/dom';
import  { LoadingBasic as Loading } from "../components/Loading";

function toggleFormDisabled(root) {
    const forms = root.querySelector(`.${mainFormGroup}`);
    const formItems = forms.querySelectorAll('select, button');
    formItems.forEach(item => {
        if (item.getAttribute('disabled')) {
            item.removeAttribute('disabled');
        } else {
            item.setAttribute('disabled', 'disabled');
        }
    });
}

export function initializeIconShot() {
    return lottie.loadAnimation({
        container: document.getElementById('el-icon-shot'),
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        path: '/pin-gallery/assets/data/lottie.smile.json',
        name: "Hello World",
    });
}

export function setRandomImage(root) {
    const containerImg = root.querySelector('.bg-container');
    const thumbImg = root.querySelector('.img-circle img');
    const pic = ['./assets/img/@random_1.png', './assets/img/@random_2.png', './assets/img/@random_3.png', './assets/img/@random_4.png', './assets/img/@random_5.jpg'];
    const randomIndex = () => Math.floor(Math.random() * pic.length);
    containerImg.src = thumbImg.src = pic[randomIndex()];
}

export function handleCircleButtonClick(root, iconShot) {
    let isClicked = false;
    return (e) => {
        const target = e.target;
        if (!isClicked) {
            root.classList.add('is-loading');
            target.before(DomParser(Loading('uploading')));
            iconShot.stop();
            setRandomImage(root);
            toggleFormDisabled(root);
        } else {
            const loading = document.querySelector('#el-uploading');
            loading.remove();

            const iconSubmit = lottie.loadAnimation({
                container: document.getElementById('el-icon-submit'),
                renderer: 'canvas',
                loop: false,
                autoplay: false,
                path: '/pin-gallery/assets/data/lottie.submit.json',
            });

            iconSubmit.play();

            iconSubmit.addEventListener("complete", () => {
                root.classList.remove('is-loading');
                iconShot.play();
                iconSubmit.destroy();
                toggleFormDisabled(root);
            });
        }

        isClicked = !isClicked;
    };
}

export function handleCategoryChange(e) {
    const customField = document.querySelector('#el-custom-filed');
    if (e.target.value === 'user_add' && customField.classList.contains('none')) {
        customField.classList.remove('none');
        customField.querySelector('input').focus();
    } else {
        if (!customField.classList.contains('none')) customField.classList.add('none');
    }
}
