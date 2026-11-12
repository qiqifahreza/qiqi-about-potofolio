import { Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Certificates() {
  const { primaryColor, secondaryColor, certificates } = usePortfolio();

  return (
    <section id="sertifikat" className="relative z-10 py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: primaryColor }}>
          // Pengakuan & Kualifikasi
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Sertifikat</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-white/10">
                <Award size={20} style={{ color: secondaryColor }} />
              </div>
              <h3 className="text-lg font-bold mb-1">{cert.title}</h3>
              <p className="text-xs text-slate-400">{cert.issuer} • {cert.year}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="opacity-60">{cert.credentialId}</span>
              {cert.credentialUrl && cert.credentialUrl !== '#' ? (
                <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] hover:underline" style={{ color: primaryColor }}>
                  <ExternalLink size={12} /> Bukti Kredensial
                </a>
              ) : (
                <span className="flex items-center gap-1 text-[11px]" style={{ color: primaryColor }}>
                  <CheckCircle2 size={13} /> Verified
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}