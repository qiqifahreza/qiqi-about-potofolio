import { Send, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contacts() {
  const { isDark, primaryColor, secondaryColor, contacts, contactSettings } = usePortfolio();

  const themeTitle = isDark ? 'text-white' : 'text-zinc-900';
  const themeMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const themeBody = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <section id="contact" className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="text-center mb-10">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${themeTitle}`}>{contactSettings.title}</h2>
          <p className={`text-xs sm:text-sm mt-2 ${themeMuted}`}>
            {contactSettings.description}
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Pesan berhasil terkirim!'); }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`text-xs font-medium block mb-1 ${themeMuted}`}>Nama</label>
              <input 
                type="text" 
                required 
                placeholder="Nama Lengkap Anda" 
                className={`w-full px-4 py-3 rounded-xl glass-panel border focus:outline-none focus:border-cyan-400 text-sm ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-400' : 'bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-500'}`}
              />
            </div>
            <div>
              <label className={`text-xs font-medium block mb-1 ${themeMuted}`}>Email</label>
              <input 
                type="email" 
                required 
                placeholder="email@example.com" 
                className={`w-full px-4 py-3 rounded-xl glass-panel border focus:outline-none focus:border-cyan-400 text-sm ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-400' : 'bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-500'}`}
              />
            </div>
          </div>

          <div>
            <label className={`text-xs font-medium block mb-1 ${themeMuted}`}>Pesan</label>
            <textarea 
              rows={4} 
              required 
              placeholder="Ceritakan tentang proyek Anda..." 
              className={`w-full px-4 py-3 rounded-xl glass-panel border focus:outline-none focus:border-cyan-400 text-sm ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-400' : 'bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-500'}`}
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

        <div className={`mt-10 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <h3 className={`text-xs font-semibold text-center uppercase tracking-wider mb-4 ${themeMuted}`}>
            Atau Hubungi Lewat Akun Resmi:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {contacts.map(acc => (
              <a 
                key={acc.id} 
                href={acc.url} 
                target="_blank" 
                rel="noreferrer"
                className={`px-4 py-2 rounded-xl glass-panel text-xs font-mono flex items-center gap-2 hover:scale-105 transition ${themeBody}`}
              >
                <span className={`font-semibold ${themeTitle}`}>{acc.platform}:</span>
                <span className={themeBody}>{acc.label}</span>
                <ExternalLink size={12} className="opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}