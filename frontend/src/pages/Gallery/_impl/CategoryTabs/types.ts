import type { Category } from '@/domain/gallery/types';

export interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: number | undefined;
  onCategorySelect: (categoryId: number | undefined) => void;
}
