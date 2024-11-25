export interface BookType {
  isbn: string;
  title: string;
  authors: string[];
  thumbnail?: string;
  contents?: string;
  price: number;
  sale_price?: number;
  status?: string;
  url?: string;
}

// 책 리스트 타입
export type BookList = BookType[];

// 검색 결과 타입
export interface SearchResult {
  books: BookList; // 검색된 책들의 목록
  total: number; // 검색 결과 총 개수
  currentPage: number; // 현재 페이지
  totalPages: number; // 전체 페이지 수
}
