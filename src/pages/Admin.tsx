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
  Plus, 
  Trash2, 
  RotateCcw,
  ExternalLink,
  Check,
  Upload,
  Link as LinkIcon,
  ImageIcon,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import LiquidBackground from '../components/LiquidBackground';

const PRESET_THEMES = [
  { name: 'Neon Cyber', primary: '#06b6d4', secondary: '#8b5cf6' },
  { name: 'Sunset Glow', primary: '#f43f5e', secondary: '#f59e0b' },
  { name: 'Emerald Ocean', primary: '#10b981', secondary: '#0284c7' },
  { name: 'Royal Purple', primary: '#a855f7', secondary: '#ec4899' },
];

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

function ImageInputControl({ label, value, onChange, accentColor }: {
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

export default function Admin() {
  const { 
    isDark, 
    primaryColor, 
    setPrimaryColor, 
    secondaryColor, 
    setSecondaryColor,
    general,
    updateGeneral,
    personal,
    updatePersonal,
    addSkill,
    removeSkill,
    addEducation,
    deleteEducation,
    addExperience,
    deleteExperience,
    projects,
    addProject,
    deleteProject,
    certificates,
    addCertificate,
    deleteCertificate,
    awards,
    addAward,
    deleteAward,
    contacts,
    addContact,
    deleteContact,
    contactSettings,
    updateContactSettings,
    adminCredentials,
    updateAdminCredentials,
    resetAllData
  } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'tentang' | 'projek' | 'sertifikat' | 'contact'>('general');

  // Input states
  const [newSkill, setNewSkill] = useState('');

  // Education form
  const [eduInst, setEduInst] = useState('');
  const [eduMajor, setEduMajor] = useState('');
  const [eduSub, setEduSub] = useState('');
  const [eduPeriod, setEduPeriod] = useState('');

  // Experience form
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expSub, setExpSub] = useState('');
  const [expPeriod, setExpPeriod] = useState('');

  // Project form
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTags, setProjTags] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projDemo, setProjDemo] = useState('');
  const [projImage, setProjImage] = useState('');

  // Certificate form
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certYear, setCertYear] = useState('');
  const [certId, setCertId] = useState('');
  const [certImage, setCertImage] = useState('');

  // Award form
  const [awardTitle, setAwardTitle] = useState('');
  const [awardIssuer, setAwardIssuer] = useState('');
  const [awardYear, setAwardYear] = useState('');
  const [awardDesc, setAwardDesc] = useState('');
  const [awardImage, setAwardImage] = useState('');

  // Contact form
  const [contactPlatform, setContactPlatform] = useState('');
  const [contactLabel, setContactLabel] = useState('');
  const [contactUrl, setContactUrl] = useState('');

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
    <div className={`min-h-screen relative font-sans ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <LiquidBackground />

      {saveAlert && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-xl glass-panel bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2 shadow-2xl text-xs font-mono animate-bounce">
          <Check size={16} /> Perubahan Disimpan Otomatis!
        </div>
      )}

      {!isAuthenticated ? (
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8">
          
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

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
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

          {/* TAB CONTENTS */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl">
            
            {/* ================= TAB 1: GENERAL (BERANDA) ================= */}
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Pengaturan Beranda & Tema</h2>
                  <p className="text-xs text-slate-400">Atur palet warna aksen, foto utama Hero di Beranda, teks serif, dan logo navbar.</p>
                </div>

                {/* 1. Pengaturan Identitas Website & Tab Browser */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Identitas Website & Tab Browser
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Judul Halaman Web (Browser Tab Title):
                      </label>
                      <input 
                        type="text" 
                        value={general.webTitle || ''} 
                        onChange={(e) => updateGeneral({ webTitle: e.target.value })}
                        placeholder="Mochamad Rifki Al Farizi - Portfolio"
                        className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Teks yang muncul di tab browser paling atas.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Teks Logo Navbar (Contoh: Rifki):
                      </label>
                      <input 
                        type="text" 
                        value={general.logoText} 
                        onChange={(e) => updateGeneral({ logoText: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-mono"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Akan tampil dalam format &lt;Nama /&gt; jika tidak memakai logo gambar.
                      </p>
                    </div>

                    <div>
                      <ImageInputControl
                        label="Icon Logo Tab Browser (Favicon Pengganti Logo Vite):"
                        value={general.faviconUrl || ''}
                        onChange={(val) => updateGeneral({ faviconUrl: val })}
                        accentColor={primaryColor}
                      />
                    </div>

                    <div>
                      <ImageInputControl
                        label="Gambar Logo Navbar (Upload Logo Khusus):"
                        value={general.navbarLogoUrl || ''}
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
                            triggerSaveNotification();
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Foto Model Khusus Beranda (Hero Cutout)
                  </h3>
                  <ImageInputControl
                    label="Pilih Foto Khusus Beranda:"
                    value={general.heroImageUrl}
                    onChange={(val) => updateGeneral({ heroImageUrl: val })}
                    accentColor={primaryColor}
                  />
                </div>

                {/* 4. Hero Texts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Badge Teks Hero:</label>
                    <input 
                      type="text" 
                      value={general.badgeText} 
                      onChange={(e) => updateGeneral({ badgeText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Teks Katakana Jepang:</label>
                    <input 
                      type="text" 
                      value={general.heroKatakana} 
                      onChange={(e) => updateGeneral({ heroKatakana: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Teks Besar Serif (RIFKI):</label>
                    <input 
                      type="text" 
                      value={general.heroBigText} 
                      onChange={(e) => updateGeneral({ heroBigText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs font-serif"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Teks Sambung Signature (Al Farizi):</label>
                    <input 
                      type="text" 
                      value={general.heroSignature} 
                      onChange={(e) => updateGeneral({ heroSignature: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Status Title:</label>
                    <input 
                      type="text" 
                      value={general.currentStatusTitle} 
                      onChange={(e) => updateGeneral({ currentStatusTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-400 block mb-1">Deskripsi Status Saat Ini:</label>
                    <textarea 
                      rows={2}
                      value={general.currentStatusText} 
                      onChange={(e) => updateGeneral({ currentStatusText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: TENTANG (CV, EDUCATION & EXPERIENCE) ================= */}
            {activeTab === 'tentang' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Pengaturan Profil & CV (Tentang Aku)</h2>
                  <p className="text-xs text-slate-400">Atur foto profil khusus halaman Tentang, sapaan, bio, serta riwayat Education & Experience.</p>
                </div>

                {/* Foto Khusus Halaman Tentang (Terpisah dari Beranda) */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Foto Profil Khusus Halaman Tentang
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Foto ini khusus ditampilkan di halaman Tentang (berbeda dengan foto Beranda):
                  </p>
                  <ImageInputControl
                    label="Pilih Foto Khusus Tentang:"
                    value={personal.aboutImageUrl}
                    onChange={(val) => updatePersonal({ aboutImageUrl: val })}
                    accentColor={primaryColor}
                  />
                </div>

                {/* Profile Text Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Teks Sapaan (Greeting):</label>
                    <input 
                      type="text" 
                      value={personal.greeting || "Hi, I'm"} 
                      onChange={(e) => updatePersonal({ greeting: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">Nama Lengkap Tampilan:</label>
                    <input 
                      type="text" 
                      value={personal.name} 
                      onChange={(e) => updatePersonal({ name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-400 block mb-1">Link File CV (Google Drive / Link Dokumen):</label>
                    <input 
                      type="url" 
                      value={personal.cvUrl || ''} 
                      onChange={(e) => updatePersonal({ cvUrl: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-400 block mb-1">Paragraf Bio Profil:</label>
                    <textarea 
                      rows={3}
                      value={personal.bio} 
                      onChange={(e) => updatePersonal({ bio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs leading-relaxed"
                    />
                  </div>
                </div>

                {/* CRUD EDUCATION */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <GraduationCap size={16} /> Kelola Riwayat Pendidikan (Education)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nama Institusi / Universitas (cth: Universitas Brawijaya)" 
                      value={eduInst} 
                      onChange={(e) => setEduInst(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Jurusan / Program Studi (cth: Information Technology Education)" 
                      value={eduMajor} 
                      onChange={(e) => setEduMajor(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Keterangan Fakultas / Jenjang (cth: FILKOM UB • Undergraduate)" 
                      value={eduSub} 
                      onChange={(e) => setEduSub(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Periode Tahun (cth: 2025 – Present)" 
                      value={eduPeriod} 
                      onChange={(e) => setEduPeriod(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      if (!eduInst || !eduMajor) return;
                      addEducation({
                        institution: eduInst,
                        major: eduMajor,
                        subDetail: eduSub || 'Undergraduate',
                        period: eduPeriod || 'Present'
                      });
                      setEduInst('');
                      setEduMajor('');
                      setEduSub('');
                      setEduPeriod('');
                      triggerSaveNotification();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <Plus size={14} /> Tambah Pendidikan
                  </button>

                  <div className="space-y-2 mt-3">
                    {(personal.education || []).map((edu, i) => (
                      <div key={edu.id || i} className="p-3 rounded-xl glass-panel flex items-center justify-between text-xs border border-white/10">
                        <div>
                          <div className="font-bold text-white">{edu.institution} <span className="opacity-60 font-mono">({edu.period})</span></div>
                          <div className="text-slate-400 text-[11px]">{edu.major} • {edu.subDetail}</div>
                        </div>
                        <button onClick={() => deleteEducation(edu.id)} className="text-rose-400 p-1 hover:bg-rose-500/20 rounded">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CRUD EXPERIENCE */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Briefcase size={16} /> Kelola Pengalaman Kerja & Organisasi (Experience)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Perusahaan / Organisasi (cth: Google Indonesia)" 
                      value={expCompany} 
                      onChange={(e) => setExpCompany(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Posisi / Peran (cth: Google Student Ambassador)" 
                      value={expRole} 
                      onChange={(e) => setExpRole(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Keterangan / Divisi (cth: Universitas Brawijaya • Ambassador)" 
                      value={expSub} 
                      onChange={(e) => setExpSub(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Periode Tahun (cth: 2026)" 
                      value={expPeriod} 
                      onChange={(e) => setExpPeriod(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      if (!expCompany || !expRole) return;
                      addExperience({
                        company: expCompany,
                        role: expRole,
                        subDetail: expSub || 'Staff',
                        period: expPeriod || '2026'
                      });
                      setExpCompany('');
                      setExpRole('');
                      setExpSub('');
                      setExpPeriod('');
                      triggerSaveNotification();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <Plus size={14} /> Tambah Pengalaman
                  </button>

                  <div className="space-y-2 mt-3">
                    {(personal.experience || []).map((exp, i) => (
                      <div key={exp.id || i} className="p-3 rounded-xl glass-panel flex items-center justify-between text-xs border border-white/10">
                        <div>
                          <div className="font-bold text-white">{exp.company} <span className="opacity-60 font-mono">({exp.period})</span></div>
                          <div className="text-slate-400 text-[11px]">{exp.role} • {exp.subDetail}</div>
                        </div>
                        <button onClick={() => deleteExperience(exp.id)} className="text-rose-400 p-1 hover:bg-rose-500/20 rounded">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="pt-4 border-t border-white/10">
                  <label className="text-xs font-semibold block mb-2">Daftar Keahlian (Skills):</label>
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      value={newSkill} 
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Tambah skill baru"
                      className="flex-1 px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        addSkill(newSkill);
                        setNewSkill('');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                    >
                      <Plus size={16} /> Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {personal.skills.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 rounded-lg glass-panel text-xs font-mono flex items-center gap-2">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-rose-400">✕</button>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB 3: PROJEK ================= */}
            {activeTab === 'projek' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">Dokumentasi & Portofolio Projek</h2>
                  <p className="text-xs text-slate-400">Tambahkan proyek baru lengkap dengan gambar mockup (upload file / URL).</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Plus size={14} /> Tambah Projek Baru
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Judul Projek" 
                      value={projTitle} 
                      onChange={(e) => setProjTitle(e.target.value)}
                      className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Kategori (misal: Full-Stack Web App, AI Tool)" 
                      value={projCategory} 
                      onChange={(e) => setProjCategory(e.target.value)}
                      className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Tags Teknologi (pisahkan koma: React, TypeScript, Tailwind)" 
                      value={projTags} 
                      onChange={(e) => setProjTags(e.target.value)}
                      className="sm:col-span-2 px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="url" 
                      placeholder="Link GitHub Repository" 
                      value={projGithub} 
                      onChange={(e) => setProjGithub(e.target.value)}
                      className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="url" 
                      placeholder="Link Live Demo" 
                      value={projDemo} 
                      onChange={(e) => setProjDemo(e.target.value)}
                      className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />

                    <div className="sm:col-span-2">
                      <ImageInputControl
                        label="Gambar Mockup Projek:"
                        value={projImage}
                        onChange={(val) => setProjImage(val)}
                        accentColor={primaryColor}
                      />
                    </div>

                    <textarea 
                      rows={2}
                      placeholder="Deskripsi singkat projek..."
                      value={projDesc} 
                      onChange={(e) => setProjDesc(e.target.value)}
                      className="sm:col-span-2 px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      if (!projTitle) return;
                      addProject({
                        title: projTitle,
                        category: projCategory || 'Web Development',
                        description: projDesc,
                        tags: projTags ? projTags.split(',').map(t => t.trim()) : ['React'],
                        github: projGithub || '#',
                        demo: projDemo || '#',
                        imageUrl: projImage || undefined
                      });
                      setProjTitle('');
                      setProjCategory('');
                      setProjDesc('');
                      setProjTags('');
                      setProjGithub('');
                      setProjDemo('');
                      setProjImage('');
                      triggerSaveNotification();
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2 shadow"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <Plus size={15} /> Simpan Projek
                  </button>
                </div>

                {/* List Projects */}
                <div className="space-y-3">
                  {projects.map(item => (
                    <div key={item.id} className="p-4 rounded-xl glass-panel flex items-center justify-between gap-3 border border-white/10">
                      <div className="flex items-center gap-3">
                        {item.imageUrl && (
                          <div className="w-12 h-12 rounded-xl bg-black/40 overflow-hidden shrink-0 border border-white/10">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-white">{item.title}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{item.description}</div>
                        </div>
                      </div>
                      <button onClick={() => deleteProject(item.id)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 4: SERTIFIKAT & AWARDS ================= */}
            {activeTab === 'sertifikat' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Pengaturan Sertifikat & Penghargaan (Awards)</h2>
                  <p className="text-xs text-slate-400">Atur kartu piagam sertifikat dan piala penghargaan kompetisi.</p>
                </div>

                {/* Form Tambah Sertifikat */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Award size={15} /> Tambah Sertifikat Baru
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nama Sertifikasi" 
                      value={certTitle} 
                      onChange={(e) => setCertTitle(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Lembaga Penerbit (Meta, AWS, dll.)" 
                      value={certIssuer} 
                      onChange={(e) => setCertIssuer(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Tahun (cth: 2026)" 
                      value={certYear} 
                      onChange={(e) => setCertYear(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Credential ID" 
                      value={certId} 
                      onChange={(e) => setCertId(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <div className="sm:col-span-2">
                      <ImageInputControl
                        label="Gambar Piagam Sertifikat:"
                        value={certImage}
                        onChange={(val) => setCertImage(val)}
                        accentColor={primaryColor}
                      />
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!certTitle) return;
                      addCertificate({
                        title: certTitle,
                        issuer: certIssuer || 'Organization',
                        year: certYear || '2026',
                        credentialId: certId || 'VERIFIED',
                        imageUrl: certImage || undefined
                      });
                      setCertTitle('');
                      setCertIssuer('');
                      setCertYear('');
                      setCertId('');
                      setCertImage('');
                      triggerSaveNotification();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <Plus size={14} /> Simpan Sertifikat
                  </button>

                  <div className="space-y-2 mt-2">
                    {certificates.map(item => (
                      <div key={item.id} className="p-3 rounded-xl glass-panel flex items-center justify-between text-xs border border-white/10">
                        <span>{item.title} ({item.issuer})</span>
                        <button onClick={() => deleteCertificate(item.id)} className="text-rose-400 p-1">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Tambah Awards */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Award size={15} /> Tambah Penghargaan (Awards) Baru
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nama Penghargaan / Juara" 
                      value={awardTitle} 
                      onChange={(e) => setAwardTitle(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Penyelenggara Kompetisi" 
                      value={awardIssuer} 
                      onChange={(e) => setAwardIssuer(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Tahun" 
                      value={awardYear} 
                      onChange={(e) => setAwardYear(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Deskripsi Singkat Prestasi" 
                      value={awardDesc} 
                      onChange={(e) => setAwardDesc(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                    <div className="sm:col-span-2">
                      <ImageInputControl
                        label="Foto Piagam / Piala Award:"
                        value={awardImage}
                        onChange={(val) => setAwardImage(val)}
                        accentColor={primaryColor}
                      />
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!awardTitle) return;
                      addAward({
                        title: awardTitle,
                        issuer: awardIssuer || 'Competition',
                        year: awardYear || '2026',
                        description: awardDesc,
                        imageUrl: awardImage || undefined
                      });
                      setAwardTitle('');
                      setAwardIssuer('');
                      setAwardYear('');
                      setAwardDesc('');
                      setAwardImage('');
                      triggerSaveNotification();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <Plus size={14} /> Simpan Award
                  </button>

                  <div className="space-y-2 mt-2">
                    {awards.map(item => (
                      <div key={item.id} className="p-3 rounded-xl glass-panel flex items-center justify-between text-xs border border-white/10">
                        <span>{item.title} ({item.issuer})</span>
                        <button onClick={() => deleteAward(item.id)} className="text-rose-400 p-1">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ================= TAB 5: CONTACT ================= */}
            {activeTab === 'contact' && (
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
                    <input 
                      type="text" 
                      placeholder="Platform (GitHub, LinkedIn, WhatsApp, dll.)" 
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
                      placeholder="URL Lengkap (https://...)" 
                      value={contactUrl} 
                      onChange={(e) => setContactUrl(e.target.value)}
                      className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!contactPlatform || !contactUrl) return;
                      addContact({
                        platform: contactPlatform,
                        label: contactLabel || contactPlatform,
                        url: contactUrl
                      });
                      setContactPlatform('');
                      setContactLabel('');
                      setContactUrl('');
                      triggerSaveNotification();
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
            )}

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