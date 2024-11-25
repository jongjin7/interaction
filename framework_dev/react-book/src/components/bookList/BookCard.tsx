/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import {
  activeButtonStyle,
  bookCardStyle,
  ListBodyCell_1,
  ListBodyCell_2,
  ListBodyCell_3,
  ListBodyInnerStyle,
  ListBodyStyle,
  ListBodyThumbStyle,
  ListHeaderCell_1,
  ListHeaderCell_2,
  ListHeaderCell_3,
  ListHeaderCell_4,
  ListHeaderCell_5,
  ListHeaderStyle,
  openAccordionStyle,
  PriceArea,
} from "./BookCard.styles";
import {Link} from "react-router-dom";
import {theme} from "@/styles/theme";
import Row from "@/components/common/Row";
import Box from "@/components/common/Box";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import ImageBox from "@/components/common/ImageBox";
import PriceBlock from "@/components/etc/PriceBlock";
import IconButton from "@/components/common/IconButton";
import {ReactComponent as IconArrow} from "@/imgs/icon_arrow.svg";
import {ReactComponent as IconHeard} from "@/imgs/icon_heart.svg";
import useFormattedPrice from "@/hooks/useFormattedPrice";
import useFavorites from "@/pages/favorite/useFavorites";
import {BookType} from "@/types/book";

const BookCard = ({book}: { book: BookType }) => {
  const {title, authors, price, thumbnail, contents, sale_price, url} = book;
  const [isOpen, setIsOpen] = useState(false);
  const formattedPrice = (value: number | undefined) => useFormattedPrice(value ?? 0);

  const {favorites, toggleFavorite} = useFavorites();
  const isFavorite = favorites.some((fav) => fav.isbn === book.isbn);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const TextWithNewlines = ({text}: { text: string }) => {
    // 줄바꿈 문자를 <br>로 변환
    const formattedText = text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br/>
      </React.Fragment>
    ));

    return <div>{formattedText}</div>;
  };

  // @ts-ignore
  return (
    <Container customCss={bookCardStyle}>
      <Row customCss={ListHeaderStyle}>
        <ImageBox customCss={ListHeaderCell_1}>
          <img src={thumbnail} alt=""/>
          <IconHeard color={isFavorite ? "on" : "off"}/>
        </ImageBox>
        <Box customCss={ListHeaderCell_2}>{title}</Box>
        <Box customCss={ListHeaderCell_3}>{authors.join(",")}</Box>
        <Box customCss={ListHeaderCell_4}>{sale_price === -1 ? '품절' : `${formattedPrice(sale_price)}원`}</Box>
        <Box customCss={ListHeaderCell_5}>
          <Link to={url ?? "#"} target={"_blank"} css={theme.button.primary("large")}>
            구매하기
          </Link>
          <Button
            customCss={[
              theme.button.secondary("large"),
              isOpen ? activeButtonStyle : "",
            ]}
            onClick={toggleAccordion}
          >
            <span>상세보기</span>
            <IconArrow width={14} height={8}/>
          </Button>
        </Box>
      </Row>
      <div css={[ListBodyStyle, isOpen ? [openAccordionStyle] : null]}>
        <Row customCss={[ListBodyInnerStyle]}>
          <ImageBox customCss={[ListBodyThumbStyle, ListBodyCell_1]}>
            <img src={thumbnail} alt=""/>
            <IconButton
              title={isFavorite ? "찜 해제" : "찜하기"}
              onClick={() => toggleFavorite(book)}
            >
              <IconHeard color={isFavorite ? "on" : "off"}/>
            </IconButton>
          </ImageBox>
          <Box customCss={ListBodyCell_2}>
            <div>
              <h1 css={theme.typography.h3}>{title}</h1>
              <span css={theme.typography.bodyCaption}>
                {authors.join(",")}
              </span>
            </div>
            <div>
              <h2 css={theme.typography.h5}>책 소개</h2>
            </div>
            <div css={theme.typography.small}>
              {<TextWithNewlines text={contents?? "기본 내용"}/>}
            </div>
          </Box>
          <Box customCss={ListBodyCell_3}>
            <div css={PriceArea}>
              <PriceBlock
                title={"원가"}
                price={price}
                isDiscounted={Boolean(sale_price && price > sale_price && sale_price > -1)}
              />

              {sale_price && price > sale_price && sale_price > -1 && <PriceBlock title={"할인가"} price={sale_price}/>}
            </div>
            <Link
              to={url??'#'}
              target={"_blank"}
              css={theme.button.primary("large")}
              style={{width: 240}}
            >
              구매하기
            </Link>
          </Box>
        </Row>
      </div>
    </Container>
  );
};

export default BookCard;
