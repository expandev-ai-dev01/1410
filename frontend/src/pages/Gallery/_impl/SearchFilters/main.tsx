import { useState } from 'react';
import { Button } from '@/core/components/Button';
import type { SearchFiltersProps } from './types';

/**
 * @component SearchFilters
 * @summary Search and filter controls for photos
 * @domain gallery
 * @type ui-component
 * @category form
 */
export const SearchFilters = ({ onSearch, onClear, isSearching }: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (searchTerm && searchTerm.length < 3) {
      newErrors.searchTerm = 'O termo de busca deve ter pelo menos 3 caracteres';
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        newErrors.endDate = 'A data final não pode ser anterior à data inicial';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!searchTerm && !startDate && !endDate) {
      return;
    }

    onSearch({
      searchTerm: searchTerm || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      page: 1,
      pageSize: 30,
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setErrors({});
    onClear();
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">
              Buscar por título ou descrição
            </label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite pelo menos 3 caracteres"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            {errors.searchTerm && <p className="mt-1 text-sm text-red-600">{errors.searchTerm}</p>}
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Data inicial
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Data final
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" size="md">
            Buscar
          </Button>
          {isSearching && (
            <Button type="button" variant="outline" size="md" onClick={handleClear}>
              Limpar Filtros
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
