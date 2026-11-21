import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { TopographyBackground } from './components/TopographyBackground';
import SectionDivider from './components/SectionDivider';
import Navbar from './components/Navbar';
import LineSidebar from './components/LineSidebar';
import Footer from './components/Footer';
import RightHudSidebar from './components/RightHudSidebar';

import Hero from './pages/Hero';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contacts from './pages/Contacts';
import Admin from './pages/Admin';

const SIDEBAR_SECTIONS = [
  { id: 'beranda', label: 'Home' },
  { id: 'tentang', label: 'About' },
  { id: 'projek', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

function PortfolioHome() {
  const { isDark } = usePortfolio();
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);

  // ScrollSpy Presisi untuk menggerakkan garis penunjuk LineSidebar
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 75) {
        setActiveSectionIdx(3); // Contact
        return;
      }

      const threshold = 240;
      let currentIdx = 0;
      for (let i = 0; i < SIDEBAR_SECTIONS.length; i++) {
        const el = document.getElementById(SIDEBAR_SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          currentIdx = i;
        }
      }
      setActiveSectionIdx(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    setActiveSectionIdx(index);
    const target = document.getElementById(SIDEBAR_SECTIONS[index].id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-clip transition-colors duration-500 font-sans manga-screentone ${
      isDark ? 'bg-[#07080d] text-slate-100' : 'bg-[#f4f3ef] text-zinc-950'
    }`}>
      {/* LATAR BELAKANG TOPOGRAFI HIDUP */}
      <TopographyBackground
        className="fixed inset-0 z-0 pointer-events-none"
        lineColor={isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.12)'}
        speed={0.7}
        scale={1.1}
        levels={18}
        peak={1.2}
      />

      {/* NAVBAR RINGKAS: Hanya Logo+Qiqi di Kiri & Sun/Moon di Kanan */}
      <Navbar />

      {/* LINE SIDEBAR DI SISI KIRI LAYAR (DESKTOP) */}
      <aside className="fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <LineSidebar
          items={SIDEBAR_SECTIONS.map((s) => s.label)}
          active={activeSectionIdx}
          accentColor={isDark ? '#ffffff' : '#09090b'}
          textColor={isDark ? '#71717a' : '#71717a'}
          markerColor={isDark ? '#3f3f46' : '#a1a1aa'}
          proximityRadius={110}
          maxShift={20}
          markerLength={36}
          markerGap={8}
          itemGap={22}
          fontSize={0.9}
          onItemClick={(idx) => scrollToSection(idx)}
        />
      </aside>
      {/* MANGA HUD TELEMETRY DI SISI KANAN (DESKTOP) */}
<RightHudSidebar />

      {/* KONTEN UTAMA (Dengan padding aman agar tidak bertabrakan dengan LineSidebar di laptop) */}
      <main className="relative z-10 lg:pl-44 2xl:pl-0">
        <Hero />

        <SectionDivider label="第01話 // ABOUT" />
        <About />

        <SectionDivider label="第02話 // PORTFOLIO" />
        <Portfolio />

        <SectionDivider label="第03話 // CONTACT" />
        <Contacts />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}