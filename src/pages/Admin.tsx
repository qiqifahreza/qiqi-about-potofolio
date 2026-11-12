import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  Unlock, 
  ArrowLeft, 
  Settings, 
  User, 
  FolderGit2, 
  Award, 
  Share2, 
  RotateCcw,
  ExternalLink,
  Check
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import LiquidBackground from '../components/LiquidBackground';

// Import sub-komponen tab yang sudah dipecah
import GeneralTab from './admin/GeneralTab';
import AboutTab from './admin/AboutTab';
import ProjectsTab from './admin/ProjectsTab';
import CertificatesTab from './admin/CertificatesTab';
import ContactsTab from './admin/ContactsTab';

export default function Admin() {
  const { 
    isDark, 
    primaryColor, 
    secondaryColor, 
    adminCredentials, 
    updateAdminCredentials, 
    isSaving, 
    savePortfolio, 
    resetAllData 
  } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'tentang' | 'projek' | 'sertifikat' | 'contact'>('general');
  const [saveAlert, setSaveAlert] = useState(false);

  const triggerSaveNotification = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      usernameInput.trim() === adminCredentials.username.trim() &&
      passwordInput === adminCredentials.password
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setPasswordError(false);
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  return (
    <div className={`page-fade-up min-h-screen relative font-sans ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <LiquidBackground />

      {/* Notifikasi Toast Disimpan */}
      {saveAlert && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-xl glass-panel bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2 shadow-2xl text-xs font-mono animate-bounce">
          <Check size={16} /> Perubahan Disimpan!
        </div>
      )}

      {!isAuthenticated ? (
        /* Form Login Admin */
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-8 rounded-3xl shadow-2xl relative border border-white/20 z-10 backdrop-blur-2xl">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5">
                <ArrowLeft size={14} /> Beranda
              </Link>
              <span className="text-[10px] font-mono opacity-50">PORTFOLIO CMS</span>
            </div>

            <div 
              className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center mb-4 shadow-inner"
              style={{ color: primaryColor }}
            >
              <Lock size={26} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight">Admin CMS Panel</h1>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Kelola teks, tema, CV, proyek, sertifikat, dan kontak secara dinamis.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 block mb-1">Username</label>
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder={`Username admin (${adminCredentials.username})`}
                  className="w-full px-4 py-3 rounded-xl glass-panel bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 block mb-1">Password</label>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={`Password admin (${adminCredentials.password})`}
                  className="w-full px-4 py-3 rounded-xl glass-panel bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-cyan-400"
                />
                {passwordError && (
                  <p className="text-xs text-rose-400 mt-2">Username atau password salah!</p>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white shadow-xl hover:scale-[1.01] active:scale-[0.99] transition"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Masuk ke Panel Admin
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Dashboard Admin Terbuka */
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8">
          
          {/* Ubah Password Admin */}
          <div className="glass-panel rounded-2xl p-5 mb-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">Modifier Akun Admin</p>
                <h3 className="text-lg font-bold">Username & Password</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-2 w-full max-w-xl">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 block mb-1">Username</label>
                  <input
                    type="text"
                    value={adminCredentials.username}
                    onChange={(e) => updateAdminCredentials({ username: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 block mb-1">Password</label>
                  <input
                    type="text"
                    value={adminCredentials.password}
                    onChange={(e) => updateAdminCredentials({ password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Header Bar */}
          <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-emerald-400">
                <Unlock size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin Management Panel</h1>
                <p className="text-xs text-slate-400">Mochamad Rifki Al Farizi • Portfolio Controller</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
              <button
                type="button"
                onClick={() => void savePortfolio()}
                disabled={isSaving}
                className="px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider transition disabled:opacity-60 text-white"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                {isSaving ? 'Menyimpan...' : 'Simpan ke Cloud'}
              </button>
              <Link 
                to="/" 
                className="px-4 py-2 rounded-xl glass-panel text-xs font-mono uppercase tracking-wider hover:text-white flex items-center gap-1.5 transition"
              >
                <ExternalLink size={14} /> Lihat Web
              </Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono uppercase tracking-wider hover:bg-rose-500/20 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'general' ? 'glass-panel text-white shadow-lg border-b-2' : 'bg-white/5 opacity-70 hover:opacity-100'
              }`}
              style={{ borderColor: activeTab === 'general' ? primaryColor : 'transparent' }}
            >
              <Settings size={16} style={{ color: primaryColor }} /> General (Beranda)
            </button>

            <button
              onClick={() => setActiveTab('tentang')}
              className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'tentang' ? 'glass-panel text-white shadow-lg border-b-2' : 'bg-white/5 opacity-70 hover:opacity-100'
              }`}
              style={{ borderColor: activeTab === 'tentang' ? primaryColor : 'transparent' }}
            >
              <User size={16} style={{ color: primaryColor }} /> Tentang (CV)
            </button>

            <button
              onClick={() => setActiveTab('projek')}
              className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'projek' ? 'glass-panel text-white shadow-lg border-b-2' : 'bg-white/5 opacity-70 hover:opacity-100'
              }`}
              style={{ borderColor: activeTab === 'projek' ? primaryColor : 'transparent' }}
            >
              <FolderGit2 size={16} style={{ color: primaryColor }} /> Projek
            </button>

            <button
              onClick={() => setActiveTab('sertifikat')}
              className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'sertifikat' ? 'glass-panel text-white shadow-lg border-b-2' : 'bg-white/5 opacity-70 hover:opacity-100'
              }`}
              style={{ borderColor: activeTab === 'sertifikat' ? primaryColor : 'transparent' }}
            >
              <Award size={16} style={{ color: primaryColor }} /> Sertifikat & Awards
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'contact' ? 'glass-panel text-white shadow-lg border-b-2' : 'bg-white/5 opacity-70 hover:opacity-100'
              }`}
              style={{ borderColor: activeTab === 'contact' ? primaryColor : 'transparent' }}
            >
              <Share2 size={16} style={{ color: primaryColor }} /> Contact
            </button>
          </div>

          {/* TAB CONTENTS (MEMANGGIL SUB-FILE) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl">
            {activeTab === 'general' && <GeneralTab onSave={triggerSaveNotification} />}
            {activeTab === 'tentang' && <AboutTab onSave={triggerSaveNotification} />}
            {activeTab === 'projek' && <ProjectsTab onSave={triggerSaveNotification} />}
            {activeTab === 'sertifikat' && <CertificatesTab onSave={triggerSaveNotification} />}
            {activeTab === 'contact' && <ContactsTab onSave={triggerSaveNotification} />}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-8">
              <button 
                type="button"
                onClick={() => {
                  if (confirm('Reset seluruh data ke pengaturan awal?')) {
                    resetAllData();
                    triggerSaveNotification();
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-mono transition"
              >
                <RotateCcw size={14} /> Reset ke Data Default
              </button>

              <Link 
                to="/"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white uppercase tracking-wider shadow-lg hover:scale-105 transition"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Lihat Hasil Live
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}