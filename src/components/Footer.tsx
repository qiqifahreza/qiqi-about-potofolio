import { usePortfolio } from '../context/PortfolioContext';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { personal } = usePortfolio();

  return (
    <footer className="relative z-10 py-8 text-center text-xs text-slate-500 font-mono border-t border-white/10">
      © {CURRENT_YEAR} {personal.name}. Liquid-Glass Editorial Portfolio.
    </footer>
  );
}