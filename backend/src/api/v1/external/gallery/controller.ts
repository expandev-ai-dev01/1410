import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import {
  galleryListCategories,
  galleryListPhotos,
  galleryGetPhoto,
  gallerySearchPhotos,
} from '@/services/gallery';
import { HTTP_STATUS } from '@/constants';

/**
 * @summary Schema for photo list query parameters
 */
const photoListQuerySchema = z.object({
  categoryId: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(30).default(30),
});

/**
 * @summary Schema for photo detail parameters
 */
const photoDetailParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * @summary Schema for photo search query parameters
 */
const photoSearchQuerySchema = z.object({
  searchTerm: z.string().min(3).max(50).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(30).default(30),
});

/**
 * @api {get} /api/v1/external/gallery/categories List Categories
 * @apiName ListCategories
 * @apiGroup Gallery
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves all available photo categories
 *
 * @apiSuccess {Array} categories Array of category objects
 * @apiSuccess {Number} categories.id Category identifier
 * @apiSuccess {String} categories.name Category name
 * @apiSuccess {String} categories.description Category description
 * @apiSuccess {Number} categories.photoCount Number of photos in category
 *
 * @apiError {String} ServerError Internal server error
 */
export async function listCategoriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const categories = await galleryListCategories();
    res.json(successResponse(categories));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /api/v1/external/gallery/photos List Photos
 * @apiName ListPhotos
 * @apiGroup Gallery
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves photos with optional category filtering and pagination
 *
 * @apiParam {Number} [categoryId] Filter by category ID
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=30] Items per page (max 30)
 *
 * @apiSuccess {Array} photos Array of photo objects
 * @apiSuccess {Number} photos.id Photo identifier
 * @apiSuccess {String} photos.thumbnailUrl Thumbnail image URL
 * @apiSuccess {String} photos.title Photo title
 * @apiSuccess {Number} photos.categoryId Category identifier
 * @apiSuccess {String} photos.categoryName Category name
 * @apiSuccess {Object} metadata Pagination metadata
 * @apiSuccess {Number} metadata.page Current page
 * @apiSuccess {Number} metadata.pageSize Items per page
 * @apiSuccess {Number} metadata.total Total items
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listPhotosHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = photoListQuerySchema.parse(req.query);

    const result = await galleryListPhotos(validated);

    res.json(
      successResponse(result.photos, {
        page: validated.page,
        pageSize: validated.pageSize,
        total: result.total,
      })
    );
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
 * @api {get} /api/v1/external/gallery/photos/:id Get Photo Details
 * @apiName GetPhoto
 * @apiGroup Gallery
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific photo
 *
 * @apiParam {Number} id Photo identifier
 *
 * @apiSuccess {Number} id Photo identifier
 * @apiSuccess {String} thumbnailUrl Thumbnail image URL
 * @apiSuccess {String} fullSizeUrl Full size image URL
 * @apiSuccess {String} title Photo title
 * @apiSuccess {String} description Photo description
 * @apiSuccess {String} date Photo date
 * @apiSuccess {Number} categoryId Category identifier
 * @apiSuccess {String} categoryName Category name
 *
 * @apiError {String} NotFound Photo not found
 * @apiError {String} ValidationError Invalid photo ID
 * @apiError {String} ServerError Internal server error
 */
export async function getPhotoHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = photoDetailParamsSchema.parse(req.params);

    const photo = await galleryGetPhoto(validated.id);

    if (!photo) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Photo not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(photo));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Invalid photo ID', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/external/gallery/search Search Photos
 * @apiName SearchPhotos
 * @apiGroup Gallery
 * @apiVersion 1.0.0
 *
 * @apiDescription Searches photos by term and/or date range
 *
 * @apiParam {String} [searchTerm] Search term (min 3 characters)
 * @apiParam {String} [startDate] Start date (YYYY-MM-DD)
 * @apiParam {String} [endDate] End date (YYYY-MM-DD)
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=30] Items per page (max 30)
 *
 * @apiSuccess {Array} photos Array of photo objects
 * @apiSuccess {Object} metadata Pagination metadata
 *
 * @apiError {String} ValidationError Invalid search parameters
 * @apiError {String} ServerError Internal server error
 */
export async function searchPhotosHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = photoSearchQuerySchema.parse(req.query);

    /**
     * @validation Verify date range validity
     */
    if (validated.startDate && validated.endDate) {
      const startDate = new Date(validated.startDate);
      const endDate = new Date(validated.endDate);

      if (endDate < startDate) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(errorResponse('End date cannot be before start date', 'VALIDATION_ERROR'));
        return;
      }
    }

    const result = await gallerySearchPhotos(validated);

    res.json(
      successResponse(result.photos, {
        page: validated.page,
        pageSize: validated.pageSize,
        total: result.total,
      })
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Invalid search parameters', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
