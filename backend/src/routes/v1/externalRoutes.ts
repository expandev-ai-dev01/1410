import { Router } from 'express';
import * as locationController from '@/api/v1/external/location/controller';

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

export default router;
