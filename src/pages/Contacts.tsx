import { Send, ExternalLink, Sparkles, Terminal, Radio } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import AnimatedContent from '../components/AnimatedContent';

export default function Contacts() {
  const { isDark, contacts, contactSettings } = usePortfolio();

  const themeTitle = isDark ? 'text-white' : 'text-zinc-950';

  return (
    <section id="contact" className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto overflow-hidden select-none">
      
      <div className="absolute top-10 right-4 pointer-events-none opacity-[0.05] dark:opacity-[0.06] text-7xl sm:text-9xl font-black font-['Noto_Sans_JP',sans-serif] tracking-widest leading-none">
        バァァン
      </div>
      <div className="absolute bottom-16 left-2 pointer-events-none opacity-[0.05] dark:opacity-[0.06] text-7xl sm:text-9xl font-black font-['Noto_Sans_JP',sans-serif] tracking-widest leading-none">
        ピピッ
      </div>

      <AnimatedContent
        distance={40}
        duration={0.7}
        blur={3}
        threshold={0.12}
        className="text-center mb-16 sm:mb-20 w-full relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[11px] font-mono font-black uppercase tracking-[0.25em] border-2 border-black dark:border-white bg-white dark:bg-zinc-950 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
          <Sparkles size={13} className="text-amber-500 animate-pulse" />
          <span>巻の三 // CHAPTER 03 • FINAL TRANSMISSION</span>
        </div>

        <div className="relative inline-block">
          <h2 className={`text-3xl sm:text-6xl font-black tracking-tight font-mono uppercase ${themeTitle}`}>
            {contactSettings.title || "ESTABLISH CONTACT"}
          </h2>
          <p className="text-xs sm:text-sm font-['Noto_Sans_JP',sans-serif] font-bold tracking-[0.35em] mt-1 opacity-70">
            通信確立 • 共闘要請 • 意見交信
          </p>

          <div className="absolute -top-6 -right-6 sm:-right-10 rotate-12 border-2 border-rose-600 text-rose-600 px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase opacity-90 shadow-xs pointer-events-none">
            [ 急 • URGENT ]
          </div>
        </div>
      </AnimatedContent>

      <AnimatedContent
        distance={60}
        duration={0.85}
        scale={0.97}
        threshold={0.12}
        className="w-full"
      >
        <div className="w-full rounded-2xl border-2 border-black dark:border-white bg-white/80 dark:bg-zinc-900/80 shadow-[10px_10px_0px_#000] dark:shadow-[10px_10px_0px_#fff] p-6 sm:p-12 relative overflow-hidden">
          
          <span className="absolute top-2 left-2 text-[10px] font-mono opacity-30 select-none">⌜</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono opacity-30 select-none">⌝</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-30 select-none">⌞</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono opacity-30 select-none">⌟</span>

          <div className="flex items-center justify-between pb-3 mb-8 border-b-2 border-black/10 dark:border-white/15 text-xs font-mono">
            <span className="font-black flex items-center gap-2 uppercase">
              <Terminal size={15} className="text-emerald-500" />
              COMM TERMINAL // KIRIM PESAN KE KIKI
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">STATUS: READY TO DISPATCH</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm opacity-80 mb-8 font-serif leading-relaxed max-w-xl">
            {contactSettings.description || "Punya ide menarik, tawaran kerjasama proyek, atau ingin berdiskusi? Kirimkan pesan langsung melalui terminal ini."}
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert('Pesan berhasil terkirim!'); }} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-mono font-black uppercase tracking-wider block mb-1.5 opacity-80">
                  // OPERATOR NAME:
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Nama Lengkap Anda" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-950 font-mono text-xs sm:text-sm focus:outline-none shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-black uppercase tracking-wider block mb-1.5 opacity-80">
                  // RETURN FREQUENCY (EMAIL):
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="email@example.com" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-950 font-mono text-xs sm:text-sm focus:outline-none shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono font-black uppercase tracking-wider block mb-1.5 opacity-80">
                // DISPATCH BRIEF (PESAN):
              </label>
              <textarea 
                rows={4} 
                required 
                placeholder="Ceritakan tentang rencana proyek atau ide kolaborasi Anda..." 
                className="w-full px-4 py-3 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-950 font-mono text-xs sm:text-sm focus:outline-none shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]"
              />
            </div>

            <button 
              type="submit" 
              className="manga-btn w-full py-4 rounded-xl font-mono font-black text-xs sm:text-sm uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send size={16} />
              送信 // TRANSMIT DISPATCH NOW
            </button>
          </form>

          {contacts && contacts.length > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Radio size={14} className="text-amber-500 animate-pulse" />
                <h3 className="text-xs font-mono font-black uppercase tracking-widest opacity-80">
                  ENCRYPTED COMM CHANNELS // SALURAN FREKUENSI RESMI:
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {contacts.map((acc) => (
                  <a 
                    key={acc.id} 
                    href={acc.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="manga-btn px-4 py-2 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-950 font-mono text-xs flex items-center gap-2 text-zinc-950 dark:text-white"
                  >
                    <span className="font-black uppercase">{acc.platform}:</span>
                    <span className="opacity-80 font-normal">{acc.label}</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </AnimatedContent>

    </section>
  );
}