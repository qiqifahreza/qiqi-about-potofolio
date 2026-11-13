import { usePortfolio } from '../../context/PortfolioContext';
import ImageInputControl from '../../components/admin/ImageInputControl';

const PRESET_THEMES = [
  { name: 'Neon Cyber', primary: '#06b6d4', secondary: '#8b5cf6' },
  { name: 'Sunset Glow', primary: '#f43f5e', secondary: '#f59e0b' },
  { name: 'Emerald Ocean', primary: '#10b981', secondary: '#0284c7' },
  { name: 'Royal Purple', primary: '#a855f7', secondary: '#ec4899' },
];

export default function GeneralTab({ onSave }: { onSave: () => void }) {
  const { 
    primaryColor, 
    setPrimaryColor, 
    secondaryColor, 
    setSecondaryColor, 
    general, 
    updateGeneral 
  } = usePortfolio();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-1">Pengaturan Beranda & Tema</h2>
        <p className="text-xs text-slate-400">Atur palet warna aksen, foto utama Hero di Beranda, teks serif, dan logo navbar.</p>
      </div>

      {/* 1. Identitas Website & Navbar */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Identitas Website & Tab Browser</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Judul Tab Browser:</label>
            <input 
              type="text" 
              value={general.webTitle ?? ''} 
              onChange={(e) => updateGeneral({ webTitle: e.target.value })}
              placeholder="Mochamad Rifki Al Farizi - Portfolio"
              className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Teks Logo Navbar:</label>
            <input 
              type="text" 
              value={general.logoText ?? ''} 
              onChange={(e) => updateGeneral({ logoText: e.target.value })}
              placeholder="Rifki"
              className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-mono"
            />
          </div>
          <div>
            <ImageInputControl
              label="Icon Logo Tab Browser (Favicon):"
              value={general.faviconUrl ?? ''}
              onChange={(val) => updateGeneral({ faviconUrl: val })}
              accentColor={primaryColor}
            />
          </div>
          <div>
            <ImageInputControl
              label="Gambar Logo Navbar (Opsional):"
              value={general.navbarLogoUrl ?? ''}
              onChange={(val) => updateGeneral({ navbarLogoUrl: val })}
              accentColor={primaryColor}
            />
          </div>
        </div>
      </div>

      {/* 2. Color Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
        <div>
          <label className="text-xs font-medium block mb-1.5">Warna Primary:</label>
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)} 
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
            />
            <input 
              type="text" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)} 
              className="flex-1 px-3 py-2 rounded-xl glass-panel text-xs font-mono uppercase"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium block mb-1.5">Warna Secondary:</label>
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={secondaryColor} 
              onChange={(e) => setSecondaryColor(e.target.value)} 
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
            />
            <input 
              type="text" 
              value={secondaryColor} 
              onChange={(e) => setSecondaryColor(e.target.value)} 
              className="flex-1 px-3 py-2 rounded-xl glass-panel text-xs font-mono uppercase"
            />
          </div>
        </div>
        <div className="sm:col-span-2 pt-2">
          <label className="text-xs font-medium block mb-2">Preset Cepat:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_THEMES.map((theme, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPrimaryColor(theme.primary);
                  setSecondaryColor(theme.secondary);
                  onSave();
                }}
                className="px-3 py-2 rounded-xl glass-panel text-[11px] flex items-center justify-between hover:border-white/30"
              >
                <span>{theme.name}</span>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Hero Photo Beranda */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Foto Model Khusus Beranda (Hero Cutout)</h3>
        <ImageInputControl
          label="Pilih Foto Khusus Beranda:"
          value={general.heroImageUrl ?? ''}
          onChange={(val) => updateGeneral({ heroImageUrl: val })}
          accentColor={primaryColor}
        />
      </div>

      {/* 4. Hero Magazine Details (BEBAS DIHAPUS SAMPAI KOSONG) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Badge Teks Hero (Kiri Atas):</label>
          <input 
            type="text" 
            value={general.badgeText ?? ''} 
            onChange={(e) => updateGeneral({ badgeText: e.target.value })}
            placeholder="DEV 2026"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Judul Jikosoukai (Kiri Atas):</label>
          <input 
            type="text" 
            value={general.jikosoukaiTitle ?? ''} 
            onChange={(e) => updateGeneral({ jikosoukaiTitle: e.target.value })}
            placeholder="JIKOSOUKAI"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-mono uppercase"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Teks Tanggal / Info (Kanan Atas):</label>
          <input 
            type="text" 
            value={general.heroMetaText ?? ''} 
            onChange={(e) => updateGeneral({ heroMetaText: e.target.value })}
            placeholder="Rifki.09-01-2006"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-serif italic"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Teks Katakana Jepang (Atas Nama):</label>
          <input 
            type="text" 
            value={general.heroKatakana ?? ''} 
            onChange={(e) => updateGeneral({ heroKatakana: e.target.value })}
            placeholder="モハマド・リフキ"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Teks Besar Serif (Contoh: RIFKI):</label>
          <input 
            type="text" 
            value={general.heroBigText ?? ''} 
            onChange={(e) => updateGeneral({ heroBigText: e.target.value })}
            placeholder="RIFKI"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-serif"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Teks Sambung Signature (Contoh: Al Farizi):</label>
          <input 
            type="text" 
            value={general.heroSignature ?? ''} 
            onChange={(e) => updateGeneral({ heroSignature: e.target.value })}
            placeholder="Al Farizi"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-400 block mb-1">Teks Isi Jikosoukai (Kiri Atas):</label>
          <textarea 
            rows={2}
            value={general.heroIntro ?? ''} 
            onChange={(e) => updateGeneral({ heroIntro: e.target.value })}
            placeholder="Tuliskan intro perkenalan..."
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Judul Status / News (Kiri Bawah):</label>
          <input 
            type="text" 
            value={general.currentStatusTitle ?? ''} 
            onChange={(e) => updateGeneral({ currentStatusTitle: e.target.value })}
            placeholder="Current Status !!"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Quote Author (Kanan Bawah):</label>
          <input 
            type="text" 
            value={general.heroQuoteAuthor ?? ''} 
            onChange={(e) => updateGeneral({ heroQuoteAuthor: e.target.value })}
            placeholder="~Mochamad Rifki Al Farizi~"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-400 block mb-1">Deskripsi News (Kiri Bawah):</label>
          <textarea 
            rows={2}
            value={general.heroDescription ?? general.currentStatusText ?? ''} 
            onChange={(e) => {
              updateGeneral({ heroDescription: e.target.value, currentStatusText: e.target.value });
            }}
            placeholder="Deskripsi status atau berita..."
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-400 block mb-1">The Question Is Quote (Kanan Bawah):</label>
          <input 
            type="text" 
            value={general.heroQuote ?? ''} 
            onChange={(e) => updateGeneral({ heroQuote: e.target.value })}
            placeholder="It's not impossible, it's just hard"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
      </div>
    </div>
  );
}