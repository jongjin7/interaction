export interface Category {
  id: string; // 각 카테고리의 고유 식별자
  name: string; // 카테고리 이름
  title: string;
  description?: string; // 카테고리 설명 (선택적)
}

export interface AlbumImage {
  id: string;
  name: string;
  datetime: number;
  description?: string;
  title?: string;
  link: string;
}
