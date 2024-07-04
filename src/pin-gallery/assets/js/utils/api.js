import { API_BASE_URL, API_ALBUM_URL } from "../config/api.config";

export async function fetchData() {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch data failed:', error);
        return [];
    }
}

export async function uploadImage(formData) {

}

async function moveImageToAlbum(){

}

async function postAPI(formData){
    try {
        const response = await fetch(`${API_ALBUM_URL}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
}
