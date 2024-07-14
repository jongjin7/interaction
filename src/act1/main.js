async function getVideo() {
    try {
        const localMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(localMediaStream);

        const video = document.querySelector('video'); // 비디오 요소를 선택
        video.srcObject = localMediaStream; // srcObject를 사용하여 미디어 스트림을 설정
        await video.play(); // play() 호출
    } catch (err) {
        console.error('OH NO!', err);
    }
}

function init(){
    const fileInput = document.querySelector('#file');
    const previewHolder = document.querySelector('#preview');
    const resultHolder = document.querySelector('#result');

    const btnClearAll = document.querySelector('#clear-all')
    const TYPE = 'imgur'; //imgbb, imgur
    const isImgUr = TYPE === 'imgur';

    // imgur api 설정
    const albumHash = 'oAij3qf';
    const getHeader = new Headers();
    getHeader.append("Authorization", "Client-ID abcdc33d1b64fbd");
    getHeader.append("Accept", "application/json");

    const postHeader = new Headers();
    postHeader.append("Authorization", "Bearer 10a6370ae8be145f958a2e689d317935ae8ea008");
    postHeader.append("Accept", "application/json");
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

    let imageList; // 이미지 리스트

    loadImages(); // 리스트호출

    fileInput.onchange =  async (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload =  () => {
                const img = new Image();
                img.src = window.URL.createObjectURL(file);
                img.style.width='200px';
                img.style.border=`1px solid green`;
                previewHolder.append(img);
                window.URL.revokeObjectURL(file);


                sendImages(reader.result, file);
            };
            reader.readAsDataURL(file);
            reader.onerror = (err) => {
                console.error('Error reading file:', err);
            };
        }

        async function sendImages(fileUrl, file){
            const formdata = new FormData();
            const base64Str = fileUrl.replace(/^data:image\/(png|jpg);base64,/, "");
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
                    headers: useImgHost.postHeader,
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
    }

    async function addAlbumToImages(imgHash, deletehash){
        const formdata = new FormData();
        formdata.append('ids[]', imgHash);
        console.log('move....', `${useImgHost.postAlbumUrl}/add`)
        try {
            const response = await fetch(`${useImgHost.postAlbumUrl}/add`, {
                method: "POST",
                headers: useImgHost.postHeader,
                body: formdata,
                redirect: 'follow'
            });

            const result = await response.json();
            console.log("앨범으로 이미지 이동 =>", result);
            await loadImages();
        } catch (error) {
            console.error("업로드 실패:", error);
        }

        fileInput.value='';
        previewHolder.innerHTML = '';
    }

    async function loadImages(){
        try {

            // const setting = await fetch(`https://api.imgur.com/3/account/ttl2875kr/albums/0`, {
            //     method: "GET",
            //     headers: useImgHost.postHeader,
            //     redirect: 'follow'
            // });
            //
            // console.log('setting:', setting)

            const response = await fetch(`${useImgHost.getUrl}`, {
                method: "GET",
                headers: useImgHost.getHeader,
                redirect: 'follow'
            });

            //const textResponse = await response.text(); // JSON으로 파싱하기 전에 텍스트로 읽어옴
            //console.log('Raw response:', textResponse); // 원시 응답 텍스트를 콘솔에 출력

            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

            try {
                const result = await response.json();
                imageList = result.data;
            } catch (jsonError) {
                throw new Error(`Failed to parse JSON: ${jsonError.message}`);
            }

            console.log("GET 성공:", resultHolder.childNodes);
            if(resultHolder.childNodes.length) resultHolder.replaceChildren();
            imageList.forEach(item=>{
                const img = document.createElement('img');
                img.src = item.link;
                img.style.width=`${200}px`;
                img.style.margin=`${8}px`
                img.style.verticalAlign=`middle`;
                img.dataset.id= item.id;
                resultHolder.append(img);
            })

        } catch (error) {
            console.error("GET 실패:", error);
        }
    }

    // 이벤트 추가
    resultHolder.addEventListener('click', (e)=>{
        if(e.target.hasAttribute('data-id') && confirm('이미지를 제거할까요?')) deleteImage(e.target.dataset.id)
        setTimeout(()=> loadImages(), 1000)
    })

    // 이미지 삭제
    function deleteImage(imghash){
        const formdata = new FormData();

        const requestOptions = {
            method: 'DELETE',
            headers: useImgHost.postHeader,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${useImgHost.postImageUrl}/${imghash}`, requestOptions)
            .then(() => console.info(`DELETE 성공 - 이미지 ID: ${imghash}`))
            .catch(error => console.log('error', error));
    }

    btnClearAll.onclick = ()=>{
        const ids = imageList.map(item=>item.id);
        ids.forEach(hash => deleteImage(hash))
    }
}




document.addEventListener('DOMContentLoaded', init)
