/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";
import {
  overlayStyle,
  modalContentStyle,
  closeButtonStyle,
} from "./Modal.styles";

interface ModalProps {
  isOpen: boolean;
  isOverlay?: boolean;
  onClose: () => void;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  customCss?: CSSObject;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  isOverlay = true,
  onClose,
  position,
  children,
  customCss,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div css={[overlayStyle(isOverlay), customCss]} onClick={onClose}>
      <div
        css={modalContentStyle(position)}
        onClick={(e) => e.stopPropagation()}
      >
        <button css={closeButtonStyle} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
