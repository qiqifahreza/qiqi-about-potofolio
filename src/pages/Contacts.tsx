import { Send, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contacts() {
  const { primaryColor, secondaryColor, contacts, contactSettings } = usePortfolio();

  return (
    <section id="contact" className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold">{contactSettings.title}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {contactSettings.description}
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Pesan berhasil terkirim!'); }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">Nama</label>
              <input 
                type="text" 
                required 
                placeholder="Nama Lengkap Anda" 
                className="w-full px-4 py-3 rounded-xl glass-panel bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">Email</label>
              <input 
                type="email" 
                required 
                placeholder="email@example.com" 
                className="w-full px-4 py-3 rounded-xl glass-panel bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1">Pesan</label>
            <textarea 
              rows={4} 
              required 
              placeholder="Ceritakan tentang proyek Anda..." 
              className="w-full px-4 py-3 rounded-xl glass-panel bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-400 text-sm"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white shadow-xl hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
          >
            <Send size={16} /> Kirim Pesan
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/10">
          <h3 className="text-xs font-semibold text-center uppercase tracking-wider text-slate-400 mb-4">
            Atau Hubungi Lewat Akun Resmi:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {contacts.map(acc => (
              <a 
                key={acc.id} 
                href={acc.url} 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 rounded-xl glass-panel text-xs font-mono flex items-center gap-2 hover:scale-105 transition"
              >
                <span className="font-semibold text-white">{acc.platform}:</span>
                <span className="text-slate-300">{acc.label}</span>
                <ExternalLink size={12} className="opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}