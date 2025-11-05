import { useQuery } from '@tanstack/react-query';
import { locationService } from '../../services/locationService';
import type { UseLocationDetailOptions, UseLocationDetailReturn } from './types';

/**
 * @hook useLocationDetail
 * @summary Hook for fetching detailed information about a specific location
 * @domain location
 * @type domain-hook
 * @category data
 */
export const useLocationDetail = (options: UseLocationDetailOptions): UseLocationDetailReturn => {
  const { locationId, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['location', locationId],
    queryFn: () => locationService.getById(locationId),
    enabled: enabled && !!locationId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    location: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
