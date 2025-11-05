import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { locationList, locationGet } from '@/services/location';
import { HTTP_STATUS } from '@/constants';

/**
 * @summary Schema for location list query parameters
 */
const listQuerySchema = z.object({
  region: z.string().optional(),
  district: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

/**
 * @summary Schema for location detail parameters
 */
const detailParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * @api {get} /api/v1/external/location List Locations
 * @apiName ListLocations
 * @apiGroup Location
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves list of all restaurant locations with optional filtering
 *
 * @apiParam {String} [region] Filter by region
 * @apiParam {String} [district] Filter by district
 * @apiParam {Number} [latitude] User latitude for distance calculation
 * @apiParam {Number} [longitude] User longitude for distance calculation
 *
 * @apiSuccess {Array} locations Array of location objects
 * @apiSuccess {Number} locations.id Location identifier
 * @apiSuccess {String} locations.name Location name
 * @apiSuccess {String} locations.address Location address
 * @apiSuccess {Number} locations.latitude GPS latitude
 * @apiSuccess {Number} locations.longitude GPS longitude
 * @apiSuccess {Boolean} locations.isOpen Current open/closed status
 * @apiSuccess {Number} [locations.distance] Distance in kilometers (if user location provided)
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = listQuerySchema.parse(req.query);

    const locations = await locationList(validated);

    res.json(successResponse(locations));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Invalid query parameters', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/external/location/:id Get Location Details
 * @apiName GetLocation
 * @apiGroup Location
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific location
 *
 * @apiParam {Number} id Location identifier
 *
 * @apiSuccess {Number} id Location identifier
 * @apiSuccess {String} name Location name
 * @apiSuccess {String} address Complete address
 * @apiSuccess {Array} phones Contact phone numbers
 * @apiSuccess {Object} hours Operating hours
 * @apiSuccess {Number} latitude GPS latitude
 * @apiSuccess {Number} longitude GPS longitude
 * @apiSuccess {Array} [photos] Location photos
 * @apiSuccess {Array} [services] Special services available
 * @apiSuccess {Array} [landmarks] Nearby landmarks
 * @apiSuccess {Object} [parking] Parking information
 *
 * @apiError {String} NotFound Location not found
 * @apiError {String} ValidationError Invalid location ID
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = detailParamsSchema.parse(req.params);

    const location = await locationGet(validated.id);

    if (!location) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Location not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(location));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Invalid location ID', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
