import { Link } from 'react-router-dom';

/**
 * @page SitemapPage
 * @summary Sitemap page displaying all site pages organized by category
 * @domain core
 * @type content-page
 * @category public
 */
export const SitemapPage = () => {
  const sitemapSections = [
    {
      title: 'Principal',
      links: [{ name: 'Início', href: '/' }],
    },
    {
      title: 'Cardápio',
      links: [{ name: 'Cardápio Completo', href: '/cardapio' }],
    },
    {
      title: 'Localizações',
      links: [{ name: 'Nossas Unidades', href: '/localizacoes' }],
    },
    {
      title: 'Galeria',
      links: [{ name: 'Fotos', href: '/galeria' }],
    },
    {
      title: 'Institucional',
      links: [{ name: 'Sobre Nós', href: '/sobre' }],
    },
    {
      title: 'Eventos',
      links: [{ name: 'Eventos e Promoções', href: '/eventos' }],
    },
    {
      title: 'Contato',
      links: [
        { name: 'Entre em Contato', href: '/contato' },
        { name: 'Fazer Reserva', href: '/reserva' },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
          Mapa do Site
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Navegue facilmente por todas as páginas do nosso site
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sitemapSections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-serif">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SitemapPage;
