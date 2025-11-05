import { useQuery } from '@tanstack/react-query';
import { galleryService } from '../../services/galleryService';
import type { UseGalleryCategoriesOptions, UseGalleryCategoriesReturn } from './types';

/**
 * @hook useGalleryCategories
 * @summary Hook for fetching gallery categories
 * @domain gallery
 * @type domain-hook
 * @category data
 */
export const useGalleryCategories = (
  options: UseGalleryCategoriesOptions = {}
): UseGalleryCategoriesReturn => {
  const { enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: () => galleryService.listCategories(),
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    categories: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
