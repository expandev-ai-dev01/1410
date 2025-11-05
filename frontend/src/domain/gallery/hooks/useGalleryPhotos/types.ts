import type { Photo, PhotoListParams } from '../../types';

export interface UseGalleryPhotosOptions {
  filters?: PhotoListParams;
  enabled?: boolean;
}

export interface UseGalleryPhotosReturn {
  photos: Photo[] | undefined;
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
