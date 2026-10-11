import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: LucideIcon;
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 bg-surface border border-border rounded-xl">
      <div className="h-12 w-12 rounded-xl bg-surface-2 flex items-center justify-center text-text-muted">
        <Icon className="w-6 h-6" strokeWidth={1.75} />
      </div>
      {title && <h3 className="text-base font-medium text-text">{title}</h3>}
      <p className="text-sm text-text-muted max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" icon={actionIcon} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
