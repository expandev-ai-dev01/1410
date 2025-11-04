import { z } from 'zod';

/**
 * @summary Common Zod validation schemas
 * @module utils/validation
 */

/**
 * @summary String validation with max length
 */
export const zString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema;
};

/**
 * @summary Nullable string validation
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name validation (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Email validation
 */
export const zEmail = z.string().email();

/**
 * @summary Phone validation
 */
export const zPhone = z.string().min(10).max(20);

/**
 * @summary URL validation
 */
export const zUrl = z.string().url();

/**
 * @summary Positive integer validation
 */
export const zPositiveInt = z.number().int().positive();

/**
 * @summary Non-negative integer validation
 */
export const zNonNegativeInt = z.number().int().min(0);

/**
 * @summary Boolean bit validation (0 or 1)
 */
export const zBit = z.number().int().min(0).max(1);

/**
 * @summary Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @summary Nullable foreign key validation
 */
export const zNullableFK = z.number().int().positive().nullable();
