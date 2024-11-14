import React from 'react';
import styled from '@emotion/styled';

const TextInputField = styled.input`
  width: 100%;
  height: 48px;
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 2px solid #ccc;
  background-color: #f9f9f9;
  background-image: url('search-icon.png');
  background-position: 10px center;
  background-repeat: no-repeat;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const InputField = (props) => {
  return <TextInputField {...props} />;
};

export default InputField;
