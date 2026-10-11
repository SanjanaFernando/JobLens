import React from 'react';
import { CheckCircle2, AlertTriangle, LucideIcon } from 'lucide-react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'neutral';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: LucideIcon;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  icon: Icon,
  className = '',
}) => {
  let styleClasses = '';
  let DefaultIcon: LucideIcon | null = null;

  switch (variant) {
    case 'success':
      styleClasses = 'bg-success/15 text-success border border-success/30';
      DefaultIcon = CheckCircle2;
      break;
    case 'warning':
      styleClasses = 'bg-warning/15 text-warning border border-warning/30';
      DefaultIcon = AlertTriangle;
      break;
    case 'danger':
      styleClasses = 'bg-danger/15 text-danger border border-danger/30';
      break;
    case 'info':
      styleClasses = 'bg-info/15 text-info border border-info/30';
      break;
    case 'primary':
      styleClasses = 'bg-primary/15 text-primary border border-primary/30';
      break;
    case 'neutral':
      styleClasses = 'bg-surface-2 text-text-muted border border-border';
      break;
  }

  const RenderIcon = Icon || DefaultIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium shrink-0 ${styleClasses} ${className}`}
    >
      {RenderIcon && <RenderIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />}
      <span>{children}</span>
    </span>
  );
};
