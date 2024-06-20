import { myStyle, themeClass, container } from './styles.css.js';

function init(){
    const input = document.querySelector('#file-test');
    const listHolder = document.querySelector('#img-list')
    const resultHolder = document.querySelector('#result')
    const TYPE = 'imgur'; //imgbb, imgur
    const isImgUr = TYPE === 'imgur';

    // imgur api 설정
    const albumHash = '87vbR7E';
    const getHeader = new Headers();
    getHeader.append("Authorization", "Client-ID bc6b68c16865024");

    const postHeader = new Headers();
    postHeader.append("Authorization", "Bearer 5f1e7737e69cb62f937b52b90907f179b00a5de2");
    postHeader.append("Content-Type", "application/json");
    // image host
    const imgur = {
        getUrl:`https://api.imgur.com/3/album/${albumHash}/images`,
        postImageUrl: `https://api.imgur.com/3/image`,
        postAlbumUrl: `https://api.imgur.com/3/album/${albumHash}`,
        getHeader: getHeader,
        postHeader: postHeader
    }

    const imgbb = {
        getUrl:'https://api.imgbb.com/1/upload',
        postUrl: 'https://api.imgbb.com/1/upload',
        headers: {},
        key: '17df8eb7ff3b5f94433fe641ae1f7365'
    }

    const useImgHost = isImgUr ? imgur: imgbb;


    loadImages(); // 리스트호출

    input.onchange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const formdata = new FormData();
        formdata.append('image', file);
        formdata.append("type", "image");
        formdata.append("title", "업로드용 파일");
        formdata.append("description", "브라우저에서 올리는 것이다.");
        //formdata.append("cover", file);
        // append 메서드 이외에 필드 추가 시 사용할 수 있는 메서드로 set도 있습니다.
        // set이 append 메서드와 다른 점은 set은 name과 동일한 이름을 가진 필드를
        // 모두 제거하고 새로운 필드 하나를 추가한다는 데 있습니다.
        // 따라서 set 메서드를 쓰면 name을 가진 필드가 단 한 개만 있게끔 보장할 수 있습니다.
        // 이 외에 다른 기능은 append 메서드와 동일합니다. https://imgur.com

        try {
            const response = await fetch(`${useImgHost.postImageUrl}`, {
                method: "POST",
                headers: useImgHost.getHeader,
                body: formdata,
                redirect: 'follow'
            });
            const result = await response.json();
            const resData = result.data;
                console.log("업로드 성공:", result);
            await addAlbumToImages(resData.id, resData.deletehash );
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    }

    async function addAlbumToImages(imgHash, deletehash){
        console.log('dddd', imgHash)
        const formdata = new FormData();
        formdata.append('ids[]', imgHash);

        try {
            const response = await fetch(`${useImgHost.postAlbumUrl}/add`, {
                method: "POST",
                headers: useImgHost.postHeader,
                body: formdata,
                redirect: 'follow'
            });

            const result = await response.json();
            console.log("앨범으로 이미지 이동 =>", result);
            //await location.reload();
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    }

    async function loadImages(){
        try {
            const response = await fetch(`${useImgHost.getUrl}`, {
                method: "GET",
                headers: useImgHost.getHeader,
                redirect: 'follow'
            });
            const result = await response.json();
            console.log("GET 성공:", result);
            result.data.forEach(item=>{
                const img = document.createElement('img');
                img.src = item.link;
                img.style.width=`${200}px`;
                img.style.margin=`${8}px`
                img.style.verticalAlign=`middle`;
                listHolder.append(img);
            })

        } catch (error) {
            console.error("GET 실패:", error);
        }
    }
}



document.addEventListener('DOMContentLoaded', init)
