import { FileText, Code2, GraduationCap, Briefcase, Sparkles, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ProfileCard from '../components/ProfileCard';
import AnimatedContent from '../components/AnimatedContent';

export default function About() {
  const { isDark, personal, general } = usePortfolio();

  const themeTitle = isDark ? 'text-white' : 'text-zinc-950';
  const themeBody = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <section id="tentang" className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      
      {/* ================= WATERMARK ONOMATOPOEIA MANGA (SFX) ================= */}
      <div className="absolute top-8 right-4 pointer-events-none opacity-[0.05] dark:opacity-[0.06] text-7xl sm:text-9xl font-black font-['Noto_Sans_JP',sans-serif] tracking-widest leading-none">
        シャッ
      </div>
      <div className="absolute bottom-16 left-2 pointer-events-none opacity-[0.05] dark:opacity-[0.06] text-7xl sm:text-9xl font-black font-['Noto_Sans_JP',sans-serif] tracking-widest leading-none">
        ズバッ
      </div>

      {/* ================= HEADER BAB MANGA ================= */}
      <AnimatedContent
        distance={40}
        duration={0.7}
        blur={3}
        threshold={0.12}
        className="text-center mb-16 sm:mb-20 w-full relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[11px] font-mono font-black uppercase tracking-[0.25em] border-2 border-black dark:border-white bg-white dark:bg-zinc-950 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
          <Sparkles size={13} className="text-amber-500 animate-pulse" />
          <span>巻の一 // CHAPTER 01 • CHARACTER DOSSIER</span>
        </div>

        <div className="relative inline-block">
          <h2 className={`text-3xl sm:text-6xl font-black tracking-tight font-mono uppercase ${themeTitle}`}>
            ABOUT THE DEVELOPER
          </h2>
          <p className="text-xs sm:text-sm font-['Noto_Sans_JP',sans-serif] font-bold tracking-[0.35em] mt-1 opacity-70">
            人物調書 • 経歴目録 • 能力概要
          </p>

          {/* Stempel Karakter Manga (Verified Profile Stamp) */}
          <div className="absolute -top-6 -right-6 sm:-right-10 rotate-12 border-2 border-rose-600 text-rose-600 px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase opacity-90 shadow-xs pointer-events-none">
            [ 認 • VERIFIED ID ]
          </div>
        </div>
      </AnimatedContent>

      {/* ================= MANGA MAIN CHARACTER PANEL (GRID 3 KOLOM) ================= */}
      <AnimatedContent
        distance={60}
        duration={0.85}
        scale={0.96}
        stagger={0.14}
        threshold={0.12}
        className="w-full mb-16 sm:mb-20"
      >
        <div className="w-full rounded-2xl border-2 border-black dark:border-white bg-white/80 dark:bg-zinc-900/80 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] p-6 sm:p-10 relative overflow-hidden">
          
          {/* Registration Crop Marks */}
          <span className="absolute top-2 left-2 text-[10px] font-mono opacity-30 select-none">⌜</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono opacity-30 select-none">⌝</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-30 select-none">⌞</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono opacity-30 select-none">⌟</span>

          {/* Strip Header Panel */}
          <div className="flex items-center justify-between pb-3 mb-8 border-b-2 border-black/10 dark:border-white/15 text-xs font-mono">
            <span className="font-black flex items-center gap-1.5 uppercase">
              <BookOpen size={14} className="text-cyan-500" />
              STATUS FILE // IDENTITAS KARAKTER
            </span>
            <span className="font-bold opacity-60">CLOUDSYNC: OK</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Kolom Kiri: Sapaan, Nama Karakter, & Tombol CV */}
            <div className="lg:col-span-4 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-block text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 border border-black dark:border-white mb-2">
                DESIGNATION //
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight opacity-70 mb-1">
                {personal.greeting || "Hi, I'm"}
              </h3>

              <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 font-mono uppercase ${themeTitle}`}>
                {personal.name || "Mochamad Rifki Al Farizi"}
              </h1>

              <div className="text-xs font-mono font-bold uppercase tracking-wider opacity-60 mb-6">
                ROLE: {personal.role || "Software Engineer & Creative Dev"}
              </div>

              {personal.cvUrl && (
                <div>
                  <a 
                    href={personal.cvUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="manga-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono font-black uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black cursor-pointer"
                  >
                    <FileText size={16} />
                    UNDUH CV DOKUMEN
                  </a>
                </div>
              )}
            </div>

            {/* Kolom Tengah: 3D Hologram ProfileCard */}
            <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2">
              <div className="relative">
                <ProfileCard
                  name={personal.name}
                  title={general.heroQuote}
                  handle={general.logoText || "Qiqi"}
                  status="Active"
                  contactText="Contact"
                  avatarUrl={personal.aboutImageUrl}
                  holo={0.8}
                  glare={0.5}
                  tiltStrength={12}
                  parallax={0}
                  radius={16}
                  enableTilt
                  intro
                  showUserInfo
                  enableMobileTilt={false}
                  theme={isDark ? "dark" : "light"}
                  onContactClick={() => window.location.href = '#contact'}
                />
              </div>
            </div>

            {/* Kolom Kanan: Narasi Monolog / Sinopsis Karakter */}
            <div className="lg:col-span-4 text-center lg:text-left order-3">
              <div className="p-4 rounded-xl border-2 border-dashed border-black/20 dark:border-white/20 bg-black/[0.02] dark:bg-white/[0.02] mb-6">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest block mb-2 opacity-60">
                  「 SYNOPSIS // 概要 」
                </span>
                <p className={`text-xs sm:text-sm leading-relaxed font-serif ${themeBody}`}>
                  {personal.bio || "Pengembang perangkat lunak yang berfokus pada arsitektur web modern, integrasi database scalable, dan pengalaman pengguna yang estetis."}
                </p>
              </div>

              <div>
                <a 
                  href="#projek" 
                  className="manga-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono font-black uppercase tracking-wider bg-white text-black dark:bg-zinc-900 dark:text-white cursor-pointer"
                >
                  <Code2 size={16} />
                  LIHAT KARYA PROJEK
                </a>
              </div>
            </div>

          </div>
        </div>
      </AnimatedContent>

      {/* ================= MANGA PROGRESSION ARCS (EDUCATION & EXPERIENCE) ================= */}
      <AnimatedContent
        distance={60}
        duration={0.85}
        stagger={0.18}
        threshold={0.12}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        
        {/* ================= PANEL ARC 1: EDUCATION ================= */}
        <div className="w-full rounded-2xl border-2 border-black dark:border-white bg-white/80 dark:bg-zinc-900/80 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-black/10 dark:border-white/15">
            <h2 className={`text-base sm:text-lg font-black font-mono uppercase flex items-center gap-2 ${themeTitle}`}>
              <GraduationCap size={18} className="text-cyan-500" />
              ARC_01 // 学歴の章 [EDUCATION]
            </h2>
            <span className="text-[10px] font-mono font-bold opacity-60">第01部</span>
          </div>

          <div className="space-y-6">
            {(personal.education || []).length > 0 ? (
              personal.education.map((edu, idx) => (
                <div 
                  key={edu.id || idx} 
                  className="relative pl-10 pb-6 border-l-2 border-dashed border-black/30 dark:border-white/30 last:border-transparent group"
                >
                  {/* Nomor Bab Bulat dengan Hard Shadow */}
                  <div 
                    className={`absolute -left-4 top-0 w-8 h-8 rounded-full border-2 border-black dark:border-white font-mono font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] ${
                      isDark ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className={`text-sm sm:text-base font-black font-mono uppercase ${themeTitle}`}>
                      {edu.institution}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border border-black dark:border-white bg-white dark:bg-zinc-950 self-start sm:self-auto shadow-xs">
                      {edu.period}
                    </span>
                  </div>

                  <div className={`text-xs sm:text-sm font-bold font-mono opacity-90 ${themeTitle}`}>
                    {edu.major}
                  </div>
                  <div className="text-[11px] font-serif italic opacity-70 mt-0.5">
                    {edu.subDetail}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs opacity-50 font-mono">Belum ada riwayat pendidikan yang ditambahkan.</p>
            )}
          </div>
        </div>

        {/* ================= PANEL ARC 2: EXPERIENCE ================= */}
        <div className="w-full rounded-2xl border-2 border-black dark:border-white bg-white/80 dark:bg-zinc-900/80 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-black/10 dark:border-white/15">
            <h2 className={`text-base sm:text-lg font-black font-mono uppercase flex items-center gap-2 ${themeTitle}`}>
              <Briefcase size={18} className="text-amber-500" />
              ARC_02 // 修業の章 [EXPERIENCE]
            </h2>
            <span className="text-[10px] font-mono font-bold opacity-60">第02部</span>
          </div>

          <div className="space-y-6">
            {(personal.experience || []).length > 0 ? (
              personal.experience.map((exp, idx) => (
                <div 
                  key={exp.id || idx} 
                  className="relative pl-10 pb-6 border-l-2 border-dashed border-black/30 dark:border-white/30 last:border-transparent group"
                >
                  <div 
                    className={`absolute -left-4 top-0 w-8 h-8 rounded-full border-2 border-black dark:border-white font-mono font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] ${
                      isDark ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className={`text-sm sm:text-base font-black font-mono uppercase ${themeTitle}`}>
                      {exp.company}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border border-black dark:border-white bg-white dark:bg-zinc-950 self-start sm:self-auto shadow-xs">
                      {exp.period}
                    </span>
                  </div>

                  <div className={`text-xs sm:text-sm font-bold font-mono opacity-90 ${themeTitle}`}>
                    {exp.role}
                  </div>
                  <div className="text-[11px] font-serif italic opacity-70 mt-0.5">
                    {exp.subDetail}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs opacity-50 font-mono">Belum ada riwayat pengalaman yang ditambahkan.</p>
            )}
          </div>
        </div>

      </AnimatedContent>

    </section>
  );
}