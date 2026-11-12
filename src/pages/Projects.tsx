import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Projects() {
  const { primaryColor, projects } = usePortfolio();

  return (
    <section id="projek" className="relative z-10 py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: primaryColor }}>
          // Portofolio Karya
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Projek Terpilih</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((item) => (
          <div 
            key={item.id} 
            className="glass-panel rounded-3xl p-6 flex flex-col justify-between group hover:border-white/30 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              <span className="text-[11px] font-mono tracking-wider opacity-70 uppercase" style={{ color: primaryColor }}>
                {item.category}
              </span>
              <h3 className="text-xl font-bold mt-1 mb-3 group-hover:text-cyan-400 transition">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.tags.map((t: string) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                {item.github && item.github !== '#' && (
                  <a href={item.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition">
                    <GithubIcon className="w-4 h-4 fill-current" /> Code
                  </a>
                )}
                {item.demo && item.demo !== '#' && (
                  <a href={item.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition" style={{ color: primaryColor }}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}