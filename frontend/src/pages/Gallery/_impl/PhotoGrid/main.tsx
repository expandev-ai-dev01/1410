import { PhotoCard } from '../PhotoCard';
import { Pagination } from '../Pagination';
import type { PhotoGridProps } from './types';

/**
 * @component PhotoGrid
 * @summary Responsive grid displaying photo thumbnails
 * @domain gallery
 * @type ui-component
 * @category display
 */
export const PhotoGrid = ({
  photos,
  total,
  currentPage,
  pageSize,
  onPhotoClick,
  onPageChange,
}: PhotoGridProps) => {
  const totalPages = Math.ceil(total / pageSize);

  if (photos.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma foto encontrada</h3>
        <p className="mt-1 text-sm text-gray-500">
          Não há fotos disponíveis para os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
