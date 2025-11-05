import type { LocationDetail } from '../../types';

export interface UseLocationDetailOptions {
  locationId: number;
  enabled?: boolean;
}

export interface UseLocationDetailReturn {
  location: LocationDetail | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
