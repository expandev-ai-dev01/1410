import type { Location } from '@/domain/location/types';

export interface LocationMapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  userLocation: { latitude: number; longitude: number } | null;
}
