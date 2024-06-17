import { myStyle, themeClass, container } from './styles.css.js';

function init(){
    const input = document.querySelector('#file-test');
    const listHolder = document.querySelector('#img-list')
    const resultHolder = document.querySelector('#result')
    const TYPE = 'imgbb'; //imgbb, imgur
    const isImgUr = TYPE === 'imgur';
    // image host
    const imgur = {
        getUrl:'',
        postUrl: 'https://api.imgur.com/3/image',
        Headers: {
            Authorization: "a7ee068b4024473b1e6cb37798440de81201ae32",
            Accept: "application/json",
        }
    }
    const imgbb = {
        getUrl:'https://api.imgbb.com/1/upload',
        postUrl: 'https://api.imgbb.com/1/upload',
        Headers: {},
        key: '17df8eb7ff3b5f94433fe641ae1f7365'
    }

    const useImgHost = isImgUr ? imgur: imgbb;


    loadImages();
    uploadImage();
        const el1 = document.createElement('div');
        el1.innerHTML = `<section class="${themeClass} ${container}">
            <h1 class="${myStyle} ${container}">!!!Hello world!</h1>
          </section>`;
        document.body.append(el1);


    function uploadImage(){
        input.onchange = async (e)=>{
            const formData = new FormData();
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            formData.set('image', file);
            if(!isImgUr) formData.set('key', useImgHost.key);
            try {
                const response = await fetch(useImgHost.postUrl, {
                    method: "POST",
                    headers:useImgHost.headers,
                    body: formData,
                });
                const result = await response.json();
                console.log("업로드 성공:", result);
                const img = document.createElement('img');
                img.src = result.data.medium.url;
                resultHolder.append(img);
            } catch (error) {
                console.error("업로드 실패:", error);
            }
        }
    }

    async function loadImages(){
        try {
            const response = await fetch(useImgHost.getUrl, {
                method: "GET",
                headers: useImgHost.headers,
            });
            const result = await response.json();
            console.log("GET 성공:", result);
            const img = document.createElement('img');
            //img.src = result.data.thumb.url;
            listHolder.append(img);
        } catch (error) {
            console.error("GET 실패:", error);
        }
    }
}



document.addEventListener('DOMContentLoaded', init)
