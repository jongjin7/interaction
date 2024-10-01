import { create } from 'zustand';
import { largestArrayItem, randomArrayItem } from '@/app/_utils/RandomAndLongest';
import ApiService from '@/app/_services/ApiService';
import { Category, AlbumImage } from '@/app/_types/galleryType';

interface AlbumState {
  categories: Category[];
  albumImages: AlbumImage[][];
  randomImages: AlbumImage[];
  largestAlbum: {
    data: AlbumImage[];
    subTitle: string;
  };
  loading: boolean;
  fetchAlbums: () => Promise<void>;
}

const useAlbumStore = create<AlbumState>((set) => ({
  categories: [],
  albumImages: [],
  randomImages: [],
  largestAlbum: { data: [], subTitle: '' },
  loading: true,
  fetchAlbums: async () => {
    set({ loading: true });
    try {
      const fetchedCategories = await ApiService.fetchCategory();
      const fetchAlbumImages = await ApiService.fetchGalleryList(fetchedCategories.map((album) => album.id));
      const randomImagesData = randomArrayItem(fetchAlbumImages);
      const largestAlbumData = largestArrayItem(fetchAlbumImages, fetchedCategories);

      set({
        categories: fetchedCategories,
        albumImages: fetchAlbumImages,
        randomImages: randomImagesData,
        largestAlbum: largestAlbumData,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      set({ loading: false });
    }
  },
}));

export default useAlbumStore;
