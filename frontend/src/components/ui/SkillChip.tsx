import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export type SkillStatus = 'matched' | 'missing' | 'weak' | 'nice-to-have';

export interface SkillChipProps {
  name: string;
  status?: SkillStatus;
  className?: string;
}

export const SkillChip: React.FC<SkillChipProps> = ({
  name,
  status = 'nice-to-have',
  className = '',
}) => {
  let styleClasses = '';
  let IconComponent: React.ReactNode = null;

  switch (status) {
    case 'matched':
      styleClasses = 'bg-success/10 text-success border border-success/30';
      IconComponent = <CheckCircle2 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />;
      break;
    case 'missing':
      styleClasses = 'bg-danger/10 text-danger border border-danger/30';
      IconComponent = <XCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />;
      break;
    case 'weak':
      styleClasses = 'bg-warning/10 text-warning border border-warning/30';
      IconComponent = <AlertTriangle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />;
      break;
    case 'nice-to-have':
      styleClasses = 'bg-transparent text-text-muted border border-border';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium shrink-0 ${styleClasses} ${className}`}
    >
      {IconComponent}
      <span>{name}</span>
    </span>
  );
};
