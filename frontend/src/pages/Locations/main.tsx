import { useState, useMemo } from 'react';
import { useLocationList } from '@/domain/location/hooks/useLocationList';
import { LocationMap } from './_impl/LocationMap';
import { LocationList } from './_impl/LocationList';
import { LocationDetail } from './_impl/LocationDetail';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { Location } from '@/domain/location/types';

/**
 * @page LocationsPage
 * @summary Interactive map and list of restaurant locations
 * @domain location
 * @type list-page
 * @category public
 *
 * @routing
 * - Path: /localizacoes
 * - Params: none
 * - Query: none
 *
 * @layout
 * - Layout: MainLayout
 * - Sections: Map, List, Detail Modal
 *
 * @data
 * - Sources: Location API
 * - Loading: Skeleton loading states
 * - Caching: 5 minutes stale time
 */
export const LocationsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );

  const { locations, isLoading, error, refetch } = useLocationList({
    filters: userLocation
      ? { latitude: userLocation.latitude, longitude: userLocation.longitude }
      : undefined,
  });

  const sortedLocations = useMemo(() => {
    if (!locations) return [];
    return [...locations].sort((a, b) => {
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      return a.name.localeCompare(b.name);
    });
  }, [locations]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleCloseDetail = () => {
    setSelectedLocation(null);
  };

  const handleGetUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar localizações"
        message="Não foi possível carregar as localizações. Por favor, tente novamente."
        onRetry={refetch}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
          Nossas Localizações
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Encontre a unidade Ale Massas mais próxima de você
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <LocationList
            locations={sortedLocations}
            onLocationSelect={handleLocationSelect}
            onGetUserLocation={handleGetUserLocation}
            hasUserLocation={!!userLocation}
          />
        </div>

        <div className="order-1 lg:order-2">
          <LocationMap
            locations={sortedLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            userLocation={userLocation}
          />
        </div>
      </div>

      {selectedLocation && (
        <LocationDetail locationId={selectedLocation.id} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default LocationsPage;
