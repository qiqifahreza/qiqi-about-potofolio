import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ContactsTab({ onSave }: { onSave: () => void }) {
  const { primaryColor, secondaryColor, contacts, addContact, deleteContact, contactSettings, updateContactSettings } = usePortfolio();

  const [contactPlatform, setContactPlatform] = useState('');
  const [contactLabel, setContactLabel] = useState('');
  const [contactUrl, setContactUrl] = useState('');

  const selectQuickPreset = (platform: string, defaultUrl: string, placeholderLabel: string) => {
    setContactPlatform(platform);
    if (!contactUrl) setContactUrl(defaultUrl);
    if (!contactLabel) setContactLabel(placeholderLabel);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Pengaturan Halaman Kontak & Sidebar Kanan</h2>
        <p className="text-xs text-slate-400">
          Akun kontak yang Anda tambahkan di sini otomatis muncul di formulir kontak bawah dan di <b>Right HUD Sidebar</b> (ikon GitHub, LinkedIn, Email).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Judul Kontak:</label>
          <input 
            type="text" 
            value={contactSettings.title ?? ''} 
            onChange={(e) => updateContactSettings({ title: e.target.value })}
            placeholder="ESTABLISH CONTACT"
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Deskripsi Formulir Kontak:</label>
          <input 
            type="text" 
            value={contactSettings.description ?? ''} 
            onChange={(e) => updateContactSettings({ description: e.target.value })}
            placeholder="Punya ide menarik atau proyek yang ingin didiskusikan?..."
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Plus size={14} /> Tambah Akun Kontak / Sosmed
          </h3>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">Pintasan:</span>
            <button
              type="button"
              onClick={() => selectQuickPreset('GitHub', 'https://github.com/username', 'github.com/username')}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              + GitHub
            </button>
            <button
              type="button"
              onClick={() => selectQuickPreset('LinkedIn', 'https://linkedin.com/in/username', 'linkedin.com/in/username')}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              + LinkedIn
            </button>
            <button
              type="button"
              onClick={() => selectQuickPreset('Email', 'mailto:email@example.com', 'email@example.com')}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              + Email
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input 
            type="text" 
            placeholder="Platform (GitHub, LinkedIn, Email, dll.)" 
            value={contactPlatform} 
            onChange={(e) => setContactPlatform(e.target.value)} 
            className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" 
          />
          <input 
            type="text" 
            placeholder="Label Tampilan (cth: @qiqifahreza)" 
            value={contactLabel} 
            onChange={(e) => setContactLabel(e.target.value)} 
            className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" 
          />
          <input 
            type="url" 
            placeholder="URL Lengkap (https://... atau mailto:...)" 
            value={contactUrl} 
            onChange={(e) => setContactUrl(e.target.value)} 
            className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" 
          />
        </div>

        <button 
          type="button"
          onClick={() => {
            if (!contactPlatform || !contactUrl) return;
            addContact({ platform: contactPlatform, label: contactLabel || contactPlatform, url: contactUrl });
            setContactPlatform(''); 
            setContactLabel(''); 
            setContactUrl('');
            onSave();
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          <Plus size={14} /> Simpan Akun Kontak
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-white/10">
          {(contacts || []).map(acc => (
            <div key={acc.id} className="p-3 rounded-xl glass-panel flex items-center justify-between border border-white/10 text-xs">
              <div className="truncate pr-2">
                <span className="font-bold text-white uppercase">{acc.platform}:</span>{' '}
                <span className="opacity-75">{acc.label}</span>
              </div>
              <button 
                type="button"
                onClick={() => {
                  deleteContact(acc.id);
                  onSave();
                }} 
                className="text-rose-400 p-1 hover:bg-rose-500/20 rounded cursor-pointer shrink-0"
                title="Hapus Kontak"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}