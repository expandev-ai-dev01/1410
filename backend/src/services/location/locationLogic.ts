import {
  LocationListQuery,
  LocationListItem,
  LocationDetail,
  OperatingHours,
  PhoneContact,
  ParkingInfo,
} from './locationTypes';

/**
 * @summary In-memory storage for locations
 * @remarks This is a temporary solution. In production, this would be replaced with database queries.
 */
const locations: LocationDetail[] = [
  {
    id: 1,
    name: 'Ale Massas - Jardins',
    address: 'Rua Augusta, 1234 - Jardins, São Paulo - SP, 01304-001',
    phones: [
      { type: 'principal', number: '(11) 3456-7890' },
      { type: 'delivery', number: '(11) 3456-7891' },
    ],
    hours: {
      monday: '11:00 - 23:00',
      tuesday: '11:00 - 23:00',
      wednesday: '11:00 - 23:00',
      thursday: '11:00 - 23:00',
      friday: '11:00 - 00:00',
      saturday: '11:00 - 00:00',
      sunday: '11:00 - 22:00',
    },
    latitude: -23.561684,
    longitude: -46.656139,
    photos: [],
    services: ['Estacionamento', 'Wi-Fi', 'Área Kids'],
    landmarks: ['Próximo ao Parque Trianon', 'Avenida Paulista'],
    parking: {
      available: true,
      type: 'Conveniado',
      price: 'R$ 15,00 por 2 horas',
      notes: 'Validação no restaurante',
    },
  },
  {
    id: 2,
    name: 'Ale Massas - Vila Madalena',
    address: 'Rua Harmonia, 567 - Vila Madalena, São Paulo - SP, 05435-000',
    phones: [
      { type: 'principal', number: '(11) 3456-7892' },
      { type: 'delivery', number: '(11) 3456-7893' },
    ],
    hours: {
      monday: '11:00 - 23:00',
      tuesday: '11:00 - 23:00',
      wednesday: '11:00 - 23:00',
      thursday: '11:00 - 23:00',
      friday: '11:00 - 01:00',
      saturday: '11:00 - 01:00',
      sunday: '11:00 - 22:00',
    },
    latitude: -23.546389,
    longitude: -46.691944,
    photos: [],
    services: ['Wi-Fi', 'Área Externa'],
    landmarks: ['Próximo ao Beco do Batman', 'Rua Aspicuelta'],
    parking: {
      available: false,
      notes: 'Estacionamento público nas proximidades',
    },
  },
];

/**
 * @summary Calculate distance between two coordinates using Haversine formula
 * @function calculateDistance
 *
 * @param {number} lat1 - First point latitude
 * @param {number} lon1 - First point longitude
 * @param {number} lat2 - Second point latitude
 * @param {number} lon2 - Second point longitude
 *
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * @summary Check if location is currently open
 * @function isLocationOpen
 *
 * @param {OperatingHours} hours - Location operating hours
 *
 * @returns {boolean} True if location is open
 */
function isLocationOpen(hours: OperatingHours): boolean {
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[now.getDay()] as keyof OperatingHours;
  const todayHours = hours[currentDay] as string;

  if (!todayHours || todayHours === 'Fechado') {
    return false;
  }

  const [openTime, closeTime] = todayHours.split(' - ');
  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  if (closeMinutes < openMinutes) {
    return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
  }

  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
}

/**
 * @summary Retrieves list of all locations with optional filtering
 * @function locationList
 * @module services/location
 *
 * @param {LocationListQuery} query - Query parameters for filtering
 *
 * @returns {Promise<LocationListItem[]>} Array of location summaries
 */
export async function locationList(query: LocationListQuery): Promise<LocationListItem[]> {
  let filteredLocations = [...locations];

  /**
   * @rule {be-location-filter} Apply region and district filters
   */
  if (query.region) {
    filteredLocations = filteredLocations.filter((loc) =>
      loc.address.toLowerCase().includes(query.region!.toLowerCase())
    );
  }

  if (query.district) {
    filteredLocations = filteredLocations.filter((loc) =>
      loc.address.toLowerCase().includes(query.district!.toLowerCase())
    );
  }

  /**
   * @rule {be-location-distance} Calculate distance if user location provided
   */
  const result: LocationListItem[] = filteredLocations.map((loc) => {
    const item: LocationListItem = {
      id: loc.id,
      name: loc.name,
      address: loc.address,
      latitude: loc.latitude,
      longitude: loc.longitude,
      isOpen: isLocationOpen(loc.hours),
    };

    if (query.latitude !== undefined && query.longitude !== undefined) {
      item.distance = calculateDistance(
        query.latitude,
        query.longitude,
        loc.latitude,
        loc.longitude
      );
    }

    return item;
  });

  /**
   * @rule {be-location-sort} Sort by distance if user location provided
   */
  if (query.latitude !== undefined && query.longitude !== undefined) {
    result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  return result;
}

/**
 * @summary Retrieves detailed information about a specific location
 * @function locationGet
 * @module services/location
 *
 * @param {number} id - Location identifier
 *
 * @returns {Promise<LocationDetail | null>} Location details or null if not found
 */
export async function locationGet(id: number): Promise<LocationDetail | null> {
  /**
   * @validation Verify location exists
   */
  const location = locations.find((loc) => loc.id === id);

  if (!location) {
    return null;
  }

  return location;
}
