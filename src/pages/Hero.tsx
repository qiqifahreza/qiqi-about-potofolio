import { Fragment, useCallback, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import LogoLoop from '../components/LogoLoop';
import HalftoneReveal from '../components/HalftoneReveal';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};
// Keep this helper outside the component for the React Compiler.
function buildTypeLines(text: string) {
  let cursor = 0;
  return text.split('\n').map((line) => {
    const words = line.split(' ');
    return words.map((word, wordIdx) => {
      const charItems = word.split('').map((char) => ({
        char,
        idx: cursor++,
      }));
      if (wordIdx < words.length - 1) {
        cursor++; // Count the space between words.
      }
      return charItems;
    });
  });
}

function TypeChars({
  text,
  start,
  end,
  className = '',
}: {
  text: string;
  start: number;
  end: number;
  className?: string;
}) {
  if (!text) return null;

  const totalChars = text.replace(/\n/g, '').length;
  const duration = end - start;
  const step = totalChars > 0 ? duration / totalChars : 0;
  const parsedLines = buildTypeLines(text);


  return (
    <span className={className}>
      {parsedLines.map((words, lineIdx) => (
        <Fragment key={lineIdx}>
          {words.map((charItems, wordIdx) => (
            <Fragment key={wordIdx}>
              <span className="inline-block whitespace-nowrap">
                {charItems.map((item, charIdx) => {
                  const cStart = start + item.idx * step;
                  const cEnd = Math.min(cStart + Math.max(step * 1.2, 0.015), end + 0.015);
                  return (
                    <span
                      key={charIdx}
                      data-type-char="true"
                      data-start={cStart}
                      data-end={cEnd}
                      style={{
                        display: 'inline-block',
                        opacity: 0,
                        transform: 'translate3d(0, 8px, 0)',
                        willChange: 'opacity, transform',
                      }}
                    >
                      {item.char}
                    </span>
                  );
                })}
              </span>
              {wordIdx < words.length - 1 && ' '}
            </Fragment>
          ))}
          {lineIdx < parsedLines.length - 1 && <br />}
        </Fragment>
      ))}
    </span>
  );
}

export default function Hero() {
  const { general, personal, isDark, techLogos } = usePortfolio();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const innerScaleRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const charNodesRef = useRef<HTMLElement[]>([]);
  const boxNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  const config = {
    startRadius: 12,
    endRadius: 8,
    mediaZoom: 1.08,
    scrollDistance: 1.25,
    holdDistance: 0.25,
    smoothing: 0.1,
  };

  useEffect(() => {
    if (frameRef.current) {
      charNodesRef.current = Array.from(
        frameRef.current.querySelectorAll<HTMLElement>('[data-type-char="true"]')
      );
    }
  }, [general, personal]);

  const applyProgress = useCallback(
    (p: number) => {
      const frame = frameRef.current;
      const border = borderRef.current;
      const inner = innerScaleRef.current;
      if (!frame || !inner) return;

      const boxProgress = clamp(p / 0.35, 0, 1);
      const e = smoothstep(0, 1, boxProgress);

      const isMobile = window.innerWidth < 640;
      const startW = isMobile ? 76 : 44;
      const startH = isMobile ? 60 : 62;

      const w = startW + (100 - startW) * e;
      const h = startH + (100 - startH) * e;
      const ix = Math.max(0, (100 - w) / 2);
      const iy = Math.max(0, (100 - h) / 2);
      const r = config.startRadius + (config.endRadius - config.startRadius) * e;

      frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

      if (border) {
        border.style.top = `${iy}%`;
        border.style.right = `${ix}%`;
        border.style.bottom = `${iy}%`;
        border.style.left = `${ix}%`;
        border.style.borderRadius = `${r}px`;
      }

      const currentScale = config.mediaZoom + (1 - config.mediaZoom) * e;
      inner.style.transform = `scale(${currentScale})`;

      charNodesRef.current.forEach((el) => {
        const s = Number(el.dataset.start || 0);
        const end = Number(el.dataset.end || 1);
        const localP = clamp((p - s) / (end - s || 0.001), 0, 1);
        el.style.opacity = `${localP}`;
        el.style.transform = `translate3d(0, ${8 * (1 - localP)}px, 0)`;
      });

      const boxContainersOpacity = smoothstep(0.28, 0.45, p);
      boxNodesRef.current.forEach((el) => {
        if (el) el.style.opacity = `${boxContainersOpacity}`;
      });

      if (hintRef.current) {
        const gone = smoothstep(0, 0.12, p);
        hintRef.current.style.opacity = `${1 - gone}`;
        hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
      }
    },
    [config.endRadius, config.mediaZoom, config.startRadius]
  );

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      stageH = window.innerHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + config.scrollDistance + config.holdDistance)}px`;
      ScrollTrigger.refresh();
    };

    const readProgress = () => {
      if (reduceMotion) return 1;
      const span = stageH * Math.max(0.01, config.scrollDistance);
      const top = track.getBoundingClientRect().top;
      return clamp(-top / span, 0, 1);
    };

    const tick = () => {
      const k = config.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * config.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (config.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.documentElement);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, config.holdDistance, config.scrollDistance, config.smoothing]);

  const bigText = general.heroBigText || 'RIFKI';

  return (
    <section id="beranda" className="relative w-full select-none">
      <div ref={trackRef} className="relative w-full">
        
        <div
          ref={stageRef}
          className="sticky top-0 w-full flex items-center justify-center pt-20 pb-4 sm:pb-8 px-2.5 sm:px-6 overflow-hidden z-10"
        >
          <div className="relative w-full max-w-[1380px] h-[85vh] min-h-[600px] sm:min-h-[640px] max-h-[820px]">
            
            <div
              ref={frameRef}
              className={`absolute inset-0 overflow-hidden shadow-2xl transition-colors ${
                isDark
                  ? 'bg-zinc-950/65 text-white backdrop-blur-[2px]'
                  : 'bg-[#fafafc]/80 text-zinc-950 backdrop-blur-[2px]'
              }`}
              style={{
                clipPath: 'inset(19% 28% 19% 28% round 32px)',
                willChange: 'clip-path',
              }}
            >
              <div
                ref={innerScaleRef}
                className="w-full h-full p-4 sm:p-8 lg:p-10 flex flex-col justify-between origin-center [will-change:transform]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2.5 sm:gap-4 z-30">
                  
                  <div className="flex items-start gap-3 max-w-full sm:max-w-md">
                    <div
                      ref={(el) => { boxNodesRef.current[0] = el; }}
                      style={{ opacity: 0 }}
                      className={`flex flex-col items-center border px-2 sm:px-3 py-1 sm:py-1.5 shrink-0 ${isDark ? 'border-white' : 'border-zinc-900'}`}
                    >
                      <span className="text-[10px] sm:text-xs font-black tracking-widest font-mono leading-none uppercase">
                        <TypeChars text={personal.nickname || general.logoText || 'QIQI'} start={0.32} end={0.42} />
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono leading-none mt-1 opacity-70">
                        <TypeChars text={general.badgeText || 'DEV 2026'} start={0.36} end={0.46} />
                      </span>
                      <div className={`w-full text-[7px] sm:text-[8px] font-mono text-center px-1.5 mt-1 font-bold tracking-tighter ${
                        isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
                      }`}>
                        <TypeChars text="PROFILE" start={0.40} end={0.48} />
                      </div>
                    </div>

                    <div className="leading-snug min-w-0">
                      <h2 className="text-[10px] sm:text-xs font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono">
                        <TypeChars text={general.jikosoukaiTitle || 'JIKOSOUKAI'} start={0.35} end={0.48} />
                      </h2>
                      {general.heroIntro && (
                        <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 italic font-serif opacity-80 leading-relaxed">
                          <TypeChars text={general.heroIntro} start={0.40} end={0.68} />
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto sm:max-w-[260px] gap-2 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-white/10 dark:border-white/10 border-black/10">
                    <div
                      ref={(el) => { boxNodesRef.current[1] = el; }}
                      style={{ opacity: 0 }}
                      className="w-32 sm:w-full h-6 sm:h-8 sm:mb-2 flex items-center sm:justify-end shrink-0"
                    >
                      <LogoLoop
                        logos={techLogos || []}
                        speed={22}
                        direction="left"
                        logoHeight={18}
                        gap={16}
                        fadeOut
                        className="w-full"
                      />
                    </div>

                    <div className="text-right min-w-0">
                      <p className="text-[10px] sm:text-xs italic font-serif tracking-wider opacity-80">
                        <TypeChars text={general.heroMetaText || `${personal.nickname || 'Qiqi'}.09-01-2006`} start={0.44} end={0.58} />
                      </p>
                      {personal.name && (
                        <p className="text-[9px] sm:text-[11px] font-mono tracking-tight opacity-60 uppercase mt-0.5 truncate">
                          <TypeChars text={`Project By ${personal.name}`} start={0.48} end={0.66} />
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative flex-1 flex items-center justify-center my-auto min-h-[210px] sm:min-h-[300px]">
                  
                  {general.heroKatakana && (
                    <div
                      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                      className="absolute top-1 sm:top-[6%] left-1 sm:left-10 z-10 text-lg sm:text-3xl lg:text-4xl font-light tracking-[0.22em] sm:tracking-[0.35em] opacity-80"
                    >
                      <TypeChars text={general.heroKatakana} start={0.28} end={0.46} />
                    </div>
                  )}

                  {bigText && (
                    <div className="absolute inset-0 flex items-center justify-between w-full pointer-events-none z-10">
                      <h1
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="w-full text-center text-[17vw] sm:text-[17vw] font-normal tracking-[0.08em] sm:tracking-[0.14em] flex justify-between leading-none opacity-95 select-none"
                      >
                        {bigText.split('').map((char, index) => {
                          const total = bigText.length;
                          const cStart = 0.24 + (index / total) * 0.20;
                          const cEnd = cStart + 0.06;
                          return (
                            <span
                              key={index}
                              data-type-char="true"
                              data-start={cStart}
                              data-end={cEnd}
                              style={{
                                display: 'inline-block',
                                opacity: 0,
                                transform: 'translate3d(0, 18px, 0)',
                                willChange: 'opacity, transform',
                              }}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </h1>
                    </div>
                  )}

                  {general.heroImageUrl && (
                    <div className="relative z-20 h-[34vh] sm:h-[52vh] lg:h-[58vh] flex items-end justify-center pointer-events-none translate-y-2 sm:translate-y-8 lg:translate-y-12">
{general.heroImageUrl && (
  <div className="relative z-20 w-[240px] sm:w-[320px] lg:w-[380px] h-[34vh] sm:h-[52vh] lg:h-[58vh] flex items-end justify-center pointer-events-auto translate-y-2 sm:translate-y-8 lg:translate-y-12">
    <HalftoneReveal
      src={general.heroImageUrl}
      mode="color"
      shape="diamond"
      cellSize={3}
      angle={50}
      inkColor={isDark ? '#f4f1ea' : '#120f17'}
      paperColor={isDark ? '#000000' : '#ffffff'}
      accentColor={isDark ? '#1d1817' : '#52525b'}
      revealRadius={130}
      dotScale={1}
      contrast={1.4}
      brightness={-0.05}
      invert={false}
      roughness={0.5}
      misregistration={0.35}
      fit="contain"
      softness={0.6}
      linger={2.1}
      reverse={false}
      wander
      clickBurst
      intro
      transparentBg
      className="w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
    />
  </div>
)}
                    </div>
                  )}

                  {general.heroSignature && (
                    <div
                      style={{ fontFamily: "'Alex Brush', cursive" }}
                      className={`absolute bottom-0 sm:bottom-[6%] right-2 sm:right-[16%] z-30 text-4xl sm:text-7xl lg:text-8xl rotate-[-5deg] drop-shadow-md select-none ${
                        isDark ? 'text-white/90' : 'text-zinc-900/90'
                      }`}
                    >
                      <TypeChars text={general.heroSignature} start={0.55} end={0.76} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 z-30 pt-2 sm:pt-4 relative">
                  <div className="max-w-full sm:max-w-sm">
                    {general.currentStatusTitle && (
                      <h3
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="text-sm sm:text-lg font-bold italic tracking-wide flex items-center gap-1.5"
                      >
                        <TypeChars text={general.currentStatusTitle} start={0.58} end={0.70} />
                      </h3>
                    )}
                    {general.heroDescription && (
                      <p className="text-[10px] sm:text-xs opacity-75 font-sans leading-relaxed mt-0.5 sm:mt-1">
                        <TypeChars
                          text={general.heroDescription}
                          start={0.62}
                          end={0.88}
                        />
                      </p>
                    )}
                  </div>

                  <div className="w-full sm:w-auto text-left sm:text-right sm:max-w-md sm:pr-10">
                    {general.heroQuote && (
                      <>
                        <h4
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          className="text-xs sm:text-base font-bold"
                        >
                          <TypeChars text="The Question Is:" start={0.62} end={0.74} />
                        </h4>
                        <p className="text-[10px] sm:text-xs italic mt-0.5 opacity-85">
                          &ldquo;<TypeChars text={general.heroQuote} start={0.68} end={0.92} />&rdquo;
                        </p>
                      </>
                    )}
                    {general.heroQuoteAuthor && (
                      <span className="text-[9px] sm:text-[10px] font-mono opacity-60 block mt-0.5 sm:mt-1">
                        <TypeChars text={general.heroQuoteAuthor} start={0.80} end={0.96} />
                      </span>
                    )}
                  </div>

                  <div
                    ref={(el) => { boxNodesRef.current[2] = el; }}
                    style={{ opacity: 0 }}
                    className="hidden sm:flex absolute right-0 sm:right-2 bottom-2 flex-col items-center gap-2 pointer-events-none"
                  >
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] rotate-90 opacity-40">
                      SCROLL
                    </span>
                    <div className={`w-[1px] h-10 mt-3 ${isDark ? 'bg-white/40' : 'bg-zinc-400'}`} />
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={borderRef}
              aria-hidden="true"
              className={`pointer-events-none absolute border-2 ${
  isDark
    ? 'border-white/80 shadow-[8px_8px_0px_rgba(255,255,255,0.2)]'
    : 'border-zinc-950 shadow-[8px_8px_0px_#09090b]'
}`}
              style={{
                top: '19%',
                right: '28%',
                bottom: '19%',
                left: '28%',
                borderRadius: '32px',
              }}
            />

          </div>

          <div
            ref={hintRef}
            className={`absolute bottom-4 sm:bottom-5 inset-x-0 text-center text-[11px] sm:text-xs font-mono tracking-widest uppercase pointer-events-none ${
              isDark ? 'text-white/50' : 'text-zinc-600/70'
            }`}
          >
            Scroll ke bawah ↓
          </div>

        </div>
      </div>
    </section>
  );
}