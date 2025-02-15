/**
 * 이미지 갤러리 서버
 * user: J.J
 */
// eslint-disable-next-line import/no-mutable-exports
let API_BASE_URL = '';
// eslint-disable-next-line import/no-mutable-exports
let API_ALBUM_URL = '';

if (typeof window !== 'undefined') {
  const isDev = /^(localhost|127|192)/.test(window.location.hostname);
  // eslint-disable-next-line no-nested-ternary
  const port = isDev ? (window.location.protocol === 'https:' ? 443 : 3002) : 24020;
  API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:${port}`;
  API_ALBUM_URL = `${API_BASE_URL}/albums`;
}

export { API_BASE_URL, API_ALBUM_URL };
