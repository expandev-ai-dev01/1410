import type { PhotoSearchParams } from '@/domain/gallery/types';

export interface SearchFiltersProps {
  onSearch: (params: PhotoSearchParams) => void;
  onClear: () => void;
  isSearching: boolean;
}
