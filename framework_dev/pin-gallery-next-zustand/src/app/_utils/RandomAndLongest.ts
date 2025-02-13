import { AlbumImage, Category } from '@/app/_types/galleryType';

// 가장 긴 배열과 그 인덱스를 찾는 함수
const findLargestArrayWithIndex = (arr: AlbumImage[][]) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input must be a non-empty 2D array');
  }
  return arr.reduce<{ data: AlbumImage[]; index: number }>(
    (result, current, oindex) => {
      // current가 AlbumImage[] 타입이므로 length 속성을 사용할 수 있음
      if (current.length > result.data.length) {
        return { data: current, index: oindex };
      }
      return result;
    },
    { data: [], index: -1 }, // 초기값 설정
  );
};

// 랜덤하게 아이템을 선택하는 함수
const getRandomItems = <T extends { datetime: number }>(arr: T[]): T[] => {
  // 1단계: 랜덤하게 섞기
  const shuffledArray = arr.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // 배열 요소 교환
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  // 2단계: datetime을 기준으로 내림차순 정렬
  return shuffledArray.sort((a, b) => b.datetime - a.datetime);
};

// getLongestArrayItem
export const largestArrayItem = (albumImages: AlbumImage[][], categories: Category[]) => {
  if (albumImages.length === 0 || !albumImages.some((array) => array.length > 0)) {
    // throw new Error('Input must be a non-empty 2D array');
    return { subTitle: '', data: [] };
  }
  const resData = findLargestArrayWithIndex(albumImages);
  // console.log('최대앨범', resData, ' 이미지갯수:', resData.data.length);
  return {
    subTitle: categories[resData.index].title,
    data: resData.data.slice(0, 12),
  };
};

// getRandomArrayItem
export const randomArrayItem = (albumImages: AlbumImage[][]) => {
  if (albumImages.length === 0) return [];
  const flattenedData = albumImages.reduce((accumulator: AlbumImage[], currentItem) => {
    return accumulator.concat(currentItem);
  }, []);
  return getRandomItems(flattenedData).slice(0, 16);
};
