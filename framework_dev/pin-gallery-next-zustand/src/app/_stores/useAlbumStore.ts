import { useQuery } from '@tanstack/react-query';
import { largestArrayItem, randomArrayItem } from '@/app/_utils/RandomAndLongest';
import { Category, AlbumImage } from '@/app/_types/galleryType';
import ApiService from '@/app/_services/ApiService';

interface LargestAlbum {
  data: AlbumImage[];
  subTitle: string;
}

interface AlbumData {
  categories: Category[];
  albumImages: AlbumImage[][];
  randomImages: AlbumImage[];
  largestAlbum: LargestAlbum;
}

const fetchAlbums = async (): Promise<AlbumData> => {
  const categoryLabels = await ApiService.fetchCategory();
  const categoryData = Array.isArray(categoryLabels) ? categoryLabels : [];
  const fetchAlbumImages = categoryData.map((album) => album.images);

  // ✅ 매번 새로운 값을 계산
  return {
    categories: categoryData,
    albumImages: fetchAlbumImages,
    randomImages: randomArrayItem(fetchAlbumImages),
    largestAlbum: largestArrayItem(fetchAlbumImages, categoryData),
  };
};

// React Query로 fetch하는 로직을 정의한 훅
const useAlbumStore = () => {
  const { data, isLoading, error } = useQuery<AlbumData, Error>({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
    staleTime: 1000 * 60 * 2, // 2분 동안 fresh 유지
    cacheTime: 1000 * 60 * 3, // 3분 후 메모리에서 삭제
  });

  return {
    categories: data?.categories || [],
    albumImages: data?.albumImages || [],
    randomImages: data?.randomImages || [],
    largestAlbum: data?.largestAlbum || { data: [], subTitle: '' },
    isLoading,
    error,
  };
};

export default useAlbumStore;
