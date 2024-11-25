/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import BookSearch from "@/components/bookSearch/BookSearch";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import { SearchBarSection } from "@/components/searchBar/SearchBar.styles";
import { theme } from "@/styles/theme";
import DetailSearch from "@/components/searchBar/DetailSearch";

interface SearchBarProps {
  handleBookSearch: (params: string) => void;
}

interface Position {
  top: string;
  left: string;
}

const SearchBar = ({ handleBookSearch }: SearchBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // 모달 열기 함수
  const openModal = () => {
    if (isModalOpen) closeModal();
    else {
      setIsModalOpen(true);
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: `${50}px`, // 버튼 밑에 위치
          left: `${buttonRect.left + window.scrollX - 300}px`, // 버튼 왼쪽에 맞춤
        });
      }
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 상세 검색 시 호출되는 함수
  const handleDetailSearch = (params: string) => {
    setIsModalOpen(false);
    handleBookSearch(params); // 부모 컴포넌트에 검색 파라미터 전달
  };

  const resetForm = () => {
    console.log("resetForm!!!!");
  };

  return (
    <div css={SearchBarSection}>
      <BookSearch onSearch={handleBookSearch} resetFrom={isModalOpen} />
      <Button
        customCss={theme.button.secondary("medium", true)}
        ref={buttonRef}
        onClick={openModal}
      >
        상세검색
      </Button>

      {isModalOpen && position && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          position={position}
          isOverlay={false}
        >
          <DetailSearch isOpen={isModalOpen} onSubmit={handleDetailSearch} />
        </Modal>
      )}
    </div>
  );
};

export default SearchBar;
