import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import LiquidBackground from './components/LiquidBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './pages/Hero';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contacts from './pages/Contacts';
import Admin from './pages/Admin';

function PortfolioHome() {
  const { isDark } = usePortfolio();

  // Observer untuk mendeteksi saat section di-scroll dan memicu animasi fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const sections = document.querySelectorAll('.scroll-fade-in');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 font-sans ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <LiquidBackground />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Portfolio />
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