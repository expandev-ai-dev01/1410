import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/pages/layouts/MainLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const MenuPage = lazy(() => import('@/pages/Menu'));
const LocationsPage = lazy(() => import('@/pages/Locations'));
const GalleryPage = lazy(() => import('@/pages/Gallery'));
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const ReservationPage = lazy(() => import('@/pages/Reservation'));
const EventsPage = lazy(() => import('@/pages/Events'));
const SitemapPage = lazy(() => import('@/pages/Sitemap'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @component AppRouter
 * @summary Main application routing configuration with lazy loading
 * @type router-configuration
 * @category navigation
 */
export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cardapio" element={<MenuPage />} />
          <Route path="localizacoes" element={<LocationsPage />} />
          <Route path="galeria" element={<GalleryPage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="contato" element={<ContactPage />} />
          <Route path="reserva" element={<ReservationPage />} />
          <Route path="eventos" element={<EventsPage />} />
          <Route path="mapa-do-site" element={<SitemapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
