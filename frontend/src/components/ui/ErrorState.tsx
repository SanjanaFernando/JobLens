import React from 'react';
import { XCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  message: string;
  suggestion?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  suggestion = 'Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 bg-surface border border-danger/30 rounded-xl">
      <div className="h-12 w-12 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
        <XCircle className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <h3 className="text-base font-medium text-text">{message}</h3>
      <p className="text-sm text-text-muted max-w-sm">{suggestion}</p>
      {onRetry && (
        <div className="pt-2">
          <Button variant="secondary" icon={RotateCcw} onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
};
