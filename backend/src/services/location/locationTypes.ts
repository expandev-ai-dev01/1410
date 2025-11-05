/**
 * @interface LocationListQuery
 * @description Query parameters for location listing
 */
export interface LocationListQuery {
  region?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * @interface LocationListItem
 * @description Location summary for list view
 */
export interface LocationListItem {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
  distance?: number;
}

/**
 * @interface PhoneContact
 * @description Phone contact information
 */
export interface PhoneContact {
  type: string;
  number: string;
}

/**
 * @interface OperatingHours
 * @description Operating hours structure
 */
export interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  specialDates?: Array<{
    date: string;
    hours: string;
    description: string;
  }>;
}

/**
 * @interface ParkingInfo
 * @description Parking information
 */
export interface ParkingInfo {
  available: boolean;
  type?: string;
  price?: string;
  notes?: string;
}

/**
 * @interface LocationDetail
 * @description Complete location information
 */
export interface LocationDetail {
  id: number;
  name: string;
  address: string;
  phones: PhoneContact[];
  hours: OperatingHours;
  latitude: number;
  longitude: number;
  photos?: string[];
  services?: string[];
  landmarks?: string[];
  parking?: ParkingInfo;
}
