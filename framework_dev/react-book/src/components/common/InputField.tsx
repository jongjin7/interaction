/** @jsxImportSource @emotion/react */
import React, { forwardRef, ReactNode } from "react";
import { css, CSSObject } from "@emotion/react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customCss?: CSSObject;
}

const TextInputField = css`
  width: 100%;
  height: 48px;
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ customCss, ...props }, ref) => {
    return (
      <input
        css={[TextInputField, customCss]}
        ref={ref as React.Ref<HTMLInputElement>}
        {...props}
      />
    );
  },
);

export default InputField;
