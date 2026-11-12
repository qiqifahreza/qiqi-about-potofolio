import React, { useState } from 'react';
import { Lock, Unlock, X, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PRESET_THEMES = [
  { name: 'Neon Cyber', primary: '#06b6d4', secondary: '#8b5cf6' },
  { name: 'Sunset Glow', primary: '#f43f5e', secondary: '#f59e0b' },
  { name: 'Emerald Ocean', primary: '#10b981', secondary: '#0284c7' },
  { name: 'Royal Purple', primary: '#a855f7', secondary: '#ec4899' },
];

export default function AdminModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, resetTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl relative border border-white/20">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X size={20} />
        </button>

        {!isAuthenticated ? (
          <div>
            <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center mb-4 text-cyan-400">
              <Lock size={22} style={{ color: primaryColor }} />
            </div>
            <h3 className="text-xl font-bold">Admin Theme Controller</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Masukkan passcode untuk mengatur warna dan tema portofolio Anda.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Passcode (Default: admin123)"
                  className="w-full px-4 py-3 rounded-xl glass-panel bg-white/5 border border-white/10 text-sm focus:outline-none"
                />
                {passwordError && (
                  <p className="text-xs text-rose-400 mt-1.5">Passcode salah! Gunakan: admin123</p>
                )}
              </div>
              <button 
                type="submit" 
                className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-white transition"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Buka Akses Admin
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Unlock size={20} className="text-emerald-400" />
                <h3 className="text-lg font-bold">Pengaturan Warna & Tema</h3>
              </div>
              <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-mono text-slate-400 hover:text-rose-400">
                Kunci Kembali
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Ubah warna secara real-time. Perubahan otomatis disimpan ke browser.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-medium block mb-1.5 flex justify-between">
                  <span>Warna Primary:</span>
                  <span className="font-mono text-[11px] opacity-75">{primaryColor}</span>
                </label>
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
                <label className="text-xs font-medium block mb-1.5 flex justify-between">
                  <span>Warna Secondary:</span>
                  <span className="font-mono text-[11px] opacity-75">{secondaryColor}</span>
                </label>
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
            </div>

            {/* Presets */}
            <div className="mb-6">
              <label className="text-xs font-medium block mb-2">Preset Palet Cepat:</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_THEMES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrimaryColor(item.primary);
                      setSecondaryColor(item.secondary);
                    }}
                    className="p-2.5 rounded-xl glass-panel text-left flex items-center justify-between text-xs hover:border-white/40 transition"
                  >
                    <span>{item.name}</span>
                    <div className="flex gap-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.primary }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.secondary }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button onClick={resetTheme} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
                <RotateCcw size={14} /> Reset
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white uppercase tracking-wider transition"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Tutup Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}