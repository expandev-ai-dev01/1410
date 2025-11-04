import { Link } from 'react-router-dom';
import { Button } from '@/core/components/Button';

/**
 * @page NotFoundPage
 * @summary 404 error page
 * @domain core
 * @type error-page
 * @category public
 */
export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Página não encontrada</h2>
        <p className="mt-2 text-lg text-gray-600">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary" size="lg">
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
