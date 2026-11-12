import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ContactsTab({ onSave }: { onSave: () => void }) {
  const { primaryColor, secondaryColor, contacts, addContact, deleteContact, contactSettings, updateContactSettings } = usePortfolio();

  const [contactPlatform, setContactPlatform] = useState('');
  const [contactLabel, setContactLabel] = useState('');
  const [contactUrl, setContactUrl] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Pengaturan Halaman Kontak</h2>
        <p className="text-xs text-slate-400">Atur teks judul formulir dan daftar akun sosial media resmi Anda.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Judul Kontak:</label>
          <input 
            type="text" 
            value={contactSettings.title} 
            onChange={(e) => updateContactSettings({ title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Deskripsi Formulir Kontak:</label>
          <input 
            type="text" 
            value={contactSettings.description} 
            onChange={(e) => updateContactSettings({ description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
          />
        </div>
      </div>

      {/* Form Tambah Kontak */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Plus size={14} /> Tambah Akun Kontak / Sosmed
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="text" placeholder="Platform (GitHub, LinkedIn, dll.)" value={contactPlatform} onChange={(e) => setContactPlatform(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Label Tampilan (cth: @qiqifahreza)" value={contactLabel} onChange={(e) => setContactLabel(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="url" placeholder="URL Lengkap (https://...)" value={contactUrl} onChange={(e) => setContactUrl(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
        </div>
        <button 
          type="button"
          onClick={() => {
            if (!contactPlatform || !contactUrl) return;
            addContact({ platform: contactPlatform, label: contactLabel || contactPlatform, url: contactUrl });
            setContactPlatform(''); setContactLabel(''); setContactUrl('');
            onSave();
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          <Plus size={14} /> Tambah Akun
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {contacts.map(acc => (
            <div key={acc.id} className="p-3 rounded-xl glass-panel flex items-center justify-between border border-white/10 text-xs">
              <div>
                <span className="font-bold text-white">{acc.platform}:</span> {acc.label}
              </div>
              <button onClick={() => deleteContact(acc.id)} className="text-rose-400 p-1">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}