import type { Photo, PhotoSearchParams } from '../../types';

export interface UsePhotoSearchOptions {
  searchParams: PhotoSearchParams;
  enabled?: boolean;
}

export interface UsePhotoSearchReturn {
  photos: Photo[] | undefined;
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
