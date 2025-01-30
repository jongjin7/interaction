/**
 * Imgur API 환경 정보
 * user: J.J
 */
export const IMG_CLIENT_ID = 'abcdc33d1b64fbd';
export const IMG_ACCESS_TOKEN = '10a6370ae8be145f958a2e689d317935ae8ea008'; //포스트맨에서 한달 간격으로 업데이트 필요
const isDev = /^(localhost|127|192)/.test(location.hostname);
const port = isDev? (location.protocol === 'https:'? 443 : 3002) : 24020;
// api 호스트 정보
export const API_BASE_URL = `${location.protocol}//${location.hostname}:${port}`;
export const API_ALBUM_URL = `${API_BASE_URL}/albums`;
