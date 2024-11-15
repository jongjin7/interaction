// api.js
const API_KEY = 'c5b65eb42d62119a052daaa1389c3483';

export const fetchBooks = async (query) => {
  try {
    const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}`, {
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
