import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  clickable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-surface border border-border rounded-xl p-4 sm:p-6 transition-colors duration-150 ${
        clickable ? 'cursor-pointer hover:border-primary/50 hover:bg-surface-2' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
