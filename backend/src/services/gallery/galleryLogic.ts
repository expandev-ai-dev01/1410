import {
  GalleryCategory,
  PhotoListItem,
  PhotoDetail,
  PhotoListQuery,
  PhotoSearchQuery,
  PhotoListResult,
} from './galleryTypes';

/**
 * @summary In-memory storage for gallery categories
 * @remarks This is a temporary solution. In production, this would be replaced with database queries.
 */
const categories: GalleryCategory[] = [
  {
    id: 1,
    name: 'Ambiente',
    description: 'Fotos do ambiente acolhedor do restaurante',
    photoCount: 12,
  },
  {
    id: 2,
    name: 'Pratos',
    description: 'Deliciosas massas e pratos italianos',
    photoCount: 25,
  },
  {
    id: 3,
    name: 'Eventos',
    description: 'Momentos especiais e celebrações',
    photoCount: 18,
  },
  {
    id: 4,
    name: 'Equipe',
    description: 'Nossa equipe dedicada',
    photoCount: 8,
  },
];

/**
 * @summary In-memory storage for photos
 * @remarks This is a temporary solution. In production, this would be replaced with database queries.
 */
const photos: PhotoDetail[] = [
  {
    id: 1,
    thumbnailUrl: '/images/gallery/ambiente-1-thumb.jpg',
    fullSizeUrl: '/images/gallery/ambiente-1-full.jpg',
    title: 'Salão Principal',
    description: 'Nosso acolhedor salão principal com decoração italiana',
    date: '2024-01-15',
    categoryId: 1,
    categoryName: 'Ambiente',
  },
  {
    id: 2,
    thumbnailUrl: '/images/gallery/pratos-1-thumb.jpg',
    fullSizeUrl: '/images/gallery/pratos-1-full.jpg',
    title: 'Fettuccine Alfredo',
    description: 'Clássico fettuccine ao molho alfredo',
    date: '2024-01-20',
    categoryId: 2,
    categoryName: 'Pratos',
  },
  {
    id: 3,
    thumbnailUrl: '/images/gallery/eventos-1-thumb.jpg',
    fullSizeUrl: '/images/gallery/eventos-1-full.jpg',
    title: 'Jantar Especial',
    description: 'Celebração de aniversário no restaurante',
    date: '2024-02-10',
    categoryId: 3,
    categoryName: 'Eventos',
  },
  {
    id: 4,
    thumbnailUrl: '/images/gallery/equipe-1-thumb.jpg',
    fullSizeUrl: '/images/gallery/equipe-1-full.jpg',
    title: 'Chef Alessandro',
    description: 'Nosso chef principal preparando massas frescas',
    date: '2024-01-10',
    categoryId: 4,
    categoryName: 'Equipe',
  },
  {
    id: 5,
    thumbnailUrl: '/images/gallery/ambiente-2-thumb.jpg',
    fullSizeUrl: '/images/gallery/ambiente-2-full.jpg',
    title: 'Área Externa',
    description: 'Terraço com vista para o jardim',
    date: '2024-01-18',
    categoryId: 1,
    categoryName: 'Ambiente',
  },
  {
    id: 6,
    thumbnailUrl: '/images/gallery/pratos-2-thumb.jpg',
    fullSizeUrl: '/images/gallery/pratos-2-full.jpg',
    title: 'Lasanha Bolonhesa',
    description: 'Tradicional lasanha com molho bolonhesa',
    date: '2024-01-25',
    categoryId: 2,
    categoryName: 'Pratos',
  },
];

/**
 * @summary Retrieves all gallery categories
 * @function galleryListCategories
 * @module services/gallery
 *
 * @returns {Promise<GalleryCategory[]>} Array of categories
 */
export async function galleryListCategories(): Promise<GalleryCategory[]> {
  return [...categories];
}

/**
 * @summary Retrieves photos with optional filtering and pagination
 * @function galleryListPhotos
 * @module services/gallery
 *
 * @param {PhotoListQuery} query - Query parameters
 *
 * @returns {Promise<PhotoListResult>} Photos and total count
 */
export async function galleryListPhotos(query: PhotoListQuery): Promise<PhotoListResult> {
  let filteredPhotos = [...photos];

  /**
   * @rule {be-gallery-category-filter} Filter by category if specified
   */
  if (query.categoryId) {
    filteredPhotos = filteredPhotos.filter((photo) => photo.categoryId === query.categoryId);
  }

  /**
   * @rule {be-gallery-sort-order} Sort by display order (currently by ID)
   */
  filteredPhotos.sort((a, b) => a.id - b.id);

  const total = filteredPhotos.length;

  /**
   * @rule {be-gallery-pagination} Apply pagination
   */
  const startIndex = (query.page - 1) * query.pageSize;
  const endIndex = startIndex + query.pageSize;
  const paginatedPhotos = filteredPhotos.slice(startIndex, endIndex);

  const photoList: PhotoListItem[] = paginatedPhotos.map((photo) => ({
    id: photo.id,
    thumbnailUrl: photo.thumbnailUrl,
    title: photo.title,
    categoryId: photo.categoryId,
    categoryName: photo.categoryName,
  }));

  return {
    photos: photoList,
    total,
  };
}

/**
 * @summary Retrieves detailed information about a specific photo
 * @function galleryGetPhoto
 * @module services/gallery
 *
 * @param {number} id - Photo identifier
 *
 * @returns {Promise<PhotoDetail | null>} Photo details or null if not found
 */
export async function galleryGetPhoto(id: number): Promise<PhotoDetail | null> {
  /**
   * @validation Verify photo exists
   */
  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    return null;
  }

  return photo;
}

/**
 * @summary Searches photos by term and/or date range
 * @function gallerySearchPhotos
 * @module services/gallery
 *
 * @param {PhotoSearchQuery} query - Search parameters
 *
 * @returns {Promise<PhotoListResult>} Search results and total count
 */
export async function gallerySearchPhotos(query: PhotoSearchQuery): Promise<PhotoListResult> {
  let filteredPhotos = [...photos];

  /**
   * @rule {be-gallery-search-term} Filter by search term in title and description
   */
  if (query.searchTerm) {
    const searchLower = query.searchTerm.toLowerCase();
    filteredPhotos = filteredPhotos.filter(
      (photo) =>
        photo.title.toLowerCase().includes(searchLower) ||
        photo.description.toLowerCase().includes(searchLower)
    );
  }

  /**
   * @rule {be-gallery-date-filter} Filter by date range
   */
  if (query.startDate) {
    const startDate = new Date(query.startDate);
    filteredPhotos = filteredPhotos.filter((photo) => new Date(photo.date) >= startDate);
  }

  if (query.endDate) {
    const endDate = new Date(query.endDate);
    filteredPhotos = filteredPhotos.filter((photo) => new Date(photo.date) <= endDate);
  }

  /**
   * @rule {be-gallery-search-sort} Sort by date descending (most recent first)
   */
  filteredPhotos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const total = filteredPhotos.length;

  /**
   * @rule {be-gallery-search-pagination} Apply pagination
   */
  const startIndex = (query.page - 1) * query.pageSize;
  const endIndex = startIndex + query.pageSize;
  const paginatedPhotos = filteredPhotos.slice(startIndex, endIndex);

  const photoList: PhotoListItem[] = paginatedPhotos.map((photo) => ({
    id: photo.id,
    thumbnailUrl: photo.thumbnailUrl,
    title: photo.title,
    categoryId: photo.categoryId,
    categoryName: photo.categoryName,
  }));

  return {
    photos: photoList,
    total,
  };
}
