import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageInputControl from '../../components/admin/ImageInputControl';

export default function ProjectsTab({ onSave }: { onSave: () => void }) {
  const { primaryColor, secondaryColor, projects, addProject, deleteProject } = usePortfolio();

  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTags, setProjTags] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projDemo, setProjDemo] = useState('');
  const [projImage, setProjImage] = useState('');

  return (
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
          <input type="text" placeholder="Judul Projek" value={projTitle} onChange={(e) => setProjTitle(e.target.value)} className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Kategori (misal: Full-Stack Web App, AI Tool)" value={projCategory} onChange={(e) => setProjCategory(e.target.value)} className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="text" placeholder="Tags Teknologi (pisahkan koma: React, TypeScript, Tailwind)" value={projTags} onChange={(e) => setProjTags(e.target.value)} className="sm:col-span-2 px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="url" placeholder="Link GitHub Repository" value={projGithub} onChange={(e) => setProjGithub(e.target.value)} className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />
          <input type="url" placeholder="Link Live Demo" value={projDemo} onChange={(e) => setProjDemo(e.target.value)} className="px-4 py-2.5 rounded-xl glass-panel bg-white/5 border border-white/10 text-xs" />

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
            setProjTitle(''); setProjCategory(''); setProjDesc(''); setProjTags(''); setProjGithub(''); setProjDemo(''); setProjImage('');
            onSave();
          }}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2 shadow"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          <Plus size={15} /> Simpan Projek
        </button>
      </div>

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
  );
}