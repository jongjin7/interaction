import useSWR, { mutate } from "swr";
import { BookType } from "@/types/book";
import {useCallback} from "react";

const useFavorites = () => {
  const { data: favorites = [] } = useSWR<BookType[]>(
    "favorites",
    () => {
      const saved = localStorage.getItem("favorites");
      return saved ? (JSON.parse(saved) as BookType[]) : [];
    },
    { fallbackData: [] }, // 초기값 설정
  );

  const toggleFavorite = useCallback(
    (book: BookType) => {
      // 저장된 찜 목록에서 동일한 ISBN을 가진 책이 있는지 확인
      const exists = favorites.some((fav) => fav.isbn === book.isbn);

      const updatedFavorites = exists
        ? favorites.filter((fav) => fav.isbn !== book.isbn) // 이미 있으면 제거
        : [...favorites, book]; // 없으면 추가

      // 업데이트된 찜 목록을 캐시 및 로컬스토리지에 저장
      mutate("favorites", updatedFavorites, false);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    },
    [favorites], // favorites가 변경될 때만 함수 재생성
  );

  return { favorites, toggleFavorite };
};

export default useFavorites;
