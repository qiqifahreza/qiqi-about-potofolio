import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sun, Moon, ArrowRight, Home, User, FolderGit2, Mail } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "beranda", label: "Home", href: "/#beranda", icon: Home },
  { id: "tentang", label: "About", href: "/#tentang", icon: User },
  { id: "projek", label: "Portfolio", href: "/#projek", icon: FolderGit2 },
  { id: "contact", label: "Contact", href: "/#contact", icon: Mail },
];

export default function Navbar() {
  const { isDark, toggleTheme, general } = usePortfolio();

  // Mobile drawer state
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opened = useRef<boolean>(false);

  // State untuk Tab Aktif
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window === "undefined") return "beranda";
    const hash = window.location.hash.replace("#", "");
    return NAV_ITEMS.find((n) => n.id === hash)?.id || "beranda";
  });

  const [isWobbling, setIsWobbling] = useState(false);

  const ulRef = useRef<HTMLUListElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  // Sinkronisasi posisi kapsul air
  const syncActiveIndicator = useCallback((targetId: string) => {
    if (!ulRef.current || !indicatorRef.current) return;

    const targetIndex = NAV_ITEMS.findIndex((item) => item.id === targetId);
    const targetElement = navLinksRef.current[targetIndex];

    if (!targetElement) return;

    const parentRect = ulRef.current.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    indicatorRef.current.style.left = `${targetRect.left - parentRect.left}px`;
    indicatorRef.current.style.width = `${targetRect.width}px`;
    indicatorRef.current.style.opacity = "1";

    // Memicu efek getaran air (liquid jelly wobble)
    setIsWobbling(true);
    const timer = setTimeout(() => setIsWobbling(false), 550);
    return () => clearTimeout(timer);
  }, []);

  // Update indikator saat activeTab berubah
  useEffect(() => {
    syncActiveIndicator(activeTab);
  }, [activeTab, syncActiveIndicator]);

  // Recalculate saat resize layar
  useEffect(() => {
    const handleResize = () => {
      syncActiveIndicator(activeTab);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, syncActiveIndicator]);

  // ScrollSpy Otomatis
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 75) {
      setActiveTab("contact");
      return;
    }

    const threshold = 240;
    let currentSection = NAV_ITEMS[0].id;

    for (const item of NAV_ITEMS) {
      const section = document.getElementById(item.id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= threshold) {
          currentSection = item.id;
        }
      }
    }

    setActiveTab(currentSection);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const match = NAV_ITEMS.find((item) => item.id === hash);
      if (match) {
        setActiveTab(match.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
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
        <div className="relative flex h-14 items-center gap-2 pr-2 pl-4 sm:pl-5 rounded-[28px] glass-panel shadow-xl">
          
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
                  className={`flex size-7 items-center justify-center rounded-full text-xs font-mono font-bold shadow-sm ${
                    isDark ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
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
            className={`max-md:fixed max-md:top-2 max-md:right-2 max-md:bottom-2 max-md:z-50 max-md:w-[calc(100vw-1rem)] max-md:max-w-sm max-md:flex-col max-md:overflow-y-auto max-md:rounded-3xl max-md:p-4 max-md:shadow-2xl max-md:bg-white dark:max-md:bg-neutral-900 border border-black/10 dark:border-white/10 md:mx-auto md:flex md:rounded-[26px] ${
              open ? "max-md:flex" : "max-md:hidden"
            }`}
          >
            {/* Header Drawer Mobile */}
            <div className="flex h-14 shrink-0 items-center justify-between gap-4 px-2 md:hidden">
              <span aria-hidden="true" className="flex items-center gap-2">
                <span 
                  className={`flex size-7 items-center justify-center rounded-full text-xs font-mono font-bold ${
                    isDark ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
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

            {/* List Menu Items dengan Liquid Glass Capsule */}
            <ul 
              ref={ulRef}
              className="relative flex flex-col gap-1 px-1 pb-3 md:flex-row md:items-center md:p-0"
            >
              {/* ================= LIQUID WATER DROPLET BUBBLE INDICATOR ================= */}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-9 rounded-full pointer-events-none z-0 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,1.4,0.45,1)] ${
                  isWobbling ? 'animate-liquid-jelly' : ''
                }`}
                style={{
                  left: "0px",
                  width: "0px",
                  opacity: 0,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  background: isDark
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08))"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 253, 250, 0.75))",
                  border: isDark
                    ? "1.5px solid rgba(255, 255, 255, 0.35)"
                    : "1.5px solid rgba(204, 251, 241, 0.85)",
                  boxShadow: isDark
                    ? "inset 0 2px 4px rgba(255, 255, 255, 0.45), inset 0 -2px 6px rgba(0, 0, 0, 0.3), 0 8px 24px -2px rgba(0, 0, 0, 0.6)"
                    : "inset 0 2.5px 5px rgba(255, 255, 255, 0.95), inset 0 -2px 6px rgba(45, 212, 191, 0.25), 0 8px 20px -3px rgba(45, 212, 191, 0.3), 0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Pantulan Cahaya Lengkung Cembung Kaca Air (Specular Highlight) */}
                <span 
                  className="absolute inset-x-0 top-0 h-[48%] rounded-t-full pointer-events-none"
                  style={{
                    background: isDark
                      ? "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.08) 70%, transparent 100%)"
                      : "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.2) 70%, transparent 100%)",
                  }}
                />
              </span>

              {/* Tautan Menu dengan Ikon Interaktif */}
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;

                return (
                  <li key={item.id} className="z-10">
                    <a
                      ref={(el) => {
                        navLinksRef.current[idx] = el;
                      }}
                      href={item.href}
                      onClick={() => {
                        setActiveTab(item.id);
                        setOpen(false);
                        requestAnimationFrame(() => syncActiveIndicator(item.id));
                      }}
                      className={`relative z-10 flex items-center gap-1.5 font-medium transition-all duration-300 ease-out cursor-pointer select-none max-md:rounded-xl max-md:px-3.5 max-md:py-2.5 max-md:text-sm md:h-9 md:rounded-full md:px-4 md:text-xs md:whitespace-nowrap ${
                        isActive
                          ? (isDark 
                              ? "text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] max-md:bg-white/10" 
                              : "text-zinc-900 font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] max-md:bg-zinc-100")
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white max-md:hover:bg-neutral-100 dark:max-md:hover:bg-neutral-800"
                      }`}
                    >
                      {/* Icon dengan Animasi Membal Saat Aktif */}
                      <span className={`transition-transform duration-300 ${isActive ? 'scale-115 -translate-y-0.5 text-teal-500 dark:text-cyan-400' : 'opacity-70'}`}>
                        <IconComponent size={14} />
                      </span>
                      <span>{item.label}</span>
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

          {/* Tombol CTA Kapsul */}
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