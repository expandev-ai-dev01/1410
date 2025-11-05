import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { galleryService } from '@/domain/gallery/services/galleryService';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';
import type { PhotoLightboxProps } from './types';

/**
 * @component PhotoLightbox
 * @summary Modal lightbox for viewing photos in full size
 * @domain gallery
 * @type ui-component
 * @category display
 */
export const PhotoLightbox = ({ photoId, onClose }: PhotoLightboxProps) => {
  const { data: photo, isLoading } = useQuery({
    queryKey: ['photo-detail', photoId],
    queryFn: () => galleryService.getPhotoById(photoId),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleShare = async () => {
    if (!photo) return;

    const shareUrl = `${window.location.origin}/galeria?photo=${photo.id}`;
    const shareText = photo.title || 'Confira esta foto do Ale Massas';

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          text: photo.description || shareText,
          url: shareUrl,
        });
      } catch (error: unknown) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-90" onClick={onClose} />
        <div className="relative w-full max-w-5xl">
          <div className="absolute right-0 top-0 z-10 flex gap-2 p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </Button>
            <button
              onClick={onClose}
              className="rounded-md bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            photo && (
              <div className="rounded-lg bg-white shadow-xl">
                <img
                  src={photo.fullSizeUrl}
                  alt={photo.title || 'Foto da galeria'}
                  className="w-full rounded-t-lg"
                />
                {(photo.title || photo.description || photo.date) && (
                  <div className="p-6">
                    {photo.title && (
                      <h2 className="text-2xl font-bold text-gray-900">{photo.title}</h2>
                    )}
                    {photo.description && <p className="mt-2 text-gray-600">{photo.description}</p>}
                    {photo.date && (
                      <p className="mt-2 text-sm text-gray-500">
                        {new Date(photo.date).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
