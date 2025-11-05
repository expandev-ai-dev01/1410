import type { Photo } from '@/domain/gallery/types';

export interface PhotoGridProps {
  photos: Photo[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPhotoClick: (photo: Photo) => void;
  onPageChange: (page: number) => void;
}
