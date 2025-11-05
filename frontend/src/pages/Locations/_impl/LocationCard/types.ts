import type { Location } from '@/domain/location/types';

export interface LocationCardProps {
  location: Location;
  onClick: () => void;
}
