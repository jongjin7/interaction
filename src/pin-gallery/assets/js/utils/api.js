import {
    API_BASE_URL,
    API_ALBUM_URL,
    IMG_CLIENT_ID,
    IMG_ACCESS_TOKEN
} from "../config/api.config";

export async function fetchAPI({url,author}) {
    console.log('aaaa', url,author)
    const headers = new Headers();
    if(author === 'access') headers.append("Authorization", `Bearer ${IMG_ACCESS_TOKEN}`);
    else if(author === 'client') headers.append("Authorization", `Client-ID ${IMG_CLIENT_ID}`);
    headers.append("Accept", "application/json");
    //87vbR7E
    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch data failed:', error);
        return [];
    }
}

export async function uploadImage(formData) {

}

export async function getAlbumLists(){
    return await fetchAPI({url:`${API_BASE_URL}/account/me/albums/0`, author:'access'})
}

export async function postAPI(formData){
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${IMG_ACCESS_TOKEN}`);
    //headers.append("Authorization", `"Client-ID ${IMG_CLIENT_ID}"`);
    headers.append("Accept", "application/json");

    try {
        const response = await fetch(`${API_ALBUM_URL}`, {
            method: 'POST',
            body: formData,
            headers: headers,
            redirect: 'follow'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
}
