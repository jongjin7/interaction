import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import QuickSearch from '@components/QuickSearch';
import Modal from '@components/Modal';
import S from '@components/common/Button';
import DetailSearch from './DetailSearch';

const MainSearchSection = styled.section`
  display: flex;
  align-items: center;
  border: 1px dotted gray;
  padding: 2px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

function MainSearch({ onSearch }) {
  const [isModalOpen, setModalOpen] = useState(true);
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);

  const openModal = () => {
    setModalOpen(true);

    // 버튼 밑에 모달 위치 설정
    const buttonRect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: buttonRect.bottom + window.scrollY + 'px', // 버튼 아래 위치
      left: buttonRect.left + window.scrollX + 'px', // 버튼 왼쪽에 맞춤
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <MainSearchSection>
      <SearchBox>
        <QuickSearch onSearch={onSearch} />
        <S.Button ref={buttonRef} onClick={openModal}>
          상세 검색
        </S.Button>
      </SearchBox>
      <Modal isOpen={isModalOpen} onClose={closeModal} position={position} onSubmit={onSearch}>
        <h3>Modal Title</h3>
        <DetailSearch />
      </Modal>
    </MainSearchSection>
  );
}

export default MainSearch;
