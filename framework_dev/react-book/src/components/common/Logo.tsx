import { Link, LinkProps } from "react-router-dom";
import { css, CSSObject } from "@emotion/react";

// LogoProps 인터페이스 정의
interface LogoProps extends Omit<LinkProps, "to"> {
  to?: string;
}

const Logo = ({ ...props }: LogoProps) => {
  return (
    <Link to={"/"} {...props}>
      JJ BOOKS
    </Link>
  );
};

export default Logo;
