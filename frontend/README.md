# Ale Massas - Frontend

Site para o restaurante italiano Ale Massas, desenvolvido com React, TypeScript e Tailwind CSS.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- Tailwind CSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Providers globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   ├── Menu/             # Cardápio
│   ├── Locations/        # Localizações
│   ├── Gallery/          # Galeria de fotos
│   ├── About/            # Sobre o restaurante
│   ├── Contact/          # Contato
│   ├── Reservation/      # Reservas
│   ├── Events/           # Eventos e promoções
│   └── NotFound/         # Página 404
├── core/                  # Componentes e utilitários globais
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/              # Configurações de bibliotecas
│   └── utils/            # Funções utilitárias
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Lint
npm run lint
```

## Variáveis de Ambiente

- `VITE_API_URL`: URL da API backend (padrão: http://localhost:3000)
- `VITE_API_VERSION`: Versão da API (padrão: v1)
- `VITE_API_TIMEOUT`: Timeout das requisições em ms (padrão: 30000)

## Funcionalidades

- ✅ Estrutura base da aplicação
- ✅ Sistema de roteamento
- ✅ Layout responsivo com header e footer
- ✅ Integração com API backend
- ⏳ Exibição de cardápio
- ⏳ Mapa de localizações
- ⏳ Galeria de fotos
- ⏳ História do restaurante
- ⏳ Formulário de contato
- ⏳ Sistema de reservas
- ⏳ Área de eventos e promoções
- ⏳ Integração com redes sociais

## Licença

Proprietary - Ale Massas © 2024