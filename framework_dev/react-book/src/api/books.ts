import { BookType } from "@/types/book";

const API_KEY = "c5b65eb42d62119a052daaa1389c3483";

export const fetchBooks = async (
  query: string,
  page: number = 1,
  size: number = 10,
): Promise<{ books: BookType[]; total: number }> => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const result = await response.json();

    return {
      books: result.documents, // books 데이터
      total: result.meta.total_count, // total_count
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { books: [], total: 0 }; // 기본값 반환
  }
};
