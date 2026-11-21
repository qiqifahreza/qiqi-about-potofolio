import { Sun, Moon } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import GooeyNav from "./GooeyNav";

const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar({
  activeSectionIdx,
  onSectionSelect,
}: {
  activeSectionIdx: number;
  onSectionSelect: (index: number) => void;
}) {
  const { isDark, toggleTheme, general } = usePortfolio();

  return (
    <>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
        <nav aria-label="Primary" className="pointer-events-auto mx-auto max-w-5xl">
          <div className="manga-panel relative flex h-14 items-center justify-between rounded-xl px-4 sm:px-6">
            <a href="/#beranda" className="flex shrink-0 items-center gap-2.5 focus-visible:outline-none">
              {general.navbarLogoUrl ? (
                <img
                  src={general.navbarLogoUrl}
                  alt="Logo"
                  className="size-8 rounded-lg border-2 border-black object-cover dark:border-white"
                />
              ) : (
                <span
                  className={`flex size-8 items-center justify-center rounded-lg border-2 text-xs font-mono font-black ${
                    isDark ? "border-white bg-white text-black" : "border-black bg-black text-white"
                  }`}
                >
                  &lt;&gt;
                </span>
              )}
              <span
                className={`font-mono text-base font-black uppercase tracking-wider transition-colors ${
                  isDark ? "text-white" : "text-zinc-950"
                }`}
              >
                {general.logoText || "Qiqi"}
              </span>
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              title={isDark ? "Ganti ke Mode Terang (Kertas Manga)" : "Ganti ke Mode Gelap (Tinta Noir)"}
              className={`inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 transition-all active:scale-95 ${
                isDark
                  ? "border-white/30 bg-zinc-900 text-amber-400 hover:border-white"
                  : "border-black bg-white text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </nav>
      </header>

      <GooeyNav
        items={MOBILE_NAV_ITEMS}
        initialActiveIndex={0}
        activeIndex={activeSectionIdx}
        theme={isDark ? "dark" : "light"}
        size="sm"
        frame
        particleCount={15}
        spread={18}
        animationTime={600}
        timeVariance={300}
        gooeyness={0.75}
        wobble={0.5}
        hoverEffect
        className="!fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-1/2 z-50 w-max !max-w-[calc(100vw-2rem)] -translate-x-1/2 lg:hidden"
        ariaLabel="Mobile navigation"
        onChange={(index) => onSectionSelect(index)}
      />
    </>
  );
}