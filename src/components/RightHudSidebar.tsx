import { useEffect, useState } from 'react';
import { ArrowUp, Mail, Globe, Phone } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon, LinkedinIcon } from './Icons';

// Local Instagram icon; lucide-react does not include this mark.
function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function RightHudSidebar() {
  const { isDark, contacts } = usePortfolio();

  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const [scrollPercent, setScrollPercent] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const current = window.scrollY;
      const pct = Math.min(Math.max(Math.round((current / totalScroll) * 100), 0), 100);
      setScrollPercent(pct);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('git')) return <GithubIcon className="w-3.5 h-3.5 fill-current" />;
    if (p.includes('link')) return <LinkedinIcon className="w-3.5 h-3.5 fill-current" />;
    if (p.includes('mail') || p.includes('email')) return <Mail size={14} />;
    if (p.includes('insta')) return <InstagramIcon className="w-3.5 h-3.5" />;
    if (p.includes('wa') || p.includes('phone') || p.includes('tele')) return <Phone size={14} />;
    return <Globe size={14} />;
  };

  return (
    <aside
      aria-label="Manga HUD Telemetry"
      className="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center justify-between h-[68vh] max-h-[580px] select-none pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span
          className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-widest border ${
            isDark
              ? 'border-white/20 bg-zinc-950/80 text-white shadow-[2px_2px_0px_#fff]'
              : 'border-black bg-white text-black shadow-[2px_2px_0px_#000]'
          }`}
        >
          GRESIK // ID
        </span>
        <span className="font-mono text-[10px] font-bold tracking-wider opacity-60">
          {timeStr || '00:00:00'} WIB
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-mono tracking-widest uppercase opacity-40">
            SYNC: OK
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 my-auto">
        <span className="text-[9px] font-['Noto_Sans_JP',sans-serif] font-bold opacity-50 tracking-widest">
          進行度
        </span>

        <div
          className={`relative w-[3px] h-32 rounded-full overflow-hidden ${
            isDark ? 'bg-white/15' : 'bg-black/15'
          }`}
        >
          <div
            className={`w-full rounded-full transition-all duration-150 ${
              isDark ? 'bg-white' : 'bg-black'
            }`}
            style={{ height: `${scrollPercent}%` }}
          />
        </div>

        <span className="font-mono text-[10px] font-black tracking-tight">
          {String(scrollPercent).padStart(2, '0')}%
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          {contacts && contacts.length > 0 ? (
            contacts.slice(0, 4).map((acc) => (
              <a
                key={acc.id}
                href={
                  acc.url.startsWith('http') || acc.url.startsWith('mailto:')
                    ? acc.url
                    : `https://${acc.url}`
                }
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border transition-all hover:-translate-x-1 ${
                  isDark
                    ? 'border-white/20 bg-zinc-950/70 hover:border-white text-white shadow-[2px_2px_0px_#ffffff]'
                    : 'border-black/30 bg-white hover:border-black text-black shadow-[2px_2px_0px_#000000]'
                }`}
                title={`${acc.platform}: ${acc.label}`}
                aria-label={acc.platform}
              >
                {renderSocialIcon(acc.platform)}
              </a>
            ))
          ) : (
            <a
              href="#contact"
              className={`p-2 rounded-lg border text-xs font-mono opacity-50 hover:opacity-100 ${
                isDark ? 'border-white/20 text-white' : 'border-black/20 text-black'
              }`}
              title="Isi kontak di Admin"
            >
              <Mail size={14} />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className={`manga-btn flex flex-col items-center justify-center p-2 rounded-lg border-2 cursor-pointer mt-1 ${
            isDark ? 'bg-white text-black' : 'bg-black text-white'
          }`}
          title="Kembali ke Atas"
          aria-label="Kembali ke Atas"
        >
          <ArrowUp size={13} strokeWidth={2.8} />
          <span className="text-[8px] font-mono font-black leading-none mt-0.5">
            TOP
          </span>
        </button>
      </div>
    </aside>
  );
}