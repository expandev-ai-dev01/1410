import { clsx } from 'clsx';

export interface ButtonVariantProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function getButtonClassName(props: ButtonVariantProps): string {
  const { variant = 'primary', size = 'md', fullWidth = false, className } = props;

  return clsx(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    {
      'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500':
        variant === 'primary',
      'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500':
        variant === 'secondary',
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500':
        variant === 'outline',
      'bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500': variant === 'ghost',
    },
    {
      'h-8 px-3 text-sm': size === 'sm',
      'h-10 px-4 text-base': size === 'md',
      'h-12 px-6 text-lg': size === 'lg',
    },
    {
      'w-full': fullWidth,
    },
    className
  );
}
