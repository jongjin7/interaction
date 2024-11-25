/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import {
  headerContainer,
  logoStyle,
  innerHeader,
  menuStyle,
  menuItemStyle,
  menuItemActive,
} from "./Header.styles";
import Logo from "@/components/common/Logo";
import Container from "@/components/common/Container";

const Header = () => {
  const menus = [
    { path: "/book", label: "도서 검색" },
    { path: "/favorite", label: "내가 찜한 책" },
  ];

  const MainMenu = () => {
    const location = useLocation();

    return (
      <nav css={menuStyle}>
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            css={[
              menuItemStyle,
              location.pathname === menu.path ? menuItemActive : "",
            ]}
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    );
  };

  return (
    <header css={headerContainer}>
      <Container customCss={innerHeader}>
        <Logo css={logoStyle} />
        <MainMenu />
      </Container>
    </header>
  );
};

export default Header;
