import type { Location, LocationListParams } from '../../types';

export interface UseLocationListOptions {
  filters?: LocationListParams;
  enabled?: boolean;
}

export interface UseLocationListReturn {
  locations: Location[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
