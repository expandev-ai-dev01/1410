import type { Category } from '../../types';

export interface UseGalleryCategoriesOptions {
  enabled?: boolean;
}

export interface UseGalleryCategoriesReturn {
  categories: Category[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
