import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "beranda", label: "Home", href: "/#beranda" },
  { id: "tentang", label: "About", href: "/#tentang" },
  { id: "projek", label: "Portfolio", href: "/#projek" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme, primaryColor, general } = usePortfolio();

  // Mobile drawer state
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opened = useRef<boolean>(false);

  // State untuk Liquid Glass Capsule Aktif
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window === 'undefined') return 'beranda';
    const hash = window.location.hash.replace('#', '');
    return NAV_ITEMS.find((n) => n.id === hash)?.id || 'beranda';
  });

  const ulRef = useRef<HTMLUListElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  const syncActiveIndicator = useCallback((targetId: string) => {
    if (!ulRef.current || !indicatorRef.current) return;

    const targetIndex = NAV_ITEMS.findIndex((item) => item.id === targetId);
    const targetElement = navLinksRef.current[targetIndex];

    if (!targetElement) return;

    const parentRect = ulRef.current.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    indicatorRef.current.style.left = `${targetRect.left - parentRect.left}px`;
    indicatorRef.current.style.width = `${targetRect.width}px`;
    indicatorRef.current.style.opacity = '1';
  }, []);

  useEffect(() => {
    syncActiveIndicator(activeTab);
  }, [activeTab, syncActiveIndicator]);

  useEffect(() => {
    const handleResize = () => {
      syncActiveIndicator(activeTab);
    };

    const raf = window.requestAnimationFrame(handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab, syncActiveIndicator]);

  // ScrollSpy Otomatis
  const handleScroll = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    const hashMatch = NAV_ITEMS.find((item) => item.id === hash);

    if (hashMatch) {
      setActiveTab((current) => (current === hashMatch.id ? current : hashMatch.id));
      return;
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
      setActiveTab((current) => (current === 'contact' ? current : 'contact'));
      return;
    }

    const scrollPosition = window.scrollY + 220;
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      const section = document.getElementById(NAV_ITEMS[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        const nextTab = NAV_ITEMS[i].id;
        setActiveTab((current) => (current === nextTab ? current : nextTab));
        break;
      }
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const match = NAV_ITEMS.find((item) => item.id === hash);
      if (match) {
        setActiveTab((current) => (current === match.id ? current : match.id));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleScroll]);

  // Focus trap untuk mobile drawer
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    if (open) {
      closeRef.current?.focus();
    } else if (opened.current) {
      toggleRef.current?.focus();
    }
    opened.current = open || opened.current;

    if (!open) return undefined;

    const wide = window.matchMedia("(min-width: 48rem)");
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
    } else if (event.key === "Tab" && menuRef.current) {
      const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a[href], button"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 pointer-events-none">
      <nav id="nav-capsule" aria-label="Main" onKeyDown={onKeyDown} className="mx-auto max-w-4xl pointer-events-auto">
        <div className="relative flex h-14 items-center gap-2 pr-2 pl-4 sm:pl-5 liquid-glass rounded-[28px]">
          {/* Background Kapsul Induk */}
          <span className="absolute inset-0 -z-20 rounded-[28px] bg-transparent" />

          {/* Logo / Brand Navbar */}
          <a 
            href="/#beranda" 
            className="mr-3 flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 dark:focus-visible:outline-zinc-50"
          >
            {general.navbarLogoUrl ? (
              <img 
                src={general.navbarLogoUrl} 
                alt="Logo" 
                className="h-7 w-auto max-w-[110px] object-contain rounded-md" 
              />
            ) : (
              <>
                <span 
                  className="flex size-7 items-center justify-center rounded-full text-white text-xs font-mono font-bold shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  &lt;&gt;
                </span>
                <span className="text-[15px] font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                  {general.logoText || "Rifki"}
                </span>
              </>
            )}
          </a>

          {/* Navigasi Desktop */}
          <div 
            ref={menuRef} 
            id="nav-capsule-menu" 
            role={open ? "dialog" : undefined}
            aria-modal={open ? true : undefined}
            aria-label={open ? "Menu" : undefined}
            className={`max-md:fixed max-md:top-2 max-md:right-2 max-md:bottom-2 max-md:z-50 max-md:w-[calc(100vw-1rem)] max-md:max-w-sm max-md:flex-col max-md:overflow-y-auto max-md:rounded-3xl max-md:p-4 max-md:shadow-2xl max-md:ring-1 max-md:ring-neutral-950/10 dark:max-md:ring-neutral-800 md:mx-auto md:flex md:rounded-[26px] liquid-glass ${
              open ? "max-md:flex" : "max-md:hidden"
            }`}
          >
            {/* Header Drawer Mobile */}
            <div className="flex h-14 shrink-0 items-center justify-between gap-4 px-2 md:hidden">
              <span aria-hidden="true" className="flex items-center gap-2">
                <span 
                  className="flex size-7 items-center justify-center rounded-full text-white text-xs font-mono font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  &lt;&gt;
                </span>
                <span className="text-[15px] font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                  {general.logoText || "Rifki"}
                </span>
              </span>

              <button 
                ref={closeRef} 
                type="button" 
                onClick={() => setOpen(false)} 
                aria-label="Close menu" 
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-neutral-950 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* List Menu Items */}
            <ul 
              ref={ulRef}
              className="relative flex flex-col gap-1 px-1 pb-3 md:flex-row md:items-center md:p-0"
            >
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-8 rounded-xl pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-lg overflow-hidden ${
                  isDark 
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.35)]' 
                    : 'bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                }`}
                style={{
                  left: '0px',
                  width: '0px',
                  opacity: 0,
                }}
              >
                <span 
                  className="absolute inset-x-0 top-0 h-[45%] rounded-t-full pointer-events-none opacity-40"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)' 
                      : 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                  }}
                />
              </span>

              {NAV_ITEMS.map((item, idx) => {
  const isActive = activeTab === item.id;

  return (
    <li key={item.id} className="z-10">
      <a
        ref={(el) => {
          navLinksRef.current[idx] = el;
        }}
        href={item.href}
        onClick={() => {
          setActiveTab(item.id);
          window.history.replaceState(null, '', item.href);
          setOpen(false);
          requestAnimationFrame(() => syncActiveIndicator(item.id));
        }}
        className={`relative z-10 flex items-center font-medium transition-all duration-200 ease-out cursor-pointer select-none max-md:rounded-xl max-md:px-3 max-md:py-2.5 max-md:text-base md:h-8 md:rounded-xl md:px-3.5 md:text-xs md:uppercase md:tracking-wider md:whitespace-nowrap ${
          isActive
            ? (isDark ? "text-black font-extrabold" : "text-white font-extrabold")
            : "text-neutral-500 hover:text-neutral-900 hover:scale-[1.02] dark:text-neutral-400 dark:hover:text-white"
        }`}
      >
        {item.label}
      </a>
    </li>
  );
})}
            </ul>
          </div>

          {/* Tombol Sun/Moon Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Ganti ke Mode Siang" : "Ganti ke Mode Malam"}
            className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-950 transition-colors duration-150 hover:bg-neutral-950/5 max-md:ml-auto dark:text-neutral-50 dark:hover:bg-neutral-800"
          >
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
          </button>

          {/* Action CTA Button Kapsul */}
          <a 
  href="/#contact" 
  className={`group hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 shadow-md ${
    isDark 
      ? 'bg-white text-black hover:bg-neutral-200' 
      : 'bg-black text-white hover:bg-neutral-800'
  }`}
>
  Let's Talk
  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
</a>

          {/* Hamburger Menu Mobile */}
          <button 
            ref={toggleRef} 
            type="button" 
            onClick={() => setOpen(true)} 
            aria-label="Menu" 
            aria-expanded={open ? "true" : "false"} 
            className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-950 transition-colors duration-150 hover:bg-neutral-950/5 md:hidden dark:text-neutral-50 dark:hover:bg-neutral-800"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>

        {/* Backdrop Scrim */}
        <div 
          id="nav-capsule-scrim" 
          hidden={!open} 
          onClick={() => setOpen(false)} 
          className="fixed inset-0 z-30 bg-neutral-950/50 backdrop-blur-xs md:hidden"
        />
      </nav>
    </header>
  );
}