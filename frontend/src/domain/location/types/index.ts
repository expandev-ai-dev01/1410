/**
 * @module location/types
 * @summary Type definitions for location domain
 * @domain location
 */

export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
  distance?: number;
}

export interface LocationDetail extends Location {
  phones: Phone[];
  hours: OperatingHours;
  photos?: string[];
  services?: string[];
  landmarks?: string[];
  parking?: ParkingInfo;
}

export interface Phone {
  type: string;
  number: string;
}

export interface OperatingHours {
  [key: string]: string | SpecialHours[] | undefined;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  special?: SpecialHours[];
}

export interface SpecialHours {
  date: string;
  hours: string;
  description?: string;
}

export interface ParkingInfo {
  available: boolean;
  type?: string;
  cost?: string;
  conditions?: string;
}

export interface LocationListParams {
  region?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
}
