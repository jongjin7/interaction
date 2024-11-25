/** @jsxImportSource @emotion/react */
import React, { forwardRef, ReactNode } from "react";
import { css, Interpolation, Theme } from "@emotion/react";
import { theme } from "@/styles/theme";
import { Link, LinkProps } from "react-router-dom";

interface BaseButtonProps {
  children?: React.ReactNode;
  customCss?: Interpolation<Theme>;
}

interface ButtonElementProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface LinkElementProps extends BaseButtonProps, Omit<LinkProps, "to"> {
  as: "link";
  to: string;
}

type ButtonProps = ButtonElementProps | LinkElementProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ as = "button", children, customCss, ...props }, ref) => {
    if (as === "link") {
      return (
        <Link
          css={[theme.button.default("medium"), customCss]}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as LinkElementProps)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        css={[theme.button.default("medium"), customCss]}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as ButtonElementProps)}
      >
        {children}
      </button>
    );
  },
);

export default Button;
