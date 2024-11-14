/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

// Modal의 오버레이 스타일
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 콘텐츠 위에 오도록 설정 */
`;

// Modal 창 스타일
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  /* 동적으로 위치를 설정할 수 있도록 스타일 */
  ${(props) =>
    props.position &&
    css`
      position: absolute;
      top: ${props.position.top || 'auto'};
      left: ${props.position.left || 'auto'};
      right: ${props.position.right || 'auto'};
      bottom: ${props.position.bottom || 'auto'};
    `}
`;

// Close 버튼 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const Modal = ({ isOpen, onClose, children, position }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // 오버레이를 클릭했을 때 모달을 닫음
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent position={position}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
