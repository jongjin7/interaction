import styled from '@emotion/styled';

const S = {};

// 기본 버튼 스타일 정의
S.Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004080;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

S.IconButton = styled(S.Button)`
  position: absolute;
  right: 0;
  top: 0;
  height: 48px;
  width: 48px;
  padding: 8px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default S;
