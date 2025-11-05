import type { OperatingHours } from '../types';

/**
 * @utility isLocationOpen
 * @summary Determines if a location is currently open based on operating hours
 * @domain location
 * @type utility-function
 * @category business-logic
 */
export function isLocationOpen(hours: OperatingHours): boolean {
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[now.getDay()];
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const todayHours = hours[currentDay];
  if (!todayHours || typeof todayHours !== 'string' || todayHours.toLowerCase() === 'fechado') {
    return false;
  }

  const [openTime, closeTime] = todayHours.split(' - ');
  const [openHour, openMin] = openTime.split(':').map(Number);
  const [closeHour, closeMin] = closeTime.split(':').map(Number);

  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  return currentTime >= openMinutes && currentTime <= closeMinutes;
}

/**
 * @utility formatOperatingHours
 * @summary Formats operating hours for display
 * @domain location
 * @type utility-function
 * @category formatting
 */
export function formatOperatingHours(hours: OperatingHours): string[] {
  const dayNames = [
    { key: 'monday', label: 'Segunda' },
    { key: 'tuesday', label: 'Terça' },
    { key: 'wednesday', label: 'Quarta' },
    { key: 'thursday', label: 'Quinta' },
    { key: 'friday', label: 'Sexta' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  return dayNames.map((day) => {
    const dayHours = hours[day.key];
    const formattedHours = typeof dayHours === 'string' ? dayHours : 'Fechado';
    return `${day.label}: ${formattedHours}`;
  });
}
