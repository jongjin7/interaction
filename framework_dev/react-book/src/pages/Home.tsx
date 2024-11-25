import React, { useEffect } from "react";
import Paper from "@/components/common/Paper";
import Main from "@/components/layout/main/Main";
import NoneData from "@/components/etc/NoneData";
import Button from "@/components/common/Button";
import { theme } from "@/styles/theme";
import { ReactComponent as IconArrow } from "@/imgs/icon_arrow.svg";
import TotalResults from "@/components/etc/TotalResults";

const Home = () => {
  return (
    <Main>
      <Paper>
        <h1>컴포넌트</h1>

        <Button as="button" onClick={() => alert("Button Clicked")}>
          일반 버튼
        </Button>

        <Button as="button" customCss={theme.button.default("medium", true)}>
          일반 버튼
        </Button>

        <Button customCss={theme.button.secondary("small")}>작은 버튼</Button>
        <Button customCss={theme.button.primary("medium", true)}>
          일반 버튼
        </Button>
        <Button customCss={theme.button.primary("medium")}>일반 버튼</Button>
        <Button customCss={theme.button.primary("large")}>구매하기</Button>
        <Button
          customCss={theme.button.primary("large")}
          style={{ width: 240 }}
        >
          구매하기
        </Button>
        <Button customCss={theme.button.secondary("large")}>
          <span>상세보기</span>
          <IconArrow width={14} height={8} />
        </Button>
        <Button
          as="link"
          to="/home"
          customCss={theme.button.default("large", false)}
        >
          링크 버튼
        </Button>

        <TotalResults title="도서 검사 결과" value={10} />

        <NoneData />
      </Paper>
    </Main>
  );
};

export default Home;
