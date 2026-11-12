import { usePortfolio } from '../context/PortfolioContext';

export default function LiquidBackground() {
  const { isDark } = usePortfolio();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Blob 1 */}
      <div 
        className={`absolute -top-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full blur-[120px] animate-liquid-1 transition-all duration-700 ${
          isDark ? 'bg-white/[0.08]' : 'bg-black/[0.04]'
        }`}
      />
      {/* Blob 2 */}{/* FOTO MODEL CUTOUT TENGAH (Diturunkan Mendekati Border Bawah) */}
<div className="relative z-20 h-[48vh] sm:h-[62vh] flex items-end justify-center pointer-events-none translate-y-8 sm:translate-y-12 lg:translate-y-16">
  <img 
    src={general.heroImageUrl} 
    alt={personal.name} 
    className="h-full w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] filter contrast-105"
  />
</div>
      <div 
        className={`absolute top-1/2 -right-32 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full blur-[130px] animate-liquid-2 transition-all duration-700 ${
          isDark ? 'bg-white/[0.05]' : 'bg-black/[0.05]'
        }`}
      />
      {/* Blob 3 */}
      <div 
        className={`absolute -bottom-40 left-1/3 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full blur-[110px] animate-liquid-3 transition-all duration-700 ${
          isDark ? 'bg-white/[0.06]' : 'bg-black/[0.03]'
        }`}
      />
    </div>
  );
}