import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { general, personal, isDark } = usePortfolio();

  // Pisahkan huruf nama besar agar merentang rata di layar (misal: R I F K I)
  const bigLetters = (general.heroBigText || 'RIFKI').split('');

  return (
    <section id="beranda" className="page-fade-up min-h-screen pt-24 pb-12 px-3 sm:px-6 flex items-center justify-center select-none">
      
      {/* BINGKAI KOTAK EDITORIAL MAJALAH (BORDER FRAME) */}
      <div 
        className={`relative w-full max-w-[1380px] min-h-[760px] lg:h-[88vh] rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 border ${
          isDark 
            ? 'bg-zinc-950/80 border-white/15 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]' 
            : 'bg-[#fafafc] border-zinc-900/80 text-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.08)]'
        }`}
      >

        {/* ================= TOP SECTION ================= */}
        <div className="flex justify-between items-start z-30">
          
          {/* Top-Left: Badge & Jikosoukai */}
          <div className="flex items-start gap-4 max-w-sm sm:max-w-md">
            {/* Box Badge */}
            <div className={`flex flex-col items-center border px-2.5 py-1 shrink-0 ${isDark ? 'border-white' : 'border-zinc-900'}`}>
              <span className="text-[11px] font-bold tracking-widest font-mono leading-none">DEV</span>
              <span className="text-[9px] font-mono leading-none mt-0.5">2026</span>
              <div className={`w-full text-[8px] font-mono text-center px-1 mt-1 font-semibold tracking-tighter ${
                isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
              }`}>
                {general.badgeText || 'PROFILE'}
              </div>
            </div>

            {/* Jikosoukai Heading & Intro */}
            <div className="leading-snug">
              <h2 className="text-xs font-black tracking-[0.2em] uppercase font-mono">
                JIKOSOUKAI
              </h2>
              <p className="text-[11px] sm:text-xs mt-1 italic font-serif opacity-80 whitespace-pre-line leading-relaxed">
                {general.heroIntro || "Seperti pizza yang dinanti-nantikan semua orang, selalu nantikan aku ya!\nHalo, saya Mochamad Rifki Al Farizi!"}
              </p>
            </div>
          </div>

          {/* Top-Right: Barcode Garis Gantung & Info Meta */}
          <div className="flex flex-col items-end">
            <div className="flex items-start gap-[3px] h-10 mb-3 opacity-80">
              {[38, 22, 35, 14, 28, 42, 18, 32, 12, 26, 40, 16, 30].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-[2px] ${isDark ? 'bg-white' : 'bg-zinc-900'}`} 
                  style={{ height: `${h}px` }} 
                />
              ))}
            </div>

            <p className="text-xs italic font-serif tracking-wider opacity-80">
              {personal.nickname || 'Rifki'}.09-01-2006
            </p>
            <p className="text-[11px] font-mono tracking-tight opacity-60 uppercase mt-0.5">
              Project By {personal.name || 'Mochamad Rifki Al Farizi'}
            </p>
          </div>
        </div>

        {/* ================= CENTER HERO (HURUF BESAR & FOTO CUTOUT) ================= */}
        <div className="relative flex-1 flex items-center justify-center my-auto">
          
          {/* Katakana Jepang di Kiri Atas Nama */}
          <div 
  style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
  className="absolute top-[2%] sm:top-[6%] left-2 sm:left-10 z-10 text-2xl sm:text-4xl font-light tracking-[0.35em] opacity-80"
>
  {general.heroKatakana || 'モハマド・リフキ'}
</div>

          {/* TEKS SERIF BESAR RENTANG LEBAR (DI BELAKANG FOTO) */}
          <div className="absolute inset-0 flex items-center justify-between w-full pointer-events-none z-10">
            <h1 
              style={{ fontFamily: "'Playfair Display', serif" }} 
              className="w-full text-center text-[18vw] sm:text-[17vw] font-normal tracking-[0.08em] sm:tracking-[0.14em] flex justify-between leading-none opacity-95 select-none"
            >
              {bigLetters.map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </h1>
          </div>

          {/* FOTO MODEL CUTOUT TENGAH */}
          {/* FOTO MODEL CUTOUT TENGAH (Diturunkan Mendekati Border Bawah) */}
<div className="relative z-20 h-[48vh] sm:h-[62vh] flex items-end justify-center pointer-events-none translate-y-8 sm:translate-y-12 lg:translate-y-16">
  <img 
    src={general.heroImageUrl} 
    alt={personal.name} 
    className="h-full w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] filter contrast-105"
  />
</div>

          {/* Tanda Tangan Sambung / Cursive di Kanan Bawah Huruf */}
          <div 
            style={{ fontFamily: "'Alex Brush', cursive" }}
            className={`absolute bottom-[2%] sm:bottom-[6%] right-[8%] sm:right-[16%] z-30 text-5xl sm:text-8xl rotate-[-5deg] drop-shadow-md select-none ${
              isDark ? 'text-white/90' : 'text-zinc-900/90'
            }`}
          >
            {general.heroSignature || 'Al Farizi'}
          </div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="flex justify-between items-end z-30 pt-4">
          
          {/* Bottom-Left: Current News !! */}
          <div className="max-w-xs sm:max-w-sm">
            <h3 
              style={{ fontFamily: "'Playfair Display', serif" }} 
              className="text-base sm:text-lg font-bold italic tracking-wide flex items-center gap-1.5"
            >
              {general.currentStatusTitle || 'Current News !!'}
            </h3>
            <p className="text-[11px] sm:text-xs opacity-75 font-sans leading-relaxed mt-1">
              {general.heroDescription || general.currentStatusText || 'Mochamad Rifki Al Farizi adalah Software Engineer yang berfokus membangun antarmuka web modern berkinerja tinggi.'}
            </p>
          </div>

          {/* Bottom-Right: The Question Is / Quote */}
          <div className="text-right max-w-xs sm:max-w-md pr-8 sm:pr-10">
            <h4 
              style={{ fontFamily: "'Playfair Display', serif" }} 
              className="text-sm sm:text-base font-bold"
            >
              The Question Is:
            </h4>
            <p className="text-[11px] sm:text-xs italic mt-0.5 opacity-85">
              "{general.heroQuote || "It's not impossible, it's just hard"}"
            </p>
            <span className="text-[10px] font-mono opacity-60 block mt-1">
              {general.heroQuoteAuthor || '~Mochamad Rifki Al Farizi~'}
            </span>
          </div>

          {/* Indikator Tegak SCROLL di Sisi Kanan */}
          <div className="absolute right-3 sm:right-4 bottom-10 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] rotate-90 opacity-40">
              SCROLL
            </span>
            <div className={`w-[1px] h-10 mt-3 ${isDark ? 'bg-white/40' : 'bg-zinc-400'}`} />
          </div>

        </div>

      </div>
    </section>
  );
}