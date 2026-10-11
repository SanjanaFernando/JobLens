import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  icon: Icon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Section 6 Button styling: 40px desktop, 44px mobile, 8px radius
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium text-sm rounded-lg min-h-[44px] sm:min-h-[40px] px-4 transition-colors duration-150 select-none disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover shadow-none';
      break;
    case 'secondary':
      variantClasses = 'bg-surface text-text border border-border hover:bg-surface-2 active:bg-surface-2';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent text-text-muted hover:text-text hover:bg-surface-2 active:bg-surface-2';
      break;
    case 'danger':
      variantClasses = 'bg-danger text-white hover:opacity-90 active:opacity-90';
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : Icon ? (
        <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
