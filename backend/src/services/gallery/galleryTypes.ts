/**
 * @interface GalleryCategory
 * @description Photo gallery category
 */
export interface GalleryCategory {
  id: number;
  name: string;
  description: string;
  photoCount: number;
}

/**
 * @interface PhotoListItem
 * @description Photo summary for list view
 */
export interface PhotoListItem {
  id: number;
  thumbnailUrl: string;
  title: string;
  categoryId: number;
  categoryName: string;
}

/**
 * @interface PhotoDetail
 * @description Complete photo information
 */
export interface PhotoDetail {
  id: number;
  thumbnailUrl: string;
  fullSizeUrl: string;
  title: string;
  description: string;
  date: string;
  categoryId: number;
  categoryName: string;
}

/**
 * @interface PhotoListQuery
 * @description Query parameters for photo listing
 */
export interface PhotoListQuery {
  categoryId?: number;
  page: number;
  pageSize: number;
}

/**
 * @interface PhotoSearchQuery
 * @description Query parameters for photo search
 */
export interface PhotoSearchQuery {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  pageSize: number;
}

/**
 * @interface PhotoListResult
 * @description Result of photo listing operation
 */
export interface PhotoListResult {
  photos: PhotoListItem[];
  total: number;
}
