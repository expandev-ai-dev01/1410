import { LocationCard } from '../LocationCard';
import { Button } from '@/core/components/Button';
import type { LocationListProps } from './types';

/**
 * @component LocationList
 * @summary List of restaurant locations with filtering
 * @domain location
 * @type ui-component
 * @category display
 */
export const LocationList = ({
  locations,
  onLocationSelect,
  onGetUserLocation,
  hasUserLocation,
}: LocationListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Unidades</h2>
        {!hasUserLocation && (
          <Button variant="outline" size="sm" onClick={onGetUserLocation}>
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Usar minha localização
          </Button>
        )}
      </div>

      {locations.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <p className="text-gray-600">Nenhuma localização encontrada</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => onLocationSelect(location)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
