import React, { useEffect, useState } from 'react';
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
  Check,
  Terminal,
  BookOpen,
  Save,
  LogOut,
  ShieldAlert,
  KeyRound,
} from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { usePortfolio } from '../context/PortfolioContext';
import { supabase } from '../lib/supabase';

import GeneralTab from './admin/GeneralTab';
import AboutTab from './admin/AboutTab';
import ProjectsTab from './admin/ProjectsTab';
import CertificatesTab from './admin/CertificatesTab';
import ContactsTab from './admin/ContactsTab';
import AccountTab from './admin/AccountTab';

type AdminAccess = 'checking' | 'signed-out' | 'admin' | 'forbidden' | 'unavailable';
type AdminTabKey = 'general' | 'tentang' | 'projek' | 'sertifikat' | 'contact' | 'account';

const ADMIN_TABS: { id: AdminTabKey; label: string; icon: typeof Settings; command: string }[] = [
  { id: 'general', label: 'Beranda', icon: Settings, command: '01 /home' },
  { id: 'tentang', label: 'Profil', icon: User, command: '02 /profile' },
  { id: 'projek', label: 'Proyek', icon: FolderGit2, command: '03 /projects' },
  { id: 'sertifikat', label: 'Sertifikat', icon: Award, command: '04 /records' },
  { id: 'contact', label: 'Kontak', icon: Share2, command: '05 /contact' },
  { id: 'account', label: 'Akun Admin', icon: KeyRound, command: '06 /security' },
];

const accessForSession = (session: Session | null): AdminAccess => {
  if (!session) return 'signed-out';
  return session.user.app_metadata.role === 'admin' ? 'admin' : 'forbidden';
};

export default function Admin() {
  const { 
    isDark, 
    isSaving, 
    savePortfolio, 
    resetAllData 
  } = usePortfolio();

  const [access, setAccess] = useState<AdminAccess>(() => supabase ? 'checking' : 'unavailable');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTabKey>('general');
  const [saveAlert, setSaveAlert] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('');

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let ignore = false;

    const syncAuthState = async () => {
      try {
        const { data, error } = await client.auth.getSession();
        if (error) throw error;
        if (!ignore) setAccess(accessForSession(data.session));
      } catch (error) {
        console.error('Supabase admin session check failed:', error);
        if (!ignore) {
          setAuthMessage('Gagal memeriksa sesi Supabase. Muat ulang halaman atau login kembali.');
          setAccess('signed-out');
        }
      }
    };

    void syncAuthState();

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (!ignore) {
        setAccess(accessForSession(session));
      }
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  const triggerSaveNotification = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2000);
  };

  const handleCloudSave = async () => {
    setCloudStatus('SYNCING...');
    try {
      await savePortfolio();
      setCloudStatus('SYNC COMPLETE');
    } catch (error) {
      console.error('Portfolio cloud save failed:', error);
      setCloudStatus(error instanceof Error ? `SYNC FAILED: ${error.message}` : 'SYNC FAILED');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage('');

    if (!supabase) {
      setAuthMessage('Supabase belum dikonfigurasi.');
      return;
    }

    const email = emailInput.trim();
    if (!email || !passwordInput) {
      setAuthMessage('Email dan password wajib diisi.');
      return;
    }

    setIsSigningIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: passwordInput,
      });

      if (error) {
        setAuthMessage(error.message);
        return;
      }

      const nextAccess = accessForSession(data.session);
      setAccess(nextAccess);
      if (nextAccess === 'forbidden') {
        setAuthMessage('Akun ini belum memiliki role admin. Minta role admin di Supabase app_metadata.');
        return;
      }

      setEmailInput('');
      setPasswordInput('');
    } catch (error) {
      console.error('Supabase admin login failed:', error);
      setAuthMessage('Gagal menghubungi Supabase. Periksa koneksi lalu coba lagi.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Supabase admin logout failed:', error);
      setAuthMessage('Gagal mengakhiri sesi Supabase. Coba lagi.');
      return;
    }
    setAuthMessage('');
  };

  return (
    <div className={`admin-interface min-h-screen relative font-sans ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {saveAlert && (
        <div className="admin-toast fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 text-xs font-mono font-bold">
          <Check size={16} /> DRAFT TERSIMPAN DI BROWSER
        </div>
      )}

      {access === 'checking' ? (
        <main className="min-h-screen flex items-center justify-center p-4">
          <div className="admin-terminal-panel flex items-center gap-3 px-5 py-4 text-sm">
            <Terminal size={18} />
            <span>AUTH CHECK :: memeriksa sesi Supabase...</span>
          </div>
        </main>
      ) : access !== 'admin' ? (
        <main className="relative z-10 min-h-screen flex items-center justify-center p-4 py-10">
          <section className="admin-login-panel w-full max-w-lg p-6 sm:p-9">
            <div className="flex justify-between items-center mb-7 text-[10px] font-mono uppercase tracking-[0.18em]">
              <Link to="/" className="admin-muted-link flex items-center gap-1.5">
                <ArrowLeft size={14} /> Beranda
              </Link>
              <span>VOL.01 / AUTH GATE</span>
            </div>

            <div className="admin-terminal-bar flex items-center justify-between px-3 py-2 mb-6 text-[10px] font-mono">
              <span className="flex items-center gap-2"><Terminal size={13} /> qiqi@portfolio:~</span>
              <span>SECURE SHELL</span>
            </div>

            <div className="flex items-start gap-4 mb-7">
              <div className="admin-icon-stamp flex h-14 w-14 shrink-0 items-center justify-center">
                <Lock size={24} />
              </div>
              <div>
                <p className="admin-kicker mb-1">管理者認証 // ADMIN AUTH</p>
                <h1 className="text-xl sm:text-3xl font-black tracking-tight font-mono uppercase">Control Room</h1>
                <p className="text-xs opacity-70 mt-1">Masuk untuk mengelola arsip portfolio.</p>
              </div>
            </div>

            {!supabase && (
              <div className="admin-alert mb-4 p-3 text-xs">
                Supabase belum dikonfigurasi. Tambahkan <span className="font-mono">VITE_SUPABASE_URL</span> dan <span className="font-mono">VITE_SUPABASE_ANON_KEY</span> di file <span className="font-mono">.env</span>.
              </div>
            )}

            {access === 'forbidden' && (
              <div className="admin-alert mb-4 flex gap-2 p-3 text-xs">
                <ShieldAlert size={16} className="shrink-0" />
                <span>Login berhasil, tetapi akun ini tidak memiliki role admin. Atur <code>app_metadata.role = admin</code> di Supabase.</span>
              </div>
            )}

            {authMessage && access !== 'forbidden' && (
              <div role="alert" className="admin-alert mb-4 p-3 text-xs">{authMessage}</div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="admin-field-label block mb-1.5">01 // EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@contoh.com"
                  className="admin-input w-full px-4 py-3 text-sm"
                  autoFocus
                  disabled={!supabase}
                  autoComplete="username"
                  required
                />
              </div>

              <div>
                <label className="admin-field-label block mb-1.5">02 // PASSWORD</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Masukkan password admin"
                  className="admin-input w-full px-4 py-3 text-sm"
                  disabled={!supabase}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!supabase || isSigningIn}
                className="admin-action-button w-full py-3.5 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.15em] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Unlock size={15} /> {isSigningIn ? 'MENGAUTENTIKASI...' : 'MASUK KE CONTROL ROOM'}
              </button>
            </form>
            <p className="mt-6 pt-4 border-t border-current/15 text-[10px] font-mono opacity-50">
              AUTH PROVIDER: SUPABASE // SESSION STORAGE: SECURE CLIENT SDK
            </p>
          </section>
        </main>
      ) : (
        <main className="admin-dashboard relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-7 lg:px-10 lg:py-8">
          <header className="admin-header-panel mb-6 p-4 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="admin-icon-stamp flex h-12 w-12 shrink-0 items-center justify-center">
                  <BookOpen size={22} />
                </div>
                <div className="min-w-0">
                  <p className="admin-kicker mb-1">巻の零 // PORTFOLIO CONTROL SYSTEM</p>
                  <h1 className="break-words text-xl font-black font-mono uppercase tracking-tight sm:text-2xl">Manga Archive CMS</h1>
                  <p className="mt-1 break-words text-[11px] font-mono opacity-60">OPERATOR: AUTHENTICATED ADMIN // ACCESS: ROOT</p>
                </div>
              </div>

              <div className="grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                <span className="admin-sync-badge col-span-2 flex min-w-0 items-center gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-wider sm:mr-auto sm:col-span-1">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <span className="min-w-0 break-all">{cloudStatus || 'Supabase / AUTH OK'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => void handleCloudSave()}
                  disabled={isSaving}
                  className="admin-action-button flex w-full items-center justify-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-wider disabled:opacity-60 sm:w-auto sm:px-4"
                >
                  <Save size={14} /> {isSaving ? 'SYNCING...' : 'SAVE TO CLOUD'}
                </button>
                <Link to="/" className="admin-secondary-button flex w-full items-center justify-center gap-2 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider sm:w-auto sm:px-4">
                  <ExternalLink size={14} /> Preview
                </Link>
                <button type="button" onClick={() => void handleLogout()} className="admin-danger-button flex w-full items-center justify-center gap-2 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider sm:w-auto sm:px-4">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
            <div className="admin-terminal-bar mt-5 flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[10px] font-mono">
              <span><span className="text-emerald-500">operator@qiqi</span>:<span className="text-cyan-500">~/portfolio/admin</span>$ manage --mode=chapter</span>
              <span>AUTH OK <span className="px-1">•</span> RLS: ADMIN_ONLY <span className="px-1">•</span> BUILD: ONLINE</span>
            </div>
          </header>

          <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
            <nav aria-label="Admin sections" className="admin-nav-panel h-fit p-3">
              <p className="admin-kicker px-3 py-2">INDEX // SECTIONS</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {ADMIN_TABS.map(({ id, label, icon: Icon, command }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    aria-current={activeTab === id ? 'page' : undefined}
                    className={`admin-nav-item flex min-w-0 items-center gap-2 px-2 py-3 text-left transition sm:gap-3 sm:px-3 ${
                      activeTab === id ? 'is-active' : ''
                    }`}
                  >
                    <Icon size={17} className="shrink-0" />
                    <span className="min-w-0 break-words">
                      <span className="block text-xs font-bold">{label}</span>
                      <span className="block text-[9px] font-mono opacity-55">{command}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="admin-terminal-note mt-4 hidden p-3 text-[10px] leading-relaxed lg:block">
                <span className="text-emerald-500">$</span> autosave --target=browser<br />
                <span className="opacity-60">Cloud sync berjalan saat tombol SAVE TO CLOUD ditekan.</span>
              </div>
            </nav>

            <section className="admin-content-panel min-w-0 p-4 sm:p-6 lg:p-8">
              <div className="admin-content-heading mb-6 flex items-center justify-between gap-3 border-b-2 pb-4">
                <div className="min-w-0">
                  <p className="admin-kicker break-words">CURRENT FILE // {ADMIN_TABS.find((tab) => tab.id === activeTab)?.command}</p>
                  <h2 className="mt-1 break-words text-lg font-black font-mono uppercase">
                    {ADMIN_TABS.find((tab) => tab.id === activeTab)?.label} Configuration
                  </h2>
                </div>
                <span className="admin-page-stamp hidden sm:inline-flex">第{ADMIN_TABS.findIndex((tab) => tab.id === activeTab) + 1}章</span>
              </div>

              {activeTab === 'general' && <GeneralTab onSave={triggerSaveNotification} />}
              {activeTab === 'tentang' && <AboutTab onSave={triggerSaveNotification} />}
              {activeTab === 'projek' && <ProjectsTab onSave={triggerSaveNotification} />}
              {activeTab === 'sertifikat' && <CertificatesTab onSave={triggerSaveNotification} />}
              {activeTab === 'contact' && <ContactsTab onSave={triggerSaveNotification} />}
              {activeTab === 'account' && <AccountTab />}

              <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-current/20 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset seluruh data lokal ke pengaturan awal? Perubahan cloud baru terjadi setelah Save to Cloud.')) {
                      resetAllData();
                      triggerSaveNotification();
                    }
                  }}
                  className="admin-danger-button flex items-center gap-2 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider"
                >
                  <RotateCcw size={14} /> Reset local data
                </button>
                <span className="text-[10px] font-mono opacity-50">END OF FILE // PORTFOLIO.JSON</span>
              </footer>
            </section>
          </div>
        </main>
      )}

    </div>
  );
}