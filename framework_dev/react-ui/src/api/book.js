// api.js
const API_KEY = 'c5b65eb42d62119a052daaa1389c3483';

export const fetchBooks = async (payload) => {
  try {
    const { query, page = 0, size = 10 } = payload;
    const url = `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&page=${page}&size=${size}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
};
