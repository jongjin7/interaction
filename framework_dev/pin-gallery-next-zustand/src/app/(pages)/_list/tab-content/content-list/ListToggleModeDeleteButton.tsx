// Props 인터페이스 정의
import React from 'react';
import { buttonOutlineClass, buttonSizeSmall } from '@/styles/tailwind.component';

interface ToggleModeDeleteButtonProps {
  isToggleDel: boolean;
  clickHandleToggleMode: () => void;
}
// 삭제 모드 토글
const ListToggleModeDeleteButton: React.FC<ToggleModeDeleteButtonProps> = ({ isToggleDel, clickHandleToggleMode }) => {
  return (
    <button
      type="button"
      className={`
        ${buttonOutlineClass} ${buttonSizeSmall} btn-del-sel
      `}
      onClick={clickHandleToggleMode}
    >
      {`선택 ${!isToggleDel ? '삭제' : '해제'}`}
    </button>
  );
};

export default ListToggleModeDeleteButton;
