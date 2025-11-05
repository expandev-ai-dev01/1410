import { publicClient } from '@/core/lib/api';
import type {
  Category,
  Photo,
  PhotoDetail,
  PhotoListParams,
  PhotoSearchParams,
  PhotoListResponse,
} from '../types';

/**
 * @service galleryService
 * @summary Service for gallery-related API calls
 * @domain gallery
 * @type rest-service
 * @apiContext external
 */
export const galleryService = {
  /**
   * @endpoint GET /api/v1/external/gallery/categories
   * @summary Fetches list of all photo categories
   */
  async listCategories(): Promise<Category[]> {
    const response = await publicClient.get('/gallery/categories');
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/gallery/photos
   * @summary Fetches list of photos with optional filtering
   */
  async listPhotos(params?: PhotoListParams): Promise<PhotoListResponse> {
    const response = await publicClient.get('/gallery/photos', { params });
    return {
      photos: response.data.data,
      total: response.data.metadata?.total || response.data.data.length,
    };
  },

  /**
   * @endpoint GET /api/v1/external/gallery/photos/:id
   * @summary Fetches detailed information about a specific photo
   */
  async getPhotoById(id: number): Promise<PhotoDetail> {
    const response = await publicClient.get(`/gallery/photos/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/gallery/search
   * @summary Searches photos by term and/or date range
   */
  async searchPhotos(params: PhotoSearchParams): Promise<PhotoListResponse> {
    const response = await publicClient.get('/gallery/search', { params });
    return {
      photos: response.data.data,
      total: response.data.metadata?.total || response.data.data.length,
    };
  },
};
