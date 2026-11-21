import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageInputControl from '../../components/admin/ImageInputControl';

export default function GeneralTab({ onSave }: { onSave: () => void }) {
  const { 
    primaryColor, 
    secondaryColor, 
    general, 
    updateGeneral,
    techLogos,
    addTechLogo,
    deleteTechLogo
  } = usePortfolio();

  const [newLogoTitle, setNewLogoTitle] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const [newLogoHref, setNewLogoHref] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-1">Pengaturan Beranda</h2>
        <p className="text-xs text-slate-400">Atur foto utama Hero di Beranda, teks, logo loop, identitas, dan logo navbar.</p>
      </div>

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

      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Foto Model Khusus Beranda (Hero Cutout)</h3>
        <ImageInputControl
          label="Pilih Foto Khusus Beranda:"
          value={general.heroImageUrl ?? ''}
          onChange={(val) => updateGeneral({ heroImageUrl: val })}
          accentColor={primaryColor}
        />
      </div>

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
            value={general.heroDescription ?? ''} 
            onChange={(e) => {
              updateGeneral({ heroDescription: e.target.value });
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

      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Kelola Logo Loop Marquee (Pojok Kanan Atas Beranda)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Logo teknologi atau brand yang berjalan melingkar di atas tanggal lahir.
            </p>
          </div>
          <span className="text-xs font-mono opacity-60">Total: {techLogos?.length || 0} Logo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Nama Logo / Teknologi:</label>
            <input 
              type="text" 
              placeholder="cth: React, Golang, Figma" 
              value={newLogoTitle} 
              onChange={(e) => setNewLogoTitle(e.target.value)} 
              className="w-full px-3 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Link URL Website (Opsional):</label>
            <input 
              type="url" 
              placeholder="https://react.dev" 
              value={newLogoHref} 
              onChange={(e) => setNewLogoHref(e.target.value)} 
              className="w-full px-3 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Link Gambar / Icon SVG:</label>
            <input 
              type="text" 
              placeholder="https://... atau data:image..." 
              value={newLogoUrl} 
              onChange={(e) => setNewLogoUrl(e.target.value)} 
              className="w-full px-3 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!newLogoTitle) return;
            addTechLogo({
              title: newLogoTitle,
              src: newLogoUrl || undefined,
              href: newLogoHref || '#',
            });
            setNewLogoTitle('');
            setNewLogoUrl('');
            setNewLogoHref('');
            onSave();
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white uppercase tracking-wider shadow transition"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          + Tambah ke Logo Loop
        </button>

        <div className="pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-2.5">
            {(techLogos || []).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
              >
                {item.src && (
                  <img src={item.src} alt={item.title} className="w-4 h-4 object-contain" />
                )}
                <span className="font-semibold text-slate-200">{item.title}</span>
                <button
                  type="button"
                  onClick={() => {
                    deleteTechLogo(item.id);
                    onSave();
                  }}
                  className="text-slate-400 hover:text-rose-400 transition ml-1"
                  title="Hapus Logo"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}