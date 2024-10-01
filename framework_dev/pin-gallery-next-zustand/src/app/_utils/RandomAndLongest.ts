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
const getRandomItems = <T>(arr: T[]): T[] => {
  const shuffledArray = arr.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
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
