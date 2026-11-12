import { useState } from 'react';
import { Plus, Trash2, GraduationCap, Briefcase } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageInputControl from '../../components/admin/ImageInputControl';

export default function AboutTab({ onSave }: { onSave: () => void }) {
  const { 
    primaryColor, 
    secondaryColor, 
    personal, 
    updatePersonal, 
    addSkill, 
    removeSkill, 
    addEducation, 
    deleteEducation, 
    addExperience, 
    deleteExperience 
  } = usePortfolio();

  const [newSkill, setNewSkill] = useState('');
  const [eduInst, setEduInst] = useState('');
  const [eduMajor, setEduMajor] = useState('');
  const [eduSub, setEduSub] = useState('');
  const [eduPeriod, setEduPeriod] = useState('');

  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expSub, setExpSub] = useState('');
  const [expPeriod, setExpPeriod] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-1">Pengaturan Profil & CV (Tentang Aku)</h2>
        <p className="text-xs text-slate-400">Atur foto profil khusus halaman Tentang, sapaan, bio, serta riwayat Education & Experience.</p>
      </div>

      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Foto Profil Khusus Halaman Tentang</h3>
        <ImageInputControl
          label="Pilih Foto Khusus Tentang:"
          value={personal.aboutImageUrl}
          onChange={(val) => updatePersonal({ aboutImageUrl: val })}
          accentColor={primaryColor}
        />
      </div>

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
          <label className="text-xs font-medium text-slate-400 block mb-1">Link File CV (Google Drive / URL PDF):</label>
          <input 
            type="url" 
            value={personal.cvUrl || ''} 
            onChange={(e) => updatePersonal({ cvUrl: e.target.value })}
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

      {/* CRUD Education */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <GraduationCap size={16} /> Kelola Riwayat Pendidikan (Education)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" placeholder="Nama Institusi / Universitas" value={eduInst} onChange={(e) => setEduInst(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Jurusan / Program Studi" value={eduMajor} onChange={(e) => setEduMajor(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Keterangan Fakultas / Jenjang" value={eduSub} onChange={(e) => setEduSub(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Periode Tahun (cth: 2025 – Present)" value={eduPeriod} onChange={(e) => setEduPeriod(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
        </div>
        <button 
          type="button"
          onClick={() => {
            if (!eduInst || !eduMajor) return;
            addEducation({ institution: eduInst, major: eduMajor, subDetail: eduSub || 'Undergraduate', period: eduPeriod || 'Present' });
            setEduInst(''); setEduMajor(''); setEduSub(''); setEduPeriod('');
            onSave();
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

      {/* CRUD Experience */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Briefcase size={16} /> Kelola Pengalaman Kerja & Organisasi (Experience)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" placeholder="Perusahaan / Organisasi" value={expCompany} onChange={(e) => setExpCompany(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Posisi / Peran" value={expRole} onChange={(e) => setExpRole(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Keterangan / Divisi" value={expSub} onChange={(e) => setExpSub(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Periode Tahun (cth: 2026)" value={expPeriod} onChange={(e) => setExpPeriod(e.target.value)} className="px-4 py-2 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
        </div>
        <button 
          type="button"
          onClick={() => {
            if (!expCompany || !expRole) return;
            addExperience({ company: expCompany, role: expRole, subDetail: expSub || 'Staff', period: expPeriod || '2026' });
            setExpCompany(''); setExpRole(''); setExpSub(''); setExpPeriod('');
            onSave();
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
  );
}