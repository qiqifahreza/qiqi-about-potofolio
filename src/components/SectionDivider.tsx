import AnimatedContent from './AnimatedContent';
import { usePortfolio } from '../context/PortfolioContext';

export default function SectionDivider({ label }: { label?: string }) {
  const { isDark } = usePortfolio();

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <AnimatedContent
        distance={24}
        duration={0.65}
        scale={0.96}
        threshold={0.1}
        className="flex items-center justify-center gap-4"
      >
        <div className={`h-[2px] flex-1 ${isDark ? 'bg-white/25' : 'bg-black/80'}`} />

        {label && (
          <span
            className={`px-4 py-1.5 text-[11px] font-mono font-black uppercase tracking-[0.22em] border-2 ${
              isDark
                ? 'border-white bg-zinc-950 text-white shadow-[3px_3px_0px_#ffffff]'
                : 'border-black bg-white text-black shadow-[3px_3px_0px_#000000]'
            }`}
          >
            {label}
          </span>
        )}

        <div className={`h-[2px] flex-1 ${isDark ? 'bg-white/25' : 'bg-black/80'}`} />
      </AnimatedContent>
    </div>
  );
}