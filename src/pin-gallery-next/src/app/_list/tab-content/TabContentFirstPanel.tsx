import TabContentListWrapper from '@/app/_list/tab-content/TabContentListWrapper';
import TabContentListTitle from '@/app/_list/tab-content/TabContentListTitle';
import React from 'react';
import TabContentPanel from '@/app/_list/tab-content/TabContentPanel';
import TabContentList from '@/app/_list/tab-content/TabContentList';

interface firstPanelProps {
  dataItem: [];
  categories: [];
}

interface DataItem {
  id: number;
  name: string;
  // 다른 필드들
}

const TabContentFirstPanel: React.FC<firstPanelProps> = ({ dataItem, categories }) => {
  const findLongestArrayWithIndex = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Input must be a non-empty 2D array');
    }
    return arr.reduce(
      (result, current, oindex) => {
        if (current.length > result.array.length) {
          return { array: current, index: oindex };
        }
        return result;
      },
      { array: arr[0], index: 0 },
    );
  };

  const getLongestArrayItem = (() => {
    const data = findLongestArrayWithIndex(dataItem); // findLongestArrayWithIndex 함수는 index와 array를 가진 객체를 반환한다고 가정

    return {
      subTitle: categories[data.index].title,
      data: data.array.data.slice(0, 10), // 여기서 data.array.data가 실제로 string[] 타입이라고 가정
    };
  })();

  const getRandomItems = (arr: []): [] => {
    // 배열을 복사하여 원본 배열을 변경하지 않도록 합니다
    const shuffledArray = arr.slice();

    // 배열의 마지막 요소부터 시작하여 무작위로 위치를 변경합니다
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  };

  const getRandomArrayItem = (() => {
    const flattenedData: [] = dataItem.reduce((accumulator, currentItem) => {
      return accumulator.concat(currentItem.data);
    }, []);
    return getRandomItems(flattenedData).slice(0, 16);
  })();

  return (
    <TabContentPanel>
      <TabContentList title="전체 랜덤" dataItem={getRandomArrayItem} />
      <TabContentList
        title="인기 카테고리"
        subTitle={getLongestArrayItem.subTitle}
        dataItem={getLongestArrayItem.data}
      />
    </TabContentPanel>
  );
};

export default TabContentFirstPanel;
