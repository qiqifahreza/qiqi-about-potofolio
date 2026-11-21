import React, { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const MOBILE_NAV_ITEMS = [
  { id: "beranda", label: "01. Home", href: "/#beranda" },
  { id: "tentang", label: "02. About", href: "/#tentang" },
  { id: "projek", label: "03. Portfolio", href: "/#projek" },
  { id: "contact", label: "04. Contact", href: "/#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme, general } = usePortfolio();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opened = useRef<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    if (open) closeRef.current?.focus();
    else if (opened.current) toggleRef.current?.focus();
    opened.current = open || opened.current;

    if (!open) return undefined;

    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", onWide);
    return () => {
      wide.removeEventListener("change", onWide);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [open]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 pointer-events-none">
      <nav aria-label="Main" onKeyDown={onKeyDown} className="mx-auto max-w-5xl pointer-events-auto">
        <div className="relative flex h-14 items-center justify-between px-4 sm:px-6 rounded-xl manga-panel">
          
          {/* KIRI: HANYA LOGO NAVBAR + TEKS QIQI */}
          <a 
            href="/#beranda" 
            className="flex shrink-0 items-center gap-2.5 focus-visible:outline-none"
          >
            {general.navbarLogoUrl ? (
              <img 
                src={general.navbarLogoUrl} 
                alt="Logo" 
                className="size-8 rounded-lg object-cover border-2 border-black dark:border-white" 
              />
            ) : (
              <span 
                className={`flex size-8 items-center justify-center rounded-lg text-xs font-mono font-black border-2 ${
                  isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                }`}
              >
                &lt;&gt;
              </span>
            )}
            {/* Ganti baris <span> teks Qiqi menjadi: */}
<span
  className={`text-base font-black uppercase tracking-wider font-mono transition-colors ${
    isDark ? 'text-white' : 'text-zinc-950'
  }`}
>
  {general.logoText || "Qiqi"}
</span>
          </a>

          {/* KANAN: TOMBOL SUN / MOON (+ Hamburger hanya di layar HP karena LineSidebar sembunyi di HP) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              title={isDark ? "Ganti ke Mode Terang (Kertas Manga)" : "Ganti ke Mode Gelap (Tinta Noir)"}
              className={`inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 transition-all active:scale-95 ${
                isDark 
                  ? 'border-white/30 bg-zinc-900 text-amber-400 hover:border-white' 
                  : 'border-black bg-white text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Menu Toggle Hanya Muncul di Layar < lg */}
            <button 
              ref={toggleRef} 
              type="button" 
              onClick={() => setOpen(true)} 
              aria-label="Menu" 
              className={`inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 lg:hidden ${
                isDark ? 'border-white/30 text-white' : 'border-black text-black'
              }`}
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Drawer Navigasi Khusus Mobile/Tablet (< lg) */}
        {open && (
          <>
            <div 
              onClick={() => setOpen(false)} 
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
            />
            <div 
              ref={menuRef}
              role="dialog"
              aria-modal={true}
              aria-label="Mobile Navigation"
              className="fixed top-4 right-4 left-4 z-50 rounded-2xl p-5 manga-panel lg:hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black/10 dark:border-white/15">
                <span className="font-mono font-black uppercase tracking-widest text-sm">
                  // MENU CHAPTER
                </span>
                <button 
                  ref={closeRef}
                  type="button" 
                  onClick={() => setOpen(false)}
                  className="px-2.5 py-1 rounded-lg border-2 border-black dark:border-white text-xs font-mono font-bold"
                >
                  TUTUP ✕
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {MOBILE_NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-xl font-mono font-black uppercase tracking-wider text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}