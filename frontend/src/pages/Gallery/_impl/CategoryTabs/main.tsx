import { clsx } from 'clsx';
import type { CategoryTabsProps } from './types';

/**
 * @component CategoryTabs
 * @summary Tab navigation for photo categories
 * @domain gallery
 * @type ui-component
 * @category navigation
 */
export const CategoryTabs = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
}: CategoryTabsProps) => {
  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Categorias">
          <button
            onClick={() => onCategorySelect(undefined)}
            className={clsx(
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors',
              selectedCategoryId === undefined
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={clsx(
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors',
                selectedCategoryId === category.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {category.name}
              <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {category.photoCount}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
