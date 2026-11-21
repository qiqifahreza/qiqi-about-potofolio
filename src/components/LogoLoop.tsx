
export interface LogoItem {
  id?: string;
  title: string;
  src?: string;
  href?: string;
  hoverColor?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // Kecepatan gerak (detik per putaran)
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  fadeOut?: boolean;
  className?: string;
}

export default function LogoLoop({
  logos,
  speed = 25,
  direction = 'left',
  logoHeight = 24,
  gap = 24,
  fadeOut = true,
  className = '',
}: LogoLoopProps) {
  if (!logos || logos.length === 0) return null;

  // Three copies keep the marquee continuous.
  const repeatedLogos = [...logos, ...logos, ...logos];

  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className={`relative overflow-hidden select-none group/logoloop ${className}`}
      style={{
        maskImage: fadeOut
          ? 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          : undefined,
        WebkitMaskImage: fadeOut
          ? 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          : undefined,
      }}
    >
      <div
        className="flex items-center w-max group-hover/logoloop:[animation-play-state:paused]"
        style={{
          gap: `${gap}px`,
          animation: `${animationName} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {repeatedLogos.map((logo, index) => {
          const content = (
            <div
              className="flex items-center gap-1.5 transition-all duration-200 hover:scale-110 cursor-pointer opacity-75 hover:opacity-100"
              style={{
                height: `${logoHeight}px`,
              }}
              title={logo.title}
            >
              {logo.src ? (
  <img
    src={logo.src}
    alt={logo.title}
    className="w-auto h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
  />
) : (
  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-black/5 border border-black/10 text-zinc-900 dark:bg-white/10 dark:border-white/10 dark:text-white">
    {logo.title}
  </span>
)}
            </div>
          );

          if (logo.href && logo.href !== '#') {
            return (
              <a
                key={`${logo.title}-${index}`}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
              >
                {content}
              </a>
            );
          }

          return (
            <div key={`${logo.title}-${index}`} className="shrink-0">
              {content}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}