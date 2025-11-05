import type { Photo } from '@/domain/gallery/types';

export interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}
