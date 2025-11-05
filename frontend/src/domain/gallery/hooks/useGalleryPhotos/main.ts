import { useQuery } from '@tanstack/react-query';
import { galleryService } from '../../services/galleryService';
import type { UseGalleryPhotosOptions, UseGalleryPhotosReturn } from './types';

/**
 * @hook useGalleryPhotos
 * @summary Hook for fetching gallery photos with filtering
 * @domain gallery
 * @type domain-hook
 * @category data
 */
export const useGalleryPhotos = (options: UseGalleryPhotosOptions = {}): UseGalleryPhotosReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['gallery-photos', filters],
    queryFn: () => galleryService.listPhotos(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    photos: data?.photos,
    total: data?.total || 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
