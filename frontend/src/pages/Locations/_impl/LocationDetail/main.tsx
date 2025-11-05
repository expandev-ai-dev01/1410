import { useLocationDetail } from '@/domain/location/hooks/useLocationDetail';
import { formatOperatingHours } from '@/domain/location/utils/hours';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';
import type { LocationDetailProps } from './types';

/**
 * @component LocationDetail
 * @summary Modal displaying detailed location information
 * @domain location
 * @type ui-component
 * @category display
 */
export const LocationDetail = ({ locationId, onClose }: LocationDetailProps) => {
  const { location, isLoading } = useLocationDetail({ locationId });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg bg-white p-8">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900">{location.name}</h2>
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Endereço</h3>
              <p className="text-gray-600">{location.address}</p>
              <Button variant="primary" size="sm" onClick={handleGetDirections} className="mt-2">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Como Chegar
              </Button>
            </div>

            {location.phones && location.phones.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefones</h3>
                <div className="space-y-1">
                  {location.phones.map((phone, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">{phone.type}:</span>
                      <a
                        href={`tel:${phone.number}`}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        {phone.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Horário de Funcionamento</h3>
              <div className="space-y-1">
                {formatOperatingHours(location.hours).map((line, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {location.services && location.services.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Serviços Especiais</h3>
                <div className="flex flex-wrap gap-2">
                  {location.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {location.parking && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Estacionamento</h3>
                <p className="text-sm text-gray-600">
                  {location.parking.available ? (
                    <>
                      {location.parking.type && <span>{location.parking.type} - </span>}
                      {location.parking.cost && <span>{location.parking.cost}</span>}
                      {location.parking.conditions && (
                        <span className="block mt-1">{location.parking.conditions}</span>
                      )}
                    </>
                  ) : (
                    'Estacionamento não disponível'
                  )}
                </p>
              </div>
            )}

            {location.landmarks && location.landmarks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pontos de Referência</h3>
                <ul className="list-disc list-inside space-y-1">
                  {location.landmarks.map((landmark, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
