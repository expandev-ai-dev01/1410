import { Router } from 'express';
import * as locationController from '@/api/v1/external/location/controller';
import * as galleryController from '@/api/v1/external/gallery/controller';

const router = Router();

/**
 * @summary External (public) API routes
 * @remarks Routes accessible without authentication
 */

/**
 * @summary Location routes
 * @remarks Public access to restaurant locations
 */
router.get('/location', locationController.listHandler);
router.get('/location/:id', locationController.getHandler);

/**
 * @summary Gallery routes
 * @remarks Public access to photo gallery
 */
router.get('/gallery/categories', galleryController.listCategoriesHandler);
router.get('/gallery/photos', galleryController.listPhotosHandler);
router.get('/gallery/photos/:id', galleryController.getPhotoHandler);
router.get('/gallery/search', galleryController.searchPhotosHandler);

export default router;
