/** @jsxImportSource @emotion/react */
import React, { forwardRef } from "react";
import {
  SuggestionButtonStyle,
  SuggestionItemStyle,
  SuggestionsListStyle,
  SuggestionItemDeleteStyle,
} from "@/components/bookSearch/SuggestionsList.styles";
import IconButton from "@/components/common/IconButton";
import { ReactComponent as IconX } from "@/imgs/icon_x.svg";
import {theme} from "@/styles/theme";

interface SuggestionsListProps {
  listData: string[]; // 리스트 데이터는 문자열 배열로 정의
  onSuggestionClick: (suggestion: string) => void; // 선택된 항목을 처리하는 함수
  selectedIndex: number; // 선택된 항목의 인덱스
}

const SuggestionsList = forwardRef<HTMLDivElement, SuggestionsListProps>(
  ({ listData, onSuggestionClick, selectedIndex }, ref) => {
    return (
      <div css={SuggestionsListStyle} ref={ref}>
        <ul>
          {listData.map((list, index) => (
            <li css={SuggestionItemStyle} key={index} style={{
              backgroundColor:
                selectedIndex === index ? '#e7ebee' : "", // 선택된 항목 강조
            }}>
              <button
                css={SuggestionButtonStyle(selectedIndex === index)}
                onClick={() => onSuggestionClick(list)} // 클릭 시 추천 항목 처리
              >
                {list}
              </button>
              <IconButton css={SuggestionItemDeleteStyle} title="삭제">
                <IconX />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

export default SuggestionsList;
