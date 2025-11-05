import { formatDistance } from '@/domain/location/utils/distance';
import type { LocationCardProps } from './types';

/**
 * @component LocationCard
 * @summary Card displaying location summary information
 * @domain location
 * @type ui-component
 * @category display
 */
export const LocationCard = ({ location, onClick }: LocationCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:border-primary-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{location.address}</p>
          <div className="mt-2 flex items-center gap-4">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                location.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {location.isOpen ? 'Aberto' : 'Fechado'}
            </span>
            {location.distance !== undefined && (
              <span className="text-sm text-gray-500">{formatDistance(location.distance)}</span>
            )}
          </div>
        </div>
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};
