import { useState, useMemo } from 'react';
import { useGalleryCategories } from '@/domain/gallery/hooks/useGalleryCategories';
import { useGalleryPhotos } from '@/domain/gallery/hooks/useGalleryPhotos';
import { usePhotoSearch } from '@/domain/gallery/hooks/usePhotoSearch';
import { CategoryTabs } from './_impl/CategoryTabs';
import { PhotoGrid } from './_impl/PhotoGrid';
import { SearchFilters } from './_impl/SearchFilters';
import { PhotoLightbox } from './_impl/PhotoLightbox';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { Photo, PhotoSearchParams } from '@/domain/gallery/types';

/**
 * @page GalleryPage
 * @summary Photo gallery page with categories, search, and lightbox
 * @domain gallery
 * @type gallery-page
 * @category public
 *
 * @routing
 * - Path: /galeria
 * - Params: none
 * - Query: none
 *
 * @layout
 * - Layout: MainLayout
 * - Sections: Categories, Search, Grid, Lightbox
 *
 * @data
 * - Sources: Gallery API
 * - Loading: Skeleton loading states
 * - Caching: 2 minutes stale time
 */
export const GalleryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [searchParams, setSearchParams] = useState<PhotoSearchParams>({
    page: 1,
    pageSize: 30,
  });
  const [isSearching, setIsSearching] = useState(false);

  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGalleryCategories();

  const {
    photos: categoryPhotos,
    total: categoryTotal,
    isLoading: photosLoading,
    error: photosError,
  } = useGalleryPhotos({
    filters: {
      categoryId: selectedCategoryId,
      page: searchParams.page,
      pageSize: searchParams.pageSize,
    },
    enabled: !isSearching,
  });

  const {
    photos: searchPhotos,
    total: searchTotal,
    isLoading: searchLoading,
  } = usePhotoSearch({
    searchParams,
    enabled: isSearching,
  });

  const displayPhotos = useMemo(() => {
    return isSearching ? searchPhotos : categoryPhotos;
  }, [isSearching, searchPhotos, categoryPhotos]);

  const displayTotal = useMemo(() => {
    return isSearching ? searchTotal : categoryTotal;
  }, [isSearching, searchTotal, categoryTotal]);

  const isLoading = categoriesLoading || photosLoading || searchLoading;

  const handleCategorySelect = (categoryId: number | undefined) => {
    setSelectedCategoryId(categoryId);
    setIsSearching(false);
    setSearchParams({ page: 1, pageSize: 30 });
  };

  const handleSearch = (params: PhotoSearchParams) => {
    setSearchParams(params);
    setIsSearching(true);
    setSelectedCategoryId(undefined);
  };

  const handleClearSearch = () => {
    setSearchParams({ page: 1, pageSize: 30 });
    setIsSearching(false);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  if (categoriesError || photosError) {
    return (
      <ErrorMessage
        title="Erro ao carregar galeria"
        message="Não foi possível carregar a galeria de fotos. Por favor, tente novamente."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
          Galeria de Fotos
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Conheça nosso ambiente, pratos e momentos especiais
        </p>
      </div>

      <SearchFilters
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isSearching}
      />

      {!isSearching && categories && (
        <CategoryTabs
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <PhotoGrid
          photos={displayPhotos || []}
          total={displayTotal}
          currentPage={searchParams.page || 1}
          pageSize={searchParams.pageSize || 30}
          onPhotoClick={handlePhotoClick}
          onPageChange={handlePageChange}
        />
      )}

      {selectedPhoto && <PhotoLightbox photoId={selectedPhoto.id} onClose={handleCloseLightbox} />}
    </div>
  );
};

export default GalleryPage;
