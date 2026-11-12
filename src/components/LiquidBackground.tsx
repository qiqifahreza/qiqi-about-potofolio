import { usePortfolio } from '../context/PortfolioContext';

export default function LiquidBackground() {
  const { primaryColor, secondaryColor } = usePortfolio();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute -top-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full blur-[110px] opacity-40 animate-liquid-1 transition-colors duration-700"
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute top-1/2 -right-32 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full blur-[120px] opacity-35 animate-liquid-2 transition-colors duration-700"
        style={{ backgroundColor: secondaryColor }}
      />
      <div 
        className="absolute -bottom-40 left-1/3 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full blur-[100px] opacity-30 animate-liquid-3 transition-colors duration-700"
        style={{ backgroundColor: primaryColor }}
      />
    </div>
  );
}