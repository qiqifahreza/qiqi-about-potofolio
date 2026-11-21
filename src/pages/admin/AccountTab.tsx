import { useEffect, useState, type FormEvent } from 'react';
import { KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AccountTab() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVerificationCode, setPasswordVerificationCode] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [emailError, setEmailError] = useState(() => {
    if (!supabase) return 'Supabase belum dikonfigurasi.';

    const authParams = new URLSearchParams(window.location.hash.slice(1));
    if (authParams.get('error_code') === 'otp_expired') {
      return 'Tautan konfirmasi kedaluwarsa atau sudah digunakan. Email belum berubah; kirim ulang konfirmasi dan gunakan tautan terbaru.';
    }
    if (authParams.has('error')) {
      return `Konfirmasi email gagal (${authParams.get('error_code') ?? authParams.get('error')}). Email belum berubah.`;
    }
    return '';
  });
  const [passwordError, setPasswordError] = useState('');
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isSendingPasswordCode, setIsSendingPasswordCode] = useState(false);
  const [passwordCodeSent, setPasswordCodeSent] = useState(false);

  useEffect(() => {
    const authParams = new URLSearchParams(window.location.hash.slice(1));
    if (authParams.has('error') || authParams.has('error_code')) {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}`,
      );
    }

    const client = supabase;
    if (!client) return;

    let ignore = false;

    const loadCurrentUser = async () => {
      const { data, error } = await client.auth.getUser();
      if (ignore) return;
      if (error) {
        setEmailError(error.message);
        return;
      }
      setCurrentEmail(data.user?.email ?? '');
      setPendingEmail(data.user?.new_email ?? '');
    };

    void loadCurrentUser();
    window.addEventListener('focus', loadCurrentUser);

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (!ignore) {
        setCurrentEmail(session?.user.email ?? '');
        setPendingEmail(session?.user.new_email ?? '');
      }
    });

    return () => {
      ignore = true;
      window.removeEventListener('focus', loadCurrentUser);
      subscription.unsubscribe();
    };
  }, []);

  const handleUpdateEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError('');
    setEmailMessage('');

    const client = supabase;
    const requestedEmail = newEmail.trim();
    if (!client || !currentEmail) {
      setEmailError('Sesi akun tidak tersedia. Login ulang lalu coba lagi.');
      return;
    }
    if (!requestedEmail || requestedEmail.toLowerCase() === currentEmail.toLowerCase()) {
      setEmailError('Masukkan email baru yang berbeda dari email saat ini.');
      return;
    }

    setIsLoadingEmail(true);
    try {
      const { data, error } = await client.auth.updateUser(
        { email: requestedEmail },
        { emailRedirectTo: `${window.location.origin}/admin` },
      );
      if (error) {
        setEmailError(error.message);
        return;
      }

      setCurrentEmail(data.user.email ?? currentEmail);
      setPendingEmail(data.user.new_email ?? '');
      setEmailMessage(
        data.user.new_email
          ? `Permintaan terkirim. Verifikasi email dari alamat lama dan alamat baru (${data.user.new_email}); alamat baru aktif setelah konfirmasi yang diminta Supabase selesai.`
          : 'Email berhasil diperbarui.',
      );
      setNewEmail('');
    } catch (error) {
      console.error('Supabase admin email update failed:', error);
      setEmailError('Gagal menghubungi Supabase. Periksa koneksi lalu coba lagi.');
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleSendPasswordCode = async () => {
    setPasswordError('');
    setPasswordMessage('');

    const client = supabase;
    if (!client || !currentEmail) {
      setPasswordError('Sesi akun tidak tersedia. Login ulang lalu coba lagi.');
      return;
    }

    setIsSendingPasswordCode(true);
    try {
      const { error } = await client.auth.reauthenticate();
      if (error) {
        setPasswordError(error.message);
        return;
      }

      setPasswordCodeSent(true);
      setPasswordMessage(`Kode verifikasi dikirim ke ${currentEmail}. Periksa kotak masuk dan folder spam.`);
    } catch (error) {
      console.error('Supabase admin password reauthentication failed:', error);
      setPasswordError('Gagal meminta kode verifikasi. Periksa koneksi lalu coba lagi.');
    } finally {
      setIsSendingPasswordCode(false);
    }
  };

  const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError('');
    setPasswordMessage('');

    const client = supabase;
    if (!client || !currentEmail) {
      setPasswordError('Sesi akun tidak tersedia. Login ulang lalu coba lagi.');
      return;
    }
    if (!passwordCodeSent || !passwordVerificationCode.trim()) {
      setPasswordError('Kirim kode verifikasi dan masukkan kode dari email terlebih dahulu.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password baru minimal 8 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok.');
      return;
    }

    setIsLoadingPassword(true);
    try {
      const { error } = await client.auth.updateUser({
        password: newPassword,
        nonce: passwordVerificationCode.trim(),
      });
      if (error) {
        setPasswordError(error.message);
        return;
      }

      setPasswordMessage('Password berhasil diperbarui.');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordVerificationCode('');
      setPasswordCodeSent(false);
    } catch (error) {
      console.error('Supabase admin password update failed:', error);
      setPasswordError('Gagal menghubungi Supabase. Periksa koneksi lalu coba lagi.');
    } finally {
      setIsLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black font-mono uppercase mb-1">Pengaturan Akun Admin</h2>
        <p className="text-xs opacity-70">Ubah kredensial akun Supabase Auth yang sedang digunakan untuk masuk.</p>
      </div>

      <div className="admin-terminal-bar flex flex-wrap items-center gap-2 px-4 py-3 text-xs font-mono">
        <ShieldCheck size={15} className="text-emerald-500" />
        <span>AUTHENTICATED USER //</span>
        <strong className="break-all text-white">{currentEmail || 'Memuat akun...'}</strong>
      </div>
      {pendingEmail && (
        <div role="status" className="admin-alert p-3 text-xs">
          EMAIL CHANGE PENDING // Konfirmasi untuk {pendingEmail} belum selesai.
        </div>
      )}

      <section className="p-5 border-2 border-current/20 space-y-4">
        <div className="flex items-center gap-2">
          <Mail size={17} />
          <h3 className="text-sm font-bold font-mono uppercase">Ganti Email</h3>
        </div>
        <p className="text-xs opacity-70">
          Supabase mengirim konfirmasi sesuai pengaturan keamanan project. Aktifkan Secure email change agar alamat lama dan baru sama-sama diverifikasi; alamat baru tidak dapat diaktifkan tanpa konfirmasi pemiliknya.
        </p>

        <form onSubmit={handleUpdateEmail} className="grid gap-3 sm:grid-cols-2">
          <label className="admin-field-label sm:col-span-2">
            Email baru
            <input
              type="email"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              className="admin-input mt-1.5 w-full px-3 py-2.5 text-sm normal-case tracking-normal"
              autoComplete="email"
              required
            />
          </label>
          {emailError && <p role="alert" className="admin-alert p-3 text-xs sm:col-span-2">{emailError}</p>}
          {emailMessage && <p role="status" className="admin-terminal-note p-3 text-xs sm:col-span-2">{emailMessage}</p>}
          <button
            type="submit"
            disabled={isLoadingEmail || !currentEmail}
            className="admin-action-button flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase disabled:opacity-50 sm:col-span-2"
          >
            <Mail size={14} /> {isLoadingEmail ? 'MEMPROSES...' : 'KIRIM KONFIRMASI EMAIL'}
          </button>
        </form>
      </section>

      <section className="p-5 border-2 border-current/20 space-y-4">
        <div className="flex items-center gap-2">
          <KeyRound size={17} />
          <h3 className="text-sm font-bold font-mono uppercase">Ganti Password</h3>
        </div>
        <p className="text-xs opacity-70">
          Minta kode ke email akun yang sedang digunakan, lalu masukkan kode tersebut untuk mengonfirmasi password baru.
        </p>

        <form onSubmit={handleUpdatePassword} className="grid gap-3 sm:grid-cols-2">
          <label className="admin-field-label sm:col-span-2">
            Kode verifikasi email
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={passwordVerificationCode}
              onChange={(event) => setPasswordVerificationCode(event.target.value.replace(/\s/g, ''))}
              className="admin-input mt-1.5 w-full px-3 py-2.5 text-sm normal-case tracking-normal"
              aria-label="Kode verifikasi dari email"
              required
            />
          </label>
          <button
            type="button"
            onClick={() => void handleSendPasswordCode()}
            disabled={isSendingPasswordCode || !currentEmail}
            className="admin-secondary-button flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase disabled:opacity-50 sm:col-span-2"
          >
            <Mail size={14} /> {isSendingPasswordCode ? 'MENGIRIM KODE...' : passwordCodeSent ? 'KIRIM ULANG KODE' : 'KIRIM KODE KE EMAIL SAAT INI'}
          </button>
          <label className="admin-field-label">
            Password baru
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="admin-input mt-1.5 w-full px-3 py-2.5 text-sm normal-case tracking-normal"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <label className="admin-field-label">
            Konfirmasi password baru
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="admin-input mt-1.5 w-full px-3 py-2.5 text-sm normal-case tracking-normal"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          {passwordError && <p role="alert" className="admin-alert p-3 text-xs sm:col-span-2">{passwordError}</p>}
          {passwordMessage && <p role="status" className="admin-terminal-note p-3 text-xs sm:col-span-2">{passwordMessage}</p>}
          <button
            type="submit"
            disabled={isLoadingPassword || !currentEmail || !passwordCodeSent}
            className="admin-action-button flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase disabled:opacity-50 sm:col-span-2"
          >
            <KeyRound size={14} /> {isLoadingPassword ? 'MEMPROSES...' : 'UPDATE PASSWORD'}
          </button>
        </form>
      </section>
    </div>
  );
}
