import { FileText, Code2, GraduationCap, Briefcase } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { isDark, primaryColor, personal } = usePortfolio();

  const themeTitle = isDark ? 'text-white' : 'text-zinc-900';
  const themeBody = isDark ? 'text-slate-300' : 'text-slate-700';
  const themeMuted = isDark ? 'text-zinc-400' : 'text-zinc-500';

  const getContrastTextColor = (hexColor: string) => {
    if (!hexColor) return isDark ? '#ffffff' : '#000000';
    const cleaned = hexColor.replace('#', '');
    const normalized = cleaned.length === 3
      ? cleaned.split('').map((char) => char + char).join('')
      : cleaned;

    const r = Number.parseInt(normalized.slice(0, 2), 16) || 0;
    const g = Number.parseInt(normalized.slice(2, 4), 16) || 0;
    const b = Number.parseInt(normalized.slice(4, 6), 16) || 0;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.6 ? '#000000' : '#ffffff';
  };

  return (
    <section id="tentang" className="scroll-fade-in relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Topographic Contour Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100,200 C 200,100 400,100 500,200 C 600,300 800,300 900,200" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 50,350 C 150,250 350,250 500,350 C 650,450 850,450 950,350" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 100,500 C 250,400 450,400 600,500 C 750,600 850,600 900,500" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 50,650 C 200,550 350,550 550,650 C 700,750 800,750 950,650" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* Grid 3 Kolom Profil */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 relative">
        
        {/* Kolom Kiri: Sapaan & Tombol View CV */}
        <div className="lg:col-span-4 text-center lg:text-left order-2 lg:order-1">
          {personal.greeting && (
            <h3 
              className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
              style={{ color: primaryColor }}
            >
              {personal.greeting}
            </h3>
          )}
          {personal.name && (
            <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-8 ${themeTitle}`}>
              {personal.name}
            </h1>
          )}

          {personal.cvUrl && (
            <div>
              <a 
                href={personal.cvUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-semibold tracking-wider shadow-xl hover:scale-105 active:scale-95 transition"
                style={{ backgroundColor: primaryColor, color: getContrastTextColor(primaryColor) }}
              >
                <FileText size={16} />
                View CV
              </a>
            </div>
          )}
        </div>

        {/* Kolom Tengah: Foto Khusus Tentang */}
        <div className="lg:col-span-4 flex items-center justify-center relative order-1 lg:order-2">
          <div 
            className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full blur-[90px] opacity-40 transition-colors pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />
          
          <div className="relative z-10 w-64 sm:w-80 h-[380px] sm:h-[440px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/10 dark:bg-black/30">
            {personal.aboutImageUrl ? (
              <img 
                src={personal.aboutImageUrl} 
                alt={personal.name || 'Tentang'} 
                className="w-full h-full object-cover filter contrast-105"
              />
            ) : (
              <span className="text-xs opacity-40 font-mono">Belum ada foto profil</span>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Paragraf Bio & Tombol View Projects */}
        <div className="lg:col-span-4 text-center lg:text-left order-3">
          {personal.bio ? (
            <p className={`text-sm sm:text-base leading-relaxed mb-8 font-light ${themeBody}`}>
              {personal.bio}
            </p>
          ) : (
            <p className={`text-xs italic mb-8 opacity-40 ${themeMuted}`}>
              Biodata profil belum diisi di panel admin.
            </p>
          )}

          <div>
            <a 
              href="#projek" 
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-semibold tracking-wider shadow-xl hover:scale-105 active:scale-95 transition"
              style={{ backgroundColor: primaryColor, color: getContrastTextColor(primaryColor) }}
            >
              <Code2 size={16} />
              View Projects
            </a>
          </div>
        </div>

      </div>

      {/* Grid 2 Kolom Timeline: Education & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 pt-12 border-t border-white/10 dark:border-white/10 border-black/10 relative">
        
        {/* Kolom Education */}
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold mb-8 flex items-center gap-2.5 ${themeTitle}`}>
            <GraduationCap size={24} style={{ color: primaryColor }} />
            Education
          </h2>

          <div className="space-y-6">
            {(personal.education || []).length > 0 ? (
              personal.education.map((edu, idx) => (
                <div 
                  key={edu.id || idx} 
                  className="relative pl-12 pb-6 border-l border-zinc-800 last:border-transparent group"
                >
                  <div 
                    className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center shadow-md group-hover:scale-110 transition"
                  >
                    {idx + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className={`text-sm sm:text-base font-bold tracking-wide ${themeTitle}`}>
                      {edu.institution}
                    </h4>
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full self-start sm:self-auto ${isDark ? 'text-zinc-400 bg-zinc-900/80 border border-zinc-800' : 'text-zinc-500 bg-zinc-100 border border-zinc-200'}`}>
                      {edu.period}
                    </span>
                  </div>

                  <div className={`text-xs sm:text-sm font-medium mb-0.5 ${themeBody}`}>
                    {edu.major}
                  </div>
                  <div className={`text-[11px] ${themeMuted}`}>
                    {edu.subDetail}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs opacity-40 font-mono">Belum ada riwayat pendidikan yang ditambahkan.</p>
            )}
          </div>
        </div>

        {/* Kolom Experience */}
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold mb-8 flex items-center gap-2.5 ${themeTitle}`}>
            <Briefcase size={22} style={{ color: primaryColor }} />
            Experience
          </h2>

          <div className="space-y-6">
            {(personal.experience || []).length > 0 ? (
              personal.experience.map((exp, idx) => (
                <div 
                  key={exp.id || idx} 
                  className="relative pl-12 pb-6 border-l border-zinc-800 last:border-transparent group"
                >
                  <div 
                    className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center shadow-md group-hover:scale-110 transition"
                  >
                    {idx + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className={`text-sm sm:text-base font-bold tracking-wide ${themeTitle}`}>
                      {exp.company}
                    </h4>
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full self-start sm:self-auto ${isDark ? 'text-zinc-400 bg-zinc-900/80 border border-zinc-800' : 'text-zinc-500 bg-zinc-100 border border-zinc-200'}`}>
                      {exp.period}
                    </span>
                  </div>

                  <div className={`text-xs sm:text-sm font-medium mb-0.5 ${themeBody}`}>
                    {exp.role}
                  </div>
                  <div className={`text-[11px] ${themeMuted}`}>
                    {exp.subDetail}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs opacity-40 font-mono">Belum ada riwayat pengalaman yang ditambahkan.</p>
            )}
          </div>
        </div>

      </div>

    </section>
  );
}