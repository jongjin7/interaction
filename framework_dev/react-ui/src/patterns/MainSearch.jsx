import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import QuickSearch from '@components/QuickSearch';
import Modal from '@components/Modal';
import S from '@components/common/Button';

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

function MainSearch() {
  const [isModalOpen, setModalOpen] = useState(false);
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
        <QuickSearch />
        <S.Button ref={buttonRef} onClick={openModal}>
          버튼
        </S.Button>
      </SearchBox>
      <Modal isOpen={isModalOpen} onClose={closeModal} position={position}>
        <h2>Modal Title</h2>
        <p>This is a modal content area.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </MainSearchSection>
  );
}

export default MainSearch;
