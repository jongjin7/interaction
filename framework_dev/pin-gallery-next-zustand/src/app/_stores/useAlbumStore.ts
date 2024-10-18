import { useQuery } from '@tanstack/react-query';
import { largestArrayItem, randomArrayItem } from '@/app/_utils/RandomAndLongest';
import ApiService from '@/app/_services/ApiService';
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
  const fetchedCategories = await ApiService.fetchCategory();
  const fetchAlbumImages = await ApiService.fetchGalleryList(fetchedCategories.map((album) => album.id));

  const randomImagesData = randomArrayItem(fetchAlbumImages);
  const largestAlbumData = largestArrayItem(fetchAlbumImages, fetchedCategories);

  return {
    categories: fetchedCategories,
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
