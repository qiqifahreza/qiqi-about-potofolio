import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code2,
  Award,
  Trophy,
  Sparkles,
  FolderOpen
} from 'lucide-react';
import Folder, { type FolderEntry } from '../components/Folder';
import AnimatedContent from '../components/AnimatedContent';
import { GithubIcon } from '../components/Icons';
import { usePortfolio } from '../context/PortfolioContext';
import type { AwardItem, CertificateItem, ProjectItem } from '../context/PortfolioContext';

type FolderCategory = 'projects' | 'certificates' | 'awards';
const ITEMS_PER_PAGE = 3;

export default function Portfolio() {
  const { isDark, projects, certificates, awards } = usePortfolio();

  const themeTitle = isDark ? 'text-white' : 'text-zinc-950';

  const [openFolder, setOpenFolder] = useState<FolderCategory | null>(null);

  const [projPage, setProjPage] = useState(1);
  const [certPage, setCertPage] = useState(1);
  const [awardPage, setAwardPage] = useState(1);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  const defaultProjectImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  ];

  const defaultCertImages = [
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
  ];

  // ================= PAGINATION: PROJECTS =================
  const totalProjPages = Math.max(1, Math.ceil((projects?.length || 0) / ITEMS_PER_PAGE));
  const safeProjPage = Math.min(projPage, totalProjPages);
  const pagedProjects = (projects || []).slice(
    (safeProjPage - 1) * ITEMS_PER_PAGE,
    safeProjPage * ITEMS_PER_PAGE
  );
  const projFolderItems: FolderEntry[] =
    pagedProjects.length > 0
      ? pagedProjects.map((p, idx) => ({
          title: p.title,
          description: p.category,
          image: p.imageUrl || defaultProjectImages[idx % defaultProjectImages.length],
          alt: p.title,
        }))
      : [{ title: 'Belum Ada Projek', description: 'Tambahkan lewat Admin' }];

  // ================= PAGINATION: CERTIFICATES =================
  const totalCertPages = Math.max(1, Math.ceil((certificates?.length || 0) / ITEMS_PER_PAGE));
  const safeCertPage = Math.min(certPage, totalCertPages);
  const pagedCerts = (certificates || []).slice(
    (safeCertPage - 1) * ITEMS_PER_PAGE,
    safeCertPage * ITEMS_PER_PAGE
  );
  const certFolderItems: FolderEntry[] =
    pagedCerts.length > 0
      ? pagedCerts.map((c, idx) => ({
          title: c.title,
          description: `${c.issuer} • ${c.year}`,
          image: c.imageUrl || c.credentialUrl || defaultCertImages[idx % defaultCertImages.length],
          alt: c.title,
        }))
      : [{ title: 'Belum Ada Sertifikat', description: 'Tambahkan lewat Admin' }];

  // ================= PAGINATION: AWARDS =================
  const totalAwardPages = Math.max(1, Math.ceil((awards?.length || 0) / ITEMS_PER_PAGE));
  const safeAwardPage = Math.min(awardPage, totalAwardPages);
  const pagedAwards = (awards || []).slice(
    (safeAwardPage - 1) * ITEMS_PER_PAGE,
    safeAwardPage * ITEMS_PER_PAGE
  );
  const awardFolderItems: FolderEntry[] =
    pagedAwards.length > 0
      ? pagedAwards.map((a) => ({
          title: a.title,
          description: `${a.issuer} • ${a.year}`,
          image: a.imageUrl || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
          alt: a.title,
        }))
      : [{ title: 'Belum Ada Award', description: 'Tambahkan lewat Admin' }];

  const folderColor = isDark ? '#3f3f46' : '#e4e4e7';

  return (
    <section id="projek" className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      
      {/* ================= WATERMARK ONOMATOPOEIA MANGA (SFX) ================= */}
      <div className="absolute top-10 left-2 pointer-events-none opacity-[0.05] dark:opacity-[0.06] text-7xl sm:text-9xl font-black font-['Noto_Sans_JP',sans-serif] tracking-widest leading-none">
        ゴゴゴゴ
      </div>
      <div className="absolute bottom-20 right-4 pointer-events-none opacity-[0.05] dark:opacity-[0.06] text-7xl sm:text-9xl font-black font-['Noto_Sans_JP',sans-serif] tracking-widest leading-none">
        ドドドド
      </div>

      {/* ================= SECTION HEADER GAYA MANGA DOSSIER ================= */}
      <AnimatedContent
        distance={40}
        duration={0.7}
        blur={3}
        threshold={0.12}
        className="text-center mb-16 sm:mb-20 w-full relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[11px] font-mono font-black uppercase tracking-[0.25em] border-2 border-black dark:border-white bg-white dark:bg-zinc-950 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
          <Sparkles size={13} className="text-amber-500 animate-pulse" />
          <span>巻の二 // CHAPTER 02 • THE ARCHIVES</span>
        </div>

        {/* Judul Utama dengan Cap Merah Rahasia (Hanko Stamp) */}
        <div className="relative inline-block">
          <h2 className={`text-3xl sm:text-6xl font-black tracking-tight font-mono uppercase ${themeTitle}`}>
            PORTFOLIO SHOWCASE
          </h2>
          <p className="text-xs sm:text-sm font-['Noto_Sans_JP',sans-serif] font-bold tracking-[0.35em] mt-1 opacity-70">
            作品集 • 認定証書 • 受賞記録
          </p>

          {/* Stempel Merah Manga (Secret Archive Stamp) */}
          <div className="absolute -top-6 -right-6 sm:-right-12 rotate-12 border-2 border-rose-600 text-rose-600 px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase opacity-90 shadow-xs pointer-events-none">
            [ 秘 • CLASSIFIED ]
          </div>
        </div>

        {/* Manga Mission Banner (Statistik Komik) */}
        <div className="mt-8 max-w-2xl mx-auto p-4 rounded-xl border-2 border-black dark:border-white bg-white/90 dark:bg-zinc-900/90 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#fff] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold">STATUS: ARCHIVES UNLOCKED</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold opacity-80">
            <span>PROYEK: {projects?.length || 0}</span>
            <span>•</span>
            <span>SERTIFIKAT: {certificates?.length || 0}</span>
            <span>•</span>
            <span>AWARDS: {awards?.length || 0}</span>
          </div>

          <div className="w-full text-center text-[11px] italic font-serif border-t border-black/10 dark:border-white/10 pt-2 opacity-70">
            &ldquo;Klik folder untuk membongkar dokumen komik, atau seret halaman di bawahnya.&rdquo;
          </div>
        </div>
      </AnimatedContent>

      {/* ================= 3 PANEL DOSSIER KOMIK ================= */}
      <AnimatedContent
        distance={60}
        duration={0.85}
        scale={0.96}
        stagger={0.16}
        threshold={0.12}
        className="w-full grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-start justify-items-center"
      >
        
        {/* ================= PANEL 1: PROJECTS ================= */}
        <div className="w-full max-w-[370px] flex flex-col items-center">
          {/* Manga Dossier Panel Card Wrapper */}
          <div className="w-full rounded-2xl border-2 border-black dark:border-white bg-white/80 dark:bg-zinc-900/80 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] p-5 pb-8 relative overflow-hidden transition-all hover:-translate-y-1">
            
            {/* Header Panel Komik */}
            <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-black/10 dark:border-white/15 text-[11px] font-mono">
              <span className="font-black flex items-center gap-1.5 uppercase">
                <Code2 size={14} className="text-teal-500" />
                FILE_01 // PROJECTS
              </span>
              <span className="font-bold opacity-60">第01分類</span>
            </div>

            {/* Registration Corner Marks (Tanda Potong Komik) */}
            <span className="absolute top-2 left-2 text-[10px] font-mono opacity-30 select-none">⌜</span>
            <span className="absolute top-2 right-2 text-[10px] font-mono opacity-30 select-none">⌝</span>
            <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-30 select-none">⌞</span>
            <span className="absolute bottom-2 right-2 text-[10px] font-mono opacity-30 select-none">⌟</span>

            {/* Komponen Folder 3D WebGL */}
            <div className="flex justify-center py-4">
              <Folder
                label="Projects"
                mode="flap"
                variant="glass"
                layout="spread"
                color={folderColor}
                paperColor="#ffffff"
                tabPosition="right"
                size={1.1}
                frost={0.28}
                tilt={0.5}
                bounce={0.4}
                speed={1}
                peek
                intro
                draggable
                zoomOnClick={false}
                closeOnOutsideClick={false}
                theme={isDark ? 'dark' : 'light'}
                open={openFolder === 'projects'}
                onOpenChange={(isOpen) => setOpenFolder(isOpen ? 'projects' : null)}
                items={projFolderItems}
                onItemClick={(_, idx) => {
                  const target = pagedProjects[idx];
                  if (target) setSelectedProject(target);
                }}
              />
            </div>

            {/* Footer Panel dengan Petunjuk Taktil Manga */}
            <div className="mt-4 pt-3 border-t border-dashed border-black/15 dark:border-white/15 flex items-center justify-between text-[10px] font-mono opacity-70">
              <span className="flex items-center gap-1">
                <FolderOpen size={12} />
                <span>{openFolder === 'projects' ? 'TERBUKA' : 'TERTUTUP'}</span>
              </span>
              <span>TOTAL: {projects?.length || 0} DOKUMEN</span>
            </div>
          </div>

          {/* Pagination Manga Style (Muncul Otomatis jika Proyek > 3) */}
          {(projects?.length || 0) > ITEMS_PER_PAGE && (
            <div className="mt-5 inline-flex items-center gap-3 px-4 py-1.5 rounded-lg border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] text-xs font-mono">
              <button
                type="button"
                disabled={safeProjPage <= 1}
                onClick={() => setProjPage((p) => Math.max(1, p - 1))}
                className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded disabled:opacity-20 transition"
                aria-label="Halaman Sebelumnya"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="font-black tracking-widest">
                PAGE {safeProjPage}/{totalProjPages}
              </span>
              <button
                type="button"
                disabled={safeProjPage >= totalProjPages}
                onClick={() => setProjPage((p) => Math.min(totalProjPages, p + 1))}
                className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded disabled:opacity-20 transition"
                aria-label="Halaman Berikutnya"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* ================= PANEL 2: CERTIFICATES ================= */}
        <div className="w-full max-w-[370px] flex flex-col items-center">
          <div className="w-full rounded-2xl border-2 border-black dark:border-white bg-white/80 dark:bg-zinc-900/80 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] p-5 pb-8 relative overflow-hidden transition-all hover:-translate-y-1">
            
            <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-black/10 dark:border-white/15 text-[11px] font-mono">
              <span className="font-black flex items-center gap-1.5 uppercase">
                <Award size={14} className="text-amber-500" />
                FILE_02 // CERTS
              </span>
              <span className="font-bold opacity-60">第02分類</span>
            </div>

            <span className="absolute top-2 left-2 text-[10px] font-mono opacity-30 select-none">⌜</span>
            <span className="absolute top-2 right-2 text-[10px] font-mono opacity-30 select-none">⌝</span>
            <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-30 select-none">⌞</span>
            <span className="absolute bottom-2 right-2 text-[10px] font-mono opacity-30 select-none">⌟</span>

            <div className="flex justify-center py-4">
              <Folder
                label="Certificates"
                mode="flap"
                variant="glass"
                layout="spread"
                color={folderColor}
                paperColor="#ffffff"
                tabPosition="right"
                size={1.1}
                frost={0.28}
                tilt={0.5}
                bounce={0.4}
                speed={1}
                peek
                intro
                draggable
                zoomOnClick={false}
                closeOnOutsideClick={false}
                theme={isDark ? 'dark' : 'light'}
                open={openFolder === 'certificates'}
                onOpenChange={(isOpen) => setOpenFolder(isOpen ? 'certificates' : null)}
                items={certFolderItems}
                onItemClick={(_, idx) => {
                  const target = pagedCerts[idx];
                  if (target) setSelectedCert(target);
                }}
              />
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-black/15 dark:border-white/15 flex items-center justify-between text-[10px] font-mono opacity-70">
              <span className="flex items-center gap-1">
                <FolderOpen size={12} />
                <span>{openFolder === 'certificates' ? 'TERBUKA' : 'TERTUTUP'}</span>
              </span>
              <span>TOTAL: {certificates?.length || 0} DOKUMEN</span>
            </div>
          </div>

          {(certificates?.length || 0) > ITEMS_PER_PAGE && (
            <div className="mt-5 inline-flex items-center gap-3 px-4 py-1.5 rounded-lg border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] text-xs font-mono">
              <button
                type="button"
                disabled={safeCertPage <= 1}
                onClick={() => setCertPage((p) => Math.max(1, p - 1))}
                className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded disabled:opacity-20 transition"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="font-black tracking-widest">
                PAGE {safeCertPage}/{totalCertPages}
              </span>
              <button
                type="button"
                disabled={safeCertPage >= totalCertPages}
                onClick={() => setCertPage((p) => Math.min(totalCertPages, p + 1))}
                className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded disabled:opacity-20 transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* ================= PANEL 3: AWARDS ================= */}
        <div className="w-full max-w-[370px] flex flex-col items-center">
          <div className="w-full rounded-2xl border-2 border-black dark:border-white bg-white/80 dark:bg-zinc-900/80 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] p-5 pb-8 relative overflow-hidden transition-all hover:-translate-y-1">
            
            <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-black/10 dark:border-white/15 text-[11px] font-mono">
              <span className="font-black flex items-center gap-1.5 uppercase">
                <Trophy size={14} className="text-rose-500" />
                FILE_03 // AWARDS
              </span>
              <span className="font-bold opacity-60">第03分類</span>
            </div>

            <span className="absolute top-2 left-2 text-[10px] font-mono opacity-30 select-none">⌜</span>
            <span className="absolute top-2 right-2 text-[10px] font-mono opacity-30 select-none">⌝</span>
            <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-30 select-none">⌞</span>
            <span className="absolute bottom-2 right-2 text-[10px] font-mono opacity-30 select-none">⌟</span>

            <div className="flex justify-center py-4">
              <Folder
                label="Awards"
                mode="flap"
                variant="glass"
                layout="spread"
                color={folderColor}
                paperColor="#ffffff"
                tabPosition="right"
                size={1.1}
                frost={0.28}
                tilt={0.5}
                bounce={0.4}
                speed={1}
                peek
                intro
                draggable
                zoomOnClick={false}
                closeOnOutsideClick={false}
                theme={isDark ? 'dark' : 'light'}
                open={openFolder === 'awards'}
                onOpenChange={(isOpen) => setOpenFolder(isOpen ? 'awards' : null)}
                items={awardFolderItems}
                onItemClick={(_, idx) => {
                  const target = pagedAwards[idx];
                  if (target) setSelectedAward(target);
                }}
              />
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-black/15 dark:border-white/15 flex items-center justify-between text-[10px] font-mono opacity-70">
              <span className="flex items-center gap-1">
                <FolderOpen size={12} />
                <span>{openFolder === 'awards' ? 'TERBUKA' : 'TERTUTUP'}</span>
              </span>
              <span>TOTAL: {awards?.length || 0} DOKUMEN</span>
            </div>
          </div>

          {(awards?.length || 0) > ITEMS_PER_PAGE && (
            <div className="mt-5 inline-flex items-center gap-3 px-4 py-1.5 rounded-lg border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] text-xs font-mono">
              <button
                type="button"
                disabled={safeAwardPage <= 1}
                onClick={() => setAwardPage((p) => Math.max(1, p - 1))}
                className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded disabled:opacity-20 transition"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="font-black tracking-widest">
                PAGE {safeAwardPage}/{totalAwardPages}
              </span>
              <button
                type="button"
                disabled={safeAwardPage >= totalAwardPages}
                onClick={() => setAwardPage((p) => Math.min(totalAwardPages, p + 1))}
                className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded disabled:opacity-20 transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

      </AnimatedContent>

      {/* ================= MODAL DETAIL PROJEK GAYA MANGA ================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`w-full max-w-xl p-6 sm:p-8 rounded-2xl border-2 border-black dark:border-white shadow-[10px_10px_0px_#000] dark:shadow-[10px_10px_0px_#fff] relative ${
              isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 border-2 border-black dark:border-white rounded-lg hover:bg-rose-500 hover:text-white transition font-mono font-bold text-xs"
            >
              ✕
            </button>

            {selectedProject.imageUrl && (
              <div className="w-full h-48 rounded-xl overflow-hidden mb-5 border-2 border-black dark:border-white">
                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="inline-block text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black mb-3">
              {selectedProject.category}
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-mono uppercase mb-2">
              {selectedProject.title}
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed opacity-80 mb-6 font-serif">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-[10px] font-black uppercase tracking-wider opacity-60 mb-2 font-mono">
                // ARSENAL TEKNOLOGI:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs font-mono font-bold px-3 py-1 rounded border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t-2 border-black/10 dark:border-white/10">
              {selectedProject.github && selectedProject.github !== '#' && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="manga-btn flex-1 py-3 rounded-xl font-mono font-black text-xs text-center flex items-center justify-center gap-2 bg-white text-black dark:bg-zinc-900 dark:text-white"
                >
                  <GithubIcon className="w-4 h-4 fill-current" />
                  REPOSITORI
                </a>
              )}
              {selectedProject.demo && selectedProject.demo !== '#' && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="manga-btn flex-1 py-3 rounded-xl font-mono font-black text-xs text-center flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black"
                >
                  <ExternalLink size={16} />
                  KUNJUNGI WEB
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL PRATINJAU SERTIFIKAT ================= */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className={`relative max-w-3xl w-full p-6 rounded-2xl border-2 border-black dark:border-white shadow-[10px_10px_0px_#000] dark:shadow-[10px_10px_0px_#fff] ${
              isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 border-2 border-black dark:border-white rounded-lg hover:bg-rose-500 hover:text-white transition font-mono font-bold text-xs"
            >
              ✕
            </button>
            <div className="mb-4 pr-8 font-mono">
              <div className="text-xs uppercase opacity-60">{selectedCert.issuer} • {selectedCert.year}</div>
              <h3 className="text-lg font-black uppercase mt-0.5">{selectedCert.title}</h3>
              <div className="text-[11px] opacity-75">ID: {selectedCert.credentialId}</div>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-black dark:border-white max-h-[65vh] flex items-center justify-center bg-zinc-900">
              <img
                src={selectedCert.imageUrl || selectedCert.credentialUrl || defaultCertImages[0]}
                alt={selectedCert.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL PRATINJAU AWARD ================= */}
      {selectedAward && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className={`relative max-w-2xl w-full p-6 rounded-2xl border-2 border-black dark:border-white shadow-[10px_10px_0px_#000] dark:shadow-[10px_10px_0px_#fff] ${
              isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAward(null)}
              className="absolute top-4 right-4 p-1.5 border-2 border-black dark:border-white rounded-lg hover:bg-rose-500 hover:text-white transition font-mono font-bold text-xs"
            >
              ✕
            </button>
            <div className="mb-4 pr-8 font-mono">
              <div className="text-xs uppercase opacity-60">{selectedAward.issuer} • {selectedAward.year}</div>
              <h3 className="text-lg font-black uppercase mt-0.5">{selectedAward.title}</h3>
              <p className="text-xs mt-1.5 opacity-80 font-serif leading-relaxed">{selectedAward.description}</p>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-black dark:border-white max-h-[60vh] flex items-center justify-center bg-zinc-900">
              <img
                src={selectedAward.imageUrl || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800'}
                alt={selectedAward.title}
                className="max-h-[55vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}