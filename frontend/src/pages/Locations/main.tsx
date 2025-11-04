/**
 * @page LocationsPage
 * @summary Locations display page
 * @domain locations
 * @type list-page
 * @category public
 */
export const LocationsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
          Nossas Localizações
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Em breve: Encontre a unidade Ale Massas mais próxima de você.
        </p>
      </div>
    </div>
  );
};

export default LocationsPage;
