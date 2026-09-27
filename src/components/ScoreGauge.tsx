import React from 'react';

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  sublabel?: string;
  colorScheme?: 'primary' | 'tertiary' | 'secondary' | 'gradient';
  showCheckIcon?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  maxScore = 100,
  size = 'md',
  label,
  sublabel,
  colorScheme = 'gradient',
  showCheckIcon = false,
}) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  
  // Dimensions
  const config = {
    sm: { dimension: 48, radius: 18, strokeWidth: 4, textSize: 'text-sm', subSize: 'text-[10px]' },
    md: { dimension: 72, radius: 28, strokeWidth: 6, textSize: 'font-headline-md text-headline-md', subSize: 'font-label-sm text-label-sm' },
    lg: { dimension: 144, radius: 52, strokeWidth: 8, textSize: 'font-metric-score text-metric-score', subSize: 'font-label-sm text-label-sm' },
  }[size];

  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getStrokeColor = () => {
    switch (colorScheme) {
      case 'tertiary':
        return '#006e4b';
      case 'secondary':
        return '#712ae2';
      case 'primary':
        return '#4f46e5';
      case 'gradient':
      default:
        return 'url(#scoreGradient)';
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="-rotate-90 transform"
        width={config.dimension}
        height={config.dimension}
        viewBox={`0 0 ${config.dimension} ${config.dimension}`}
      >
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#8a4cfc" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={config.radius}
          fill="transparent"
          stroke="var(--color-surface-container-high, #e2e7ff)"
          strokeWidth={config.strokeWidth}
        />
        {/* Dynamic Progress */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={config.radius}
          fill="transparent"
          stroke={getStrokeColor()}
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        {showCheckIcon ? (
          <span className="material-symbols-outlined text-[20px] text-tertiary-container">done_all</span>
        ) : (
          <>
            <span className={`${config.textSize} text-on-surface font-bold leading-none`}>
              {score}
            </span>
            {(label || sublabel) && (
              <span className={`${config.subSize} text-on-surface-variant font-medium mt-0.5`}>
                {label || sublabel}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
