import { useState } from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageInputControl from '../../components/admin/ImageInputControl';

export default function CertificatesTab({ onSave }: { onSave: () => void }) {
  const { primaryColor, secondaryColor, certificates, addCertificate, deleteCertificate, awards, addAward, deleteAward } = usePortfolio();

  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certYear, setCertYear] = useState('');
  const [certId, setCertId] = useState('');
  const [certImage, setCertImage] = useState('');

  const [awardTitle, setAwardTitle] = useState('');
  const [awardIssuer, setAwardIssuer] = useState('');
  const [awardYear, setAwardYear] = useState('');
  const [awardDesc, setAwardDesc] = useState('');
  const [awardImage, setAwardImage] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-1">Pengaturan Sertifikat & Penghargaan (Awards)</h2>
        <p className="text-xs text-slate-400">Atur kartu piagam sertifikat dan piala penghargaan kompetisi.</p>
      </div>

      {/* Form Sertifikat */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Award size={15} /> Tambah Sertifikat Baru
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" placeholder="Nama Sertifikasi" value={certTitle} onChange={(e) => setCertTitle(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Lembaga Penerbit (Meta, AWS, dll.)" value={certIssuer} onChange={(e) => setCertIssuer(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Tahun (cth: 2026)" value={certYear} onChange={(e) => setCertYear(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Credential ID" value={certId} onChange={(e) => setCertId(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
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
            setCertTitle(''); setCertIssuer(''); setCertYear(''); setCertId(''); setCertImage('');
            onSave();
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

      {/* Form Awards */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Award size={15} /> Tambah Penghargaan (Awards) Baru
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" placeholder="Nama Penghargaan / Juara" value={awardTitle} onChange={(e) => setAwardTitle(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Penyelenggara Kompetisi" value={awardIssuer} onChange={(e) => setAwardIssuer(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Tahun" value={awardYear} onChange={(e) => setAwardYear(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Deskripsi Singkat Prestasi" value={awardDesc} onChange={(e) => setAwardDesc(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
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
            setAwardTitle(''); setAwardIssuer(''); setAwardYear(''); setAwardDesc(''); setAwardImage('');
            onSave();
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
  );
}