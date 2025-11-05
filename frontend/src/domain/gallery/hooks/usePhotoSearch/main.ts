import { useQuery } from '@tanstack/react-query';
import { galleryService } from '../../services/galleryService';
import type { UsePhotoSearchOptions, UsePhotoSearchReturn } from './types';

/**
 * @hook usePhotoSearch
 * @summary Hook for searching photos by term and date range
 * @domain gallery
 * @type domain-hook
 * @category data
 */
export const usePhotoSearch = (options: UsePhotoSearchOptions): UsePhotoSearchReturn => {
  const { searchParams, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['gallery-search', searchParams],
    queryFn: () => galleryService.searchPhotos(searchParams),
    enabled: enabled && (!!searchParams.searchTerm || !!searchParams.startDate),
    staleTime: 1 * 60 * 1000,
  });

  return {
    photos: data?.photos,
    total: data?.total || 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
