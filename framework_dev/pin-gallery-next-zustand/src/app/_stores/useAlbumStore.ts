import { useQuery } from '@tanstack/react-query';
import { largestArrayItem, randomArrayItem } from '@/app/_utils/RandomAndLongest';
import ApiService from '../../../../../client-services/pin-gallery-service/ApiService';
import { Category, AlbumImage } from '@/app/_types/galleryType';

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

  const randomImagesData = randomArrayItem(fetchAlbumImages);
  const largestAlbumData = largestArrayItem(fetchAlbumImages, categoryData);

  return {
    categories: categoryData,
    albumImages: fetchAlbumImages,
    randomImages: randomImagesData,
    largestAlbum: largestAlbumData,
  };
};

// React Query로 fetch하는 로직을 정의한 훅
const useAlbumStore = () => {
  const { data, isLoading, error } = useQuery<AlbumData, Error>({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
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
