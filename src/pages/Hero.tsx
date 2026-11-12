import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { primaryColor, secondaryColor, general, personal } = usePortfolio();

  return (
    <section id="beranda" className="relative z-10 pt-28 pb-16 px-4 sm:px-8 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl rounded-3xl glass-panel p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-white/20">
        
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-white"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              {general.badgeText}
            </div>
            <div className="hidden sm:block text-xs font-serif italic text-slate-400">
              "Presisi kode & estetika visual tak tertandingi."
            </div>
          </div>

          <div className="flex items-start gap-1 opacity-70">
            {[32, 16, 24, 12, 28, 36, 18, 30].map((h, i) => (
              <div 
                key={i} 
                className="w-[2px] rounded-full" 
                style={{ height: `${h}px`, backgroundColor: primaryColor }}
              />
            ))}
          </div>
        </div>

        {/* Center Typography & Cutout */}
        <div className="relative flex flex-col items-center justify-center my-6 py-6">
          <span className="text-xl sm:text-2xl font-light tracking-[0.4em] opacity-60 mb-2">
            {general.heroKatakana}
          </span>

          <div className="relative w-full flex justify-center items-center">
            <h1 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[17vw] sm:text-[14vw] font-black tracking-widest leading-none select-none opacity-90 transition-all uppercase"
            >
              {general.heroBigText}
            </h1>

            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <img 
                src={general.heroImageUrl} 
                alt={personal.name} 
                className="h-[42vh] sm:h-[55vh] object-contain drop-shadow-2xl"
              />
            </div>

            <div 
              style={{ fontFamily: "'Alex Brush', cursive", color: secondaryColor }}
              className="absolute -bottom-4 sm:bottom-0 right-4 sm:right-28 text-4xl sm:text-7xl rotate-[-6deg] drop-shadow-lg"
            >
              {general.heroSignature}
            </div>
          </div>
        </div>

        {/* Bottom Hero Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10 mt-6">
          <div className="text-center sm:text-left">
            <h2 className="text-sm font-bold uppercase tracking-wider">{personal.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{personal.role}</p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#projek" 
              className="px-5 py-2.5 rounded-xl font-medium text-xs uppercase tracking-wider text-white shadow-lg hover:scale-105 active:scale-95 transition"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              Jelajahi Projek
            </a>
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-xl glass-panel font-medium text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition"
            >
              Hubungi
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}