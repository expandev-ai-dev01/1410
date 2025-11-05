import type { PhotoCardProps } from './types';

/**
 * @component PhotoCard
 * @summary Card displaying photo thumbnail
 * @domain gallery
 * @type ui-component
 * @category display
 */
export const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <img
        src={photo.thumbnailUrl}
        alt={photo.title || 'Foto da galeria'}
        loading="lazy"
        className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
      />
      {photo.title && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-sm font-medium text-white line-clamp-2">{photo.title}</p>
        </div>
      )}
    </button>
  );
};
