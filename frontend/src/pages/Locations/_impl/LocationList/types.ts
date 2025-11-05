import type { Location } from '@/domain/location/types';

export interface LocationListProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  onGetUserLocation: () => void;
  hasUserLocation: boolean;
}
