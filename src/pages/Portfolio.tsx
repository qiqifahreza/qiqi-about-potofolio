import { useState, useRef } from 'react';
import { 
  Code2, 
  Award, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ExternalLink, 
  X 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import type { ProjectItem, CertificateItem, AwardItem } from '../context/PortfolioContext';
import { GithubIcon } from '../components/Icons';

export default function Portfolio() {
  const { primaryColor, projects, certificates, awards } = usePortfolio();

  // Tab State: 'projects' | 'certificates' | 'awards'
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'awards'>('projects');

  // Selected Project for Modal Details
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Selected Certificate for Image Preview Modal
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Slider Ref for Smooth Scrolling
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

  // Mock project images jika proyek belum memiliki gambar khusus
  const defaultProjectImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
  ];

  const defaultCertImages = [
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800'
  ];

  return (
    <section id="projek" className="relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Topographic Contour Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50,150 C 250,50 450,50 650,150 C 850,250 950,250 1000,150" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 0,350 C 200,250 400,250 600,350 C 800,450 900,450 1000,350" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 50,600 C 250,500 500,500 700,600 C 850,700 950,700 1000,600" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* ================= TAB SWITCHER CAPSULE ================= */}
      <div className="flex justify-center mb-16 relative z-20">
        <div className="inline-flex items-center p-1.5 rounded-3xl glass-panel bg-white/70 dark:bg-zinc-900/80 border border-white/40 dark:border-white/10 shadow-2xl backdrop-blur-2xl">
          
          {/* Tab 1: Projects */}
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'projects'
                ? 'text-white shadow-lg scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
            style={{
              backgroundColor: activeTab === 'projects' ? primaryColor : 'transparent'
            }}
          >
            <Code2 size={16} />
            Projects
          </button>

          {/* Tab 2: Certificates */}
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'certificates'
                ? 'text-white shadow-lg scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
            style={{
              backgroundColor: activeTab === 'certificates' ? primaryColor : 'transparent'
            }}
          >
            <Award size={16} />
            Certificates
          </button>

          {/* Tab 3: Awards */}
          <button
            onClick={() => setActiveTab('awards')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'awards'
                ? 'text-white shadow-lg scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
            style={{
              backgroundColor: activeTab === 'awards' ? primaryColor : 'transparent'
            }}
          >
            <Trophy size={16} />
            Awards
          </button>

        </div>
      </div>

      {/* ================= CAROUSEL SLIDER WRAPPER ================= */}
      <div className="relative group/carousel">
        
        {/* Tombol Navigasi Kiri (<) */}
        <button
          onClick={scrollLeft}
          aria-label="Geser ke Kiri"
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
          style={{ backgroundColor: primaryColor }}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Tombol Navigasi Kanan (>) */}
        <button
          onClick={scrollRight}
          aria-label="Geser ke Kanan"
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
          style={{ backgroundColor: primaryColor }}
        >
          <ChevronRight size={22} />
        </button>

        {/* ================= SLIDER TRACK CONTAINER ================= */}
        <div 
          ref={sliderRef}
          className="flex items-stretch gap-6 overflow-x-auto scroll-smooth no-scrollbar py-6 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          
          {/* TAB CONTENT: PROJECTS */}
          {activeTab === 'projects' && (
            (projects || []).map((proj: ProjectItem, idx: number) => (
              <div
                key={proj.id || idx}
                className="min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-white/10 shadow-xl overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
              >
                {/* Mockup / Project Image */}
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

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Details Button */}
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white tracking-wide shadow-md hover:scale-105 active:scale-95 transition"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Details
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* TAB CONTENT: CERTIFICATES */}
          {activeTab === 'certificates' && (
            (certificates || []).map((cert: CertificateItem, idx: number) => (
              <div
                key={cert.id || idx}
                className="min-w-[320px] sm:min-w-[380px] max-w-[380px] rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-white/10 shadow-xl overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
              >
                {/* Certificate Visual Image */}
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

                {/* Body Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
                    <span>{cert.issuer}</span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold">{cert.year}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white line-clamp-1 mb-1">
                    {cert.title}
                  </h3>
                  <div className="text-[10px] font-mono text-zinc-400">
                    ID: {cert.credentialId}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* TAB CONTENT: AWARDS */}
          {activeTab === 'awards' && (
            (awards || []).length > 0 ? (
              (awards || []).map((award: AwardItem, idx: number) => (
                <div
                  key={award.id || idx}
                  className="min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-white/10 shadow-xl overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
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
                    <div className="text-[11px] font-mono text-zinc-500 mb-1">{award.issuer}</div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{award.title}</h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">{award.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full min-h-[220px] flex flex-col items-center justify-center text-center p-8 glass-panel rounded-3xl border border-white/20">
                <Trophy size={40} className="mb-3 opacity-40" style={{ color: primaryColor }} />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">Belum Ada Penghargaan</h3>
                <p className="text-xs text-zinc-500 max-w-sm">Tambahkan sertifikat juara atau kompetisi melalui panel Admin di tab Awards.</p>
              </div>
            )
          )}

        </div>
      </div>

      {/* ================= MODAL DETAIL PROJEK ================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl glass-panel bg-white/90 dark:bg-zinc-900/95 p-6 sm:p-8 rounded-3xl shadow-2xl relative border border-zinc-200 dark:border-white/20">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-md" style={{ backgroundColor: primaryColor }}>
              {selectedProject.category}
            </span>

            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mt-3 mb-3">
              {selectedProject.title}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Teknologi Digunakan:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t: string) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-white/10">
              {selectedProject.github && selectedProject.github !== '#' && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
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
                  className="flex-1 py-3 rounded-xl font-semibold text-xs text-white text-center flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ExternalLink size={16} />
                  Kunjungi Website
                </a>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL PRATINJAU SERTIFIKAT ================= */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCert(null)}>
          <div className="relative max-w-3xl w-full glass-panel bg-zinc-950 p-4 rounded-3xl shadow-2xl border border-white/20" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/60 hover:bg-black transition z-10"
            >
              <X size={20} />
            </button>
            <h3 className="text-sm font-bold text-white mb-3 text-center">{selectedCert.title}</h3>
            <div className="rounded-2xl overflow-hidden bg-zinc-900 max-h-[75vh] flex items-center justify-center">
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