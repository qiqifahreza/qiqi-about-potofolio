import React, { useState } from 'react';
import { Upload, Link as LinkIcon, ImageIcon } from 'lucide-react';

function processLocalImage(file: File, maxWidth = 1000): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(mimeType, 0.85));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export default function ImageInputControl({
  label,
  value,
  onChange,
  accentColor,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  accentColor: string;
}) {
  const [mode, setMode] = useState<'url' | 'file'>('url');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const base64 = await processLocalImage(file);
      onChange(base64);
    } catch {
      alert('Gagal memproses gambar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-300">{label}</label>
        <div className="flex rounded-xl bg-white/10 p-0.5 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              mode === 'url' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon size={12} /> URL
          </button>
          <button
            type="button"
            onClick={() => setMode('file')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              mode === 'file' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload size={12} /> Upload File
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-cyan-400"
        />
      ) : (
        <label className="flex flex-col items-center justify-center border border-dashed border-white/20 hover:border-white/40 rounded-xl p-3 cursor-pointer bg-white/5 transition">
          <Upload size={18} className="mb-1 text-slate-400" />
          <span className="text-[11px] text-slate-300">
            {loading ? 'Mengompresi Gambar...' : 'Pilih File Gambar (PNG / JPG)'}
          </span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      )}

      {value && (
        <div className="flex items-center gap-3 pt-2 border-t border-white/10">
          <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-slate-200 flex items-center gap-1">
              <ImageIcon size={13} style={{ color: accentColor }} /> Pratinjau Gambar Aktif
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {value.startsWith('data:') ? 'File Lokal (Tersimpan)' : value}
            </div>
          </div>
          <button type="button" onClick={() => onChange('')} className="text-[10px] text-rose-400 hover:underline">
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}