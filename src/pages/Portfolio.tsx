import { useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Trophy,
  X,
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { usePortfolio } from '../context/PortfolioContext';
import type { AwardItem, CertificateItem, ProjectItem } from '../context/PortfolioContext';

type TabKey = 'projects' | 'certificates' | 'awards';

export default function Portfolio() {
  const { isDark, primaryColor, projects, certificates, awards } = usePortfolio();

  const themeTitle = isDark ? 'text-white' : 'text-zinc-900';
  const themeBody = isDark ? 'text-slate-300' : 'text-slate-700';
  const themeMuted = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const themeSoft = isDark ? 'text-zinc-500' : 'text-zinc-600';

  const [activeTab, setActiveTab] = useState<TabKey>('projects');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const defaultProjectImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
  ];

  const defaultCertImages = [
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
  ];

  const getContrastTextColor = (hexColor: string) => {
    const cleaned = hexColor.replace('#', '');
    const normalized = cleaned.length === 3
      ? cleaned.split('').map((char) => char + char).join('')
      : cleaned;

    const r = Number.parseInt(normalized.slice(0, 2), 16);
    const g = Number.parseInt(normalized.slice(2, 4), 16);
    const b = Number.parseInt(normalized.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.6 ? '#000000' : '#ffffff';
  };

  const getTabButtonClass = (tab: TabKey) =>
    `flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ease-out ${
      activeTab === tab
        ? 'liquid-glass shadow-lg scale-100'
        : 'text-zinc-500 hover:text-black hover:bg-white/20 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5 hover:shadow-md hover:scale-[1.01]'
    }`;

  return (
    <section id="projek" className="page-fade-up relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50,150 C 250,50 450,50 650,150 C 850,250 950,250 1000,150" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 0,350 C 200,250 400,250 600,350 C 800,450 900,450 1000,350" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 50,600 C 250,500 500,500 700,600 C 850,700 950,700 1000,600" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex justify-center mb-16 relative z-20">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-3xl liquid-glass bg-white/70 dark:bg-zinc-900/80 border border-white/40 dark:border-white/10 shadow-2xl backdrop-blur-2xl max-w-full">
          <button
            type="button"
            aria-pressed={activeTab === 'projects'}
            onClick={() => setActiveTab('projects')}
            className={`${getTabButtonClass('projects')} flex-1 sm:flex-none`}
            style={{
              backgroundColor: activeTab === 'projects' ? primaryColor : 'transparent',
              color: activeTab === 'projects' ? getContrastTextColor(primaryColor) : undefined,
              boxShadow: activeTab === 'projects' ? `0 12px 30px ${primaryColor}55` : 'none',
            }}
          >
            <Code2 size={16} />
            Projects
          </button>

          <button
            type="button"
            aria-pressed={activeTab === 'certificates'}
            onClick={() => setActiveTab('certificates')}
            className={`${getTabButtonClass('certificates')} flex-1 sm:flex-none`}
            style={{
              backgroundColor: activeTab === 'certificates' ? primaryColor : 'transparent',
              color: activeTab === 'certificates' ? getContrastTextColor(primaryColor) : undefined,
              boxShadow: activeTab === 'certificates' ? `0 12px 30px ${primaryColor}55` : 'none',
            }}
          >
            <Award size={16} />
            Certificates
          </button>

          <button
            type="button"
            aria-pressed={activeTab === 'awards'}
            onClick={() => setActiveTab('awards')}
            className={`${getTabButtonClass('awards')} flex-1 sm:flex-none`}
            style={{
              backgroundColor: activeTab === 'awards' ? primaryColor : 'transparent',
              color: activeTab === 'awards' ? getContrastTextColor(primaryColor) : undefined,
              boxShadow: activeTab === 'awards' ? `0 12px 30px ${primaryColor}55` : 'none',
            }}
          >
            <Trophy size={16} />
            Awards
          </button>
        </div>
      </div>

      <div className="relative group/carousel">
        {/* Tombol Panah Kiri (<) Monokrom Kontras */}
        <button
          onClick={scrollLeft}
          aria-label="Geser ke Kiri"
          className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 ${
            isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
          }`}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Tombol Panah Kanan (>) Monokrom Kontras */}
        <button
          onClick={scrollRight}
          aria-label="Geser ke Kanan"
          className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 ${
            isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
          }`}
        >
          <ChevronRight size={22} />
        </button>

        <div
          ref={sliderRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-6 px-1 sm:px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeTab === 'projects' &&
            (projects || []).map((proj: ProjectItem, idx: number) => (
              <div
                key={proj.id || idx}
                className={`min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 ${isDark ? 'bg-zinc-900/90 border border-white/10' : 'bg-white border border-zinc-200/80'}`}
              >
                <div className="h-44 sm:h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                  <img
                    src={proj.imageUrl || defaultProjectImages[idx % defaultProjectImages.length]}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider text-white backdrop-blur-md bg-black/40">
                    {proj.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className={`text-lg font-bold mb-2 tracking-tight ${themeTitle}`}>
                      {proj.title}
                    </h3>
                    <p className={`text-xs leading-relaxed line-clamp-3 mb-6 ${themeBody}`}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Tombol Details Monokrom */}
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide shadow-md hover:scale-105 active:scale-95 transition ${
                      isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  >
                    Details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}

          {activeTab === 'certificates' &&
            (certificates || []).map((cert: CertificateItem, idx: number) => (
              <div
                key={cert.id || idx}
                className={`min-w-[260px] sm:min-w-[380px] max-w-[380px] rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 ${isDark ? 'bg-zinc-900/90 border border-white/10' : 'bg-white border border-zinc-200/80'}`}
              >
                <div
                  className="h-52 sm:h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative cursor-pointer group"
                  onClick={() => setSelectedCert(cert)}
                >
                  <img
                    src={cert.imageUrl || cert.credentialUrl || defaultCertImages[idx % defaultCertImages.length]}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-xs">
                    <ExternalLink size={16} /> Pratinjau Sertifikat
                  </div>
                </div>

                <div className="p-6">
                  <div className={`flex items-center justify-between text-[11px] font-mono mb-1 ${themeMuted}`}>
                    <span>{cert.issuer}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${isDark ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-100 text-zinc-700'}`}>{cert.year}</span>
                  </div>
                  <h3 className={`text-base font-bold line-clamp-1 mb-1 ${themeTitle}`}>
                    {cert.title}
                  </h3>
                  <div className={`text-[10px] font-mono ${themeSoft}`}>ID: {cert.credentialId}</div>
                </div>
              </div>
            ))}

          {activeTab === 'awards' &&
            ((awards || []).length > 0 ? (
              (awards || []).map((award: AwardItem, idx: number) => (
                <div
                  key={award.id || idx}
                  className={`min-w-[260px] sm:min-w-[340px] max-w-[340px] rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 ${isDark ? 'bg-zinc-900/90 border border-white/10' : 'bg-white border border-zinc-200/80'}`}
                >
                  <div className="h-44 sm:h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                    <img
                      src={award.imageUrl || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800'}
                      alt={award.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider text-white backdrop-blur-md bg-black/40">
                      {award.year}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className={`text-[11px] font-mono mb-1 ${themeMuted}`}>{award.issuer}</div>
                    <h3 className={`text-base font-bold mb-2 ${themeTitle}`}>{award.title}</h3>
                    <p className={`text-xs line-clamp-3 ${themeBody}`}>{award.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={`w-full min-h-[220px] flex flex-col items-center justify-center text-center p-8 glass-panel rounded-3xl border ${isDark ? 'border-white/20' : 'border-zinc-200'}`}>
                <Trophy size={40} className="mb-3 opacity-40" style={{ color: primaryColor }} />
                <h3 className={`text-base font-bold mb-1 ${themeTitle}`}>Belum Ada Penghargaan</h3>
                <p className={`text-xs max-w-sm ${themeMuted}`}>Tambahkan sertifikat juara atau kompetisi melalui panel Admin di tab Awards.</p>
              </div>
            ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl relative border ${isDark ? 'bg-zinc-900/95 border-white/20' : 'bg-white/90 border-zinc-200'}`}>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            >
              <X size={20} />
            </button>

            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                isDark ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              {selectedProject.category}
            </span>

            <h2 className={`text-2xl font-black mt-3 mb-3 ${themeTitle}`}>
              {selectedProject.title}
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${themeBody}`}>
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${themeMuted}`}>Teknologi Digunakan:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className={`text-xs font-mono px-3 py-1 rounded-lg border ${isDark ? 'bg-zinc-800 border-white/10 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-700'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`flex items-center gap-3 pt-4 border-t ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
              {selectedProject.github && selectedProject.github !== '#' && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex-1 py-3 rounded-xl border font-semibold text-xs text-center flex items-center justify-center gap-2 transition ${isDark ? 'border-zinc-700 hover:bg-zinc-800 text-white' : 'border-zinc-300 hover:bg-zinc-100 text-zinc-900'}`}
                >
                  <GithubIcon className="w-4 h-4 fill-current" />
                  Source Code
                </a>
              )}
              {selectedProject.demo && selectedProject.demo !== '#' && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex-1 py-3 rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition ${
                    isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  <ExternalLink size={16} />
                  Kunjungi Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className={`relative max-w-3xl w-full glass-panel p-4 rounded-3xl shadow-2xl border ${isDark ? 'bg-zinc-950 border-white/20' : 'bg-white border-zinc-200'}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/60 hover:bg-black transition z-10"
            >
              <X size={20} />
            </button>
            <h3 className={`text-sm font-bold mb-3 text-center ${themeTitle}`}>{selectedCert.title}</h3>
            <div className={`rounded-2xl overflow-hidden max-h-[75vh] flex items-center justify-center ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
              <img
                src={selectedCert.imageUrl || selectedCert.credentialUrl || defaultCertImages[0]}
                alt={selectedCert.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}