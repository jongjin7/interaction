// 가장 긴 배열과 그 인덱스를 찾는 함수
const findLargestArrayWithIndex = (arr: any[][]) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input must be a non-empty 2D array');
  }
  return arr.reduce(
    (result, current, oindex) => {
      if (current.data.length > result.data.length) {
        return { data: current.data, index: oindex };
      }
      return result;
    },
    { data: arr[0].data, index: 0 },
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
export const largestArrayItem = (albumImages, categories) => {
  const resData = findLargestArrayWithIndex(albumImages);
  // console.log('최대앨범', resData, ' 이미지갯수:', resData.data.length);
  return {
    subTitle: categories[resData.index].title,
    data: resData.data.slice(0, 12),
  };
};

// getRandomArrayItem
export const randomArrayItem = (albumImages) => {
  const flattenedData = albumImages.reduce((accumulator: any[], currentItem) => {
    return accumulator.concat(currentItem.data);
  }, []);
  return getRandomItems(flattenedData).slice(0, 16);
};
