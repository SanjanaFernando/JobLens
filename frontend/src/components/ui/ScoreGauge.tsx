import React from 'react';

export interface ScoreGaugeProps {
  score: number; // 0 to 100
  size?: number; // diameter in px
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, size = 120 }) => {
  const clampedScore = Math.max(0, Math.min(100, score));

  // Meaning colors & text label (Section 2 & 6)
  let color = 'var(--color-danger)';
  let label = 'Weak match';
  let textColorClass = 'text-danger';

  if (clampedScore >= 80) {
    color = 'var(--color-success)';
    label = 'Strong match';
    textColorClass = 'text-success';
  } else if (clampedScore >= 60) {
    color = 'var(--color-accent)';
    label = 'Good match';
    textColorClass = 'text-accent';
  } else if (clampedScore >= 40) {
    color = 'var(--color-warning)';
    label = 'Partial match';
    textColorClass = 'text-warning';
  }

  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--color-surface-2)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Filled progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center number: Hallo Sans Black 40/48 (Section 4) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center font-heading font-black text-3xl sm:text-4xl">
          <span className={textColorClass}>{clampedScore}</span>
        </div>
      </div>

      {/* Meaning text label (Section 6) */}
      <span className={`text-xs font-medium uppercase tracking-wider ${textColorClass}`}>
        {label}
      </span>
    </div>
  );
};
