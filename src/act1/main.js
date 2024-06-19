import { myStyle, themeClass, container } from './styles.css.js';

function init(){
    const input = document.querySelector('#file-test');
    const listHolder = document.querySelector('#img-list')
    const resultHolder = document.querySelector('#result')
    const TYPE = 'imgur'; //imgbb, imgur
    const isImgUr = TYPE === 'imgur';

    const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Client-ID e1163bcc97c274b");
    myHeaders.append("Authorization", "Bearer e1163bcc97c274b");
    myHeaders.append("Content-Type", "application/json");
    const albumToken = 'YFTbae4';
    // image host
    const imgur = {
        getUrl:`https://api.imgur.com/3/album/${albumToken}/images`,
        postUrl: `https://api.imgur.com/3/album/${albumToken}/add`,
        headers: myHeaders
    }
    for (const pair of imgur.headers.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }
    const imgbb = {
        getUrl:'https://api.imgbb.com/1/upload',
        postUrl: 'https://api.imgbb.com/1/upload',
        headers: {},
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

            if(!isImgUr) {
                formData.append('key', useImgHost.key);
                formData.append('image', file);
            } else {
                formData.append('ids[]', [file]);
                // append 메서드 이외에 필드 추가 시 사용할 수 있는 메서드로 set도 있습니다.
                // set이 append 메서드와 다른 점은 set은 name과 동일한 이름을 가진 필드를
                // 모두 제거하고 새로운 필드 하나를 추가한다는 데 있습니다.
                // 따라서 set 메서드를 쓰면 name을 가진 필드가 단 한 개만 있게끔 보장할 수 있습니다.
                // 이 외에 다른 기능은 append 메서드와 동일합니다.
                formData.append('deletehashes[]', ['xUWbW7MoruCLlZD']);
            }
            try {
                const response = await fetch(useImgHost.postUrl, {
                    method: "POST",
                    headers:useImgHost.headers,
                    body: formData,
                });
                const result = await response.json();
                console.log("업로드 성공:", result);
                const img = document.createElement('img');
                img.src = result.data.link;
                resultHolder.append(img);
            } catch (error) {
                console.error("업로드 실패:", error);
            }
        }
    }

    async function loadImages(){
        try {
            const formData = new FormData();
            const response = await fetch(`${useImgHost.getUrl}`, {
                method: "GET",
                headers: useImgHost.headers,
                redirect: 'follow'
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
