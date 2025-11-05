import { useQuery } from '@tanstack/react-query';
import { locationService } from '../../services/locationService';
import type { UseLocationListOptions, UseLocationListReturn } from './types';

/**
 * @hook useLocationList
 * @summary Hook for fetching and managing list of locations
 * @domain location
 * @type domain-hook
 * @category data
 */
export const useLocationList = (options: UseLocationListOptions = {}): UseLocationListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['locations', filters],
    queryFn: () => locationService.list(filters),
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    locations: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
