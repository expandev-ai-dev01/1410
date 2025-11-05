/**
 * @module gallery/types
 * @summary Type definitions for gallery domain
 * @domain gallery
 */

export interface Category {
  id: number;
  name: string;
  description?: string;
  photoCount: number;
}

export interface Photo {
  id: number;
  thumbnailUrl: string;
  title?: string;
  categoryId: number;
  categoryName: string;
}

export interface PhotoDetail extends Photo {
  fullSizeUrl: string;
  description?: string;
  date?: string;
}

export interface PhotoListParams {
  categoryId?: number;
  page?: number;
  pageSize?: number;
}

export interface PhotoSearchParams {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface PhotoListResponse {
  photos: Photo[];
  total: number;
}
