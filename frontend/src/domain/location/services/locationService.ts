import { publicClient } from '@/core/lib/api';
import type { Location, LocationDetail, LocationListParams } from '../types';

/**
 * @service locationService
 * @summary Service for location-related API calls
 * @domain location
 * @type rest-service
 * @apiContext external
 */
export const locationService = {
  /**
   * @endpoint GET /api/v1/external/location
   * @summary Fetches list of all restaurant locations
   */
  async list(params?: LocationListParams): Promise<Location[]> {
    const response = await publicClient.get('/location', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/location/:id
   * @summary Fetches detailed information about a specific location
   */
  async getById(id: number): Promise<LocationDetail> {
    const response = await publicClient.get(`/location/${id}`);
    return response.data.data;
  },
};
