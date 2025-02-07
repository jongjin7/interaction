export interface Category {
  id: string; // 각 카테고리의 고유 식별자
  title: string;
}

export interface AlbumImage {
  id: string;
  datetime?: number;
  description?: string;
  fileName: string;
  filePath: string;
}
