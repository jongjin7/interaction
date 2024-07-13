import {API_ALBUM_URL, API_BASE_URL, IMG_ACCESS_TOKEN, IMG_CLIENT_ID} from "../config/api.config";

export async function clientFetchAPI ({type, url,author, formdata}){
    const headers = new Headers();
    if(author === 'access') headers.append("Authorization", `Bearer ${IMG_ACCESS_TOKEN}`);
    else if(author === 'client') headers.append("Authorization", `Client-ID ${IMG_CLIENT_ID}`);
    headers.append("Accept", "application/json");

    try {
        const response = await fetch(url, {
            method: type,
            body: formdata,
            headers: headers,
            redirect: 'follow'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Image ${type==='post'? 'upload':'delete'} failed: ${error}`);
        throw error;
    }
}

export async function fetchAPI({url,author}) {
    const headers = new Headers();
    if(author === 'access') headers.append("Authorization", `Bearer ${IMG_ACCESS_TOKEN}`);
    else if(author === 'client') headers.append("Authorization", `Client-ID ${IMG_CLIENT_ID}`);
    headers.append("Accept", "application/json");

    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: headers,
            redirect: 'follow',
            // verify: false,
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch data failed:', error);
        return [];
    }
}

export async function postAPI({url,author, formdata}){
    /*const headers = new Headers();
    if(author === 'access') headers.append("Authorization", `Bearer ${IMG_ACCESS_TOKEN}`);
    else if(author === 'client') headers.append("Authorization", `Client-ID ${IMG_CLIENT_ID}`);
    headers.append("Accept", "application/json");

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formdata,
            headers: headers,
            redirect: 'follow'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }*/

    return await clientFetchAPI({
        type: 'post',
        url: url,
        author: author,
        formdata: formdata,
    })
}

export async function addNewCategory(formdata) {
    return await postAPI({
        url:`${API_ALBUM_URL}`,
        author:'access',
        formdata: formdata
    })
}

export async function sendImageFile(formdata, album_hash) {
    const  image = await postAPI({
        url:`${API_BASE_URL}/image`,
        author:'access',
        formdata: formdata
    })
    const result = await moveToAlbum(album_hash, image.data.id)
    console.log('result', result)
    return result;
}

export async function moveToAlbum(album_hash, img_hash){
    const formdata = new FormData();
    formdata.append('ids[]', img_hash);

    return await postAPI({
        url:`${API_ALBUM_URL}/${album_hash}/add`,
        author:'access',
        formdata: formdata,
    })
}


export async function fetchCategory(){
    return await fetchAPI({url:`${API_BASE_URL}/account/me/albums`, author:'access'})
}

// 리스트
export async function fetchGalleryList(albumHashes){
    // 하루 사용 크레딧 체크
    // const credit = await fetchAPI({url: `https://api.imgur.com/3/credits`, author: 'client'})
    // console.log('credit', credit)


    async function fetchMultipleAlbums(albumHashes) {
        const fetchPromises = albumHashes.map(hash => fetchAPI({url: `${API_ALBUM_URL}/${hash}/images`, author: 'client'}));
        try {
            return await Promise.all(fetchPromises);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    return await fetchMultipleAlbums(albumHashes);
}

// 이미지 삭제
export async function deleteImageItem(imageHash){
    return await clientFetchAPI({
        type: 'delete',
        url: `${API_BASE_URL}/image/${imageHash}`,
        author: 'access',
    })
}


