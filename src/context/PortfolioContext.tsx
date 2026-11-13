import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// ================= TIPE DATA =================
export interface GeneralSettings {
  webTitle: string;
  faviconUrl: string;
  logoText: string;
  navbarLogoUrl?: string;
  badgeText: string;
  heroKatakana: string;
  heroBigText: string;
  heroSignature: string;
  heroImageUrl: string;
  currentStatusTitle: string;
  currentStatusText: string;
  newsLabel: string;
  heroIntro: string;
  heroDescription: string;
  heroQuote: string;
  heroQuoteAuthor: string;
  jikosoukaiTitle?: string;
  heroMetaText?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  major: string;
  subDetail: string;
  period: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  subDetail: string;
  period: string;
}

export interface PersonalInfo {
  name: string;
  nickname: string;
  role: string;
  greeting: string;
  bio: string;
  aboutImageUrl: string;
  cvUrl: string;
  skills: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  imageUrl?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  imageUrl?: string;
}

export interface ContactAccount {
  id: string;
  platform: string;
  label: string;
  url: string;
}

export interface ContactSettings {
  title: string;
  description: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

// ================= DATA DEFAULT =================
const DEFAULT_GENERAL: GeneralSettings = {
  webTitle: 'Mochamad Rifki Al Farizi',
  faviconUrl: '',
  logoText: 'Rifki',
  navbarLogoUrl: '',
  badgeText: 'DEV 2026',
  heroKatakana: 'モハマド・リフキ',
  heroBigText: 'RIFKI',
  heroSignature: 'Al Farizi',
  heroImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900',
  currentStatusTitle: 'Current Status !!',
  currentStatusText: 'Mochamad Rifki Al Farizi adalah Software Engineer yang berfokus membangun antarmuka web modern berperforma tinggi.',
  newsLabel: 'N E W S',
  heroIntro: 'Seperti pizza yang dinanti-nantikan semua orang, selalu nantikan aku ya!\nHalo aku Marsha!',
  heroDescription: 'Marsha adalah member JKT48 yang dijuluki sebagai anime hidup karena parasnya yang sangat rupawan.',
  heroQuote: 'It\'s not impossible, it\'s just hard',
  heroQuoteAuthor: '~Qiqifahreza~',
  jikosoukaiTitle: 'JIKOSOUKAI',
  heroMetaText: 'Rifki.09-01-2006'
};

const DEFAULT_PERSONAL: PersonalInfo = {
  name: 'Mochamad Rifki Al Farizi',
  nickname: 'Rifki',
  role: 'Software Engineer & Creative Developer',
  greeting: "Hi, I'm",
  bio: 'Pengembang perangkat lunak yang berfokus pada arsitektur web modern, integrasi database scalable, dan pengalaman pengguna (UX) yang interaktif dan berkinerja tinggi.',
  aboutImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900',
  cvUrl: 'https://example.com/cv.pdf',
  skills: ['TypeScript', 'React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Git & Linux'],
  education: [
    {
      id: '1',
      institution: 'Universitas Brawijaya',
      major: 'Information Technology Education',
      subDetail: 'Faculty of Computer Science (FILKOM UB) • Undergraduate',
      period: '2025 – Present'
    },
    {
      id: '2',
      institution: 'SMKN 1 Winongan',
      major: 'Rekayasa Perangkat Lunak (RPL)',
      subDetail: 'Teknik Komputer dan Informatika',
      period: '2021 – 2024'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Google Indonesia',
      role: 'Google Student Ambassador',
      subDetail: 'Universitas Brawijaya • Ambassador',
      period: '2026'
    },
    {
      id: '2',
      company: 'Google Developer Groups (GDGs) on Campus',
      role: 'Core Team Member & Web Lead',
      subDetail: 'Brawijaya University Community',
      period: '2025 – 2026'
    }
  ]
};

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: 'Enterprise ERP & Logistics',
    category: 'Full-Stack Web App',
    description: 'Sistem manajemen rantai pasok dan inventaris real-time dengan integrasi dashboard analitik performa tinggi.',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/qiqifahreza',
    demo: 'https://demo.example.com',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'AI Prompt Engineering Tool',
    category: 'Productivity Platform',
    description: 'Aplikasi pembantu kurasi prompt AI generative dengan visual workflow builder berbasis node.',
    tags: ['Next.js', 'Node.js', 'Express', 'Tailwind'],
    github: 'https://github.com/qiqifahreza',
    demo: 'https://demo.example.com',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
  }
];

const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    id: '1',
    title: 'Meta Front-End Developer Professional',
    issuer: 'Coursera / Meta',
    year: '2025',
    credentialId: 'CR-882194-META',
    credentialUrl: 'https://coursera.org',
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2026',
    credentialId: 'AWS-CCP-9102',
    credentialUrl: 'https://aws.amazon.com',
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&q=80&w=800'
  }
];

const DEFAULT_AWARDS: AwardItem[] = [
  {
    id: '1',
    title: 'Juara 1 Web Development Competition',
    issuer: 'National Tech Summit',
    year: '2026',
    description: 'Pemenang kategori inovasi sistem web adaptif dan arsitektur cloud.',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800'
  }
];

const DEFAULT_CONTACTS: ContactAccount[] = [
  { id: '1', platform: 'GitHub', label: 'github.com/qiqifahreza', url: 'https://github.com/qiqifahreza' },
  { id: '2', platform: 'LinkedIn', label: 'linkedin.com/in/qiqifahreza', url: 'https://linkedin.com/in/qiqifahreza' },
  { id: '3', platform: 'Email', label: 'qiqifahreza@example.com', url: 'mailto:qiqifahreza@example.com' },
  { id: '4', platform: 'Instagram', label: '@qiqifahreza', url: 'https://instagram.com' }
];

const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  title: 'Mari Terhubung',
  description: 'Punya ide menarik atau proyek yang ingin didiskusikan? Kirim pesan langsung ke saya.'
};

const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  password: 'admin123'
};

// ================= CONTEXT INTERFACE =================
export interface PortfolioContextType {
  isDark: boolean;
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  resetTheme: () => void;

  general: GeneralSettings;
  updateGeneral: (data: Partial<GeneralSettings>) => void;

  personal: PersonalInfo;
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  deleteExperience: (id: string) => void;

  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  deleteProject: (id: string) => void;

  certificates: CertificateItem[];
  addCertificate: (cert: Omit<CertificateItem, 'id'>) => void;
  deleteCertificate: (id: string) => void;

  awards: AwardItem[];
  addAward: (award: Omit<AwardItem, 'id'>) => void;
  deleteAward: (id: string) => void;

  contacts: ContactAccount[];
  addContact: (contact: Omit<ContactAccount, 'id'>) => void;
  deleteContact: (id: string) => void;

  contactSettings: ContactSettings;
  updateContactSettings: (data: Partial<ContactSettings>) => void;

  adminCredentials: AdminCredentials;
  updateAdminCredentials: (data: Partial<AdminCredentials>) => void;

  isSaving: boolean;
  savePortfolio: () => Promise<void>;
  resetAllData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('theme') !== 'light';
    } catch {
      return true;
    }
  });

  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'light' ? '#ffffff' : '#000000';
    } catch {
      return '#000000';
    }
  });

  const [secondaryColor, setSecondaryColor] = useState<string>(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'light' ? '#000000' : '#ffffff';
    } catch {
      return '#ffffff';
    }
  });

  const [general, setGeneral] = useState<GeneralSettings>(() => {
    try {
      const saved = localStorage.getItem('portfolio_general');
      return saved ? { ...DEFAULT_GENERAL, ...JSON.parse(saved) } : DEFAULT_GENERAL;
    } catch {
      return DEFAULT_GENERAL;
    }
  });

  useEffect(() => {
    if (general.webTitle) {
      document.title = general.webTitle;
    }

    if (general.faviconUrl) {
      let faviconLink: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (faviconLink) {
        faviconLink.href = general.faviconUrl;
      } else {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = general.faviconUrl;
        document.head.appendChild(faviconLink);
      }
    }
  }, [general.webTitle, general.faviconUrl]);

  const [personal, setPersonal] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem('portfolio_personal');
      if (!saved) return DEFAULT_PERSONAL;
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_PERSONAL,
        ...parsed,
        aboutImageUrl: parsed?.aboutImageUrl || DEFAULT_PERSONAL.aboutImageUrl,
        skills: Array.isArray(parsed?.skills) && parsed.skills.length > 0 ? parsed.skills : DEFAULT_PERSONAL.skills,
        education: Array.isArray(parsed?.education) && parsed.education.length > 0 ? parsed.education : DEFAULT_PERSONAL.education,
        experience: Array.isArray(parsed?.experience) && parsed.experience.length > 0 ? parsed.experience : DEFAULT_PERSONAL.experience,
      };
    } catch {
      return DEFAULT_PERSONAL;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_certificates');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CERTIFICATES;
    } catch {
      return DEFAULT_CERTIFICATES;
    }
  });

  const [awards, setAwards] = useState<AwardItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_awards');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_AWARDS;
    } catch {
      return DEFAULT_AWARDS;
    }
  });

  const [contacts, setContacts] = useState<ContactAccount[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_contacts');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CONTACTS;
    } catch {
      return DEFAULT_CONTACTS;
    }
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => {
    try {
      const saved = localStorage.getItem('portfolio_contact_settings');
      return saved ? { ...DEFAULT_CONTACT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_CONTACT_SETTINGS;
    } catch {
      return DEFAULT_CONTACT_SETTINGS;
    }
  });

  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem('portfolio_admin_credentials');
      return saved ? { ...DEFAULT_ADMIN_CREDENTIALS, ...JSON.parse(saved) } : DEFAULT_ADMIN_CREDENTIALS;
    } catch {
      return DEFAULT_ADMIN_CREDENTIALS;
    }
  });

  const [isRemoteLoaded, setIsRemoteLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ================= LOAD DATA DARI TABEL-TABEL SUPABASE =================
  useEffect(() => {
    let ignore = false;

    const loadFromSupabaseTables = async () => {
      if (!supabase) {
        setIsRemoteLoaded(true);
        return;
      }

      try {
        const [
          genRes,
          perRes,
          eduRes,
          expRes,
          projRes,
          certRes,
          awardRes,
          contRes,
          cSetRes,
          admRes,
        ] = await Promise.all([
          supabase.from('general_settings').select('*').eq('id', 'default').maybeSingle(),
          supabase.from('personal_info').select('*').eq('id', 'default').maybeSingle(),
          supabase.from('education').select('*').order('created_at', { ascending: true }),
          supabase.from('experience').select('*').order('created_at', { ascending: true }),
          supabase.from('projects').select('*').order('created_at', { ascending: false }),
          supabase.from('certificates').select('*').order('created_at', { ascending: false }),
          supabase.from('awards').select('*').order('created_at', { ascending: false }),
          supabase.from('contacts').select('*').order('created_at', { ascending: true }),
          supabase.from('contact_settings').select('*').eq('id', 'default').maybeSingle(),
          supabase.from('admin_credentials').select('*').eq('id', 'default').maybeSingle(),
        ]);

        if (ignore) return;

        // 1. General Settings
        if (genRes.data) {
          const g = genRes.data;
          setGeneral((prev) => ({
            ...prev,
            webTitle: g.web_title ?? prev.webTitle,
            faviconUrl: g.favicon_url ?? prev.faviconUrl,
            logoText: g.logo_text ?? prev.logoText,
            navbarLogoUrl: g.navbar_logo_url ?? prev.navbarLogoUrl,
            badgeText: g.badge_text ?? prev.badgeText,
            heroKatakana: g.hero_katakana ?? prev.heroKatakana,
            heroBigText: g.hero_big_text ?? prev.heroBigText,
            heroSignature: g.hero_signature ?? prev.heroSignature,
            heroImageUrl: g.hero_image_url ?? prev.heroImageUrl,
            currentStatusTitle: g.current_status_title ?? prev.currentStatusTitle,
            currentStatusText: g.current_status_text ?? prev.currentStatusText,
            newsLabel: g.news_label ?? prev.newsLabel,
            heroIntro: g.hero_intro ?? prev.heroIntro,
            heroDescription: g.hero_description ?? prev.heroDescription,
            heroQuote: g.hero_quote ?? prev.heroQuote,
            heroQuoteAuthor: g.hero_quote_author ?? prev.heroQuoteAuthor,
            jikosoukaiTitle: g.jikosoukai_title ?? prev.jikosoukaiTitle,
            heroMetaText: g.hero_meta_text ?? prev.heroMetaText,
          }));
          if (g.is_dark !== undefined) setIsDark(g.is_dark);
          if (g.primary_color) setPrimaryColor(g.primary_color);
          if (g.secondary_color) setSecondaryColor(g.secondary_color);
        }

        // 2. Personal Info
        if (perRes.data) {
          const p = perRes.data;
          setPersonal((prev) => ({
            ...prev,
            name: p.name ?? prev.name,
            nickname: p.nickname ?? prev.nickname,
            role: p.role ?? prev.role,
            greeting: p.greeting ?? prev.greeting,
            bio: p.bio ?? prev.bio,
            aboutImageUrl: p.about_image_url ?? prev.aboutImageUrl,
            cvUrl: p.cv_url ?? prev.cvUrl,
            skills: Array.isArray(p.skills) && p.skills.length > 0 ? p.skills : prev.skills,
          }));
        }

        // 3. Education List
        if (eduRes.data && eduRes.data.length > 0) {
          setPersonal((prev) => ({
            ...prev,
            education: eduRes.data.map((e: { id: string; institution: string; major: string; sub_detail?: string; period?: string }) => ({
              id: e.id,
              institution: e.institution,
              major: e.major,
              subDetail: e.sub_detail ?? '',
              period: e.period ?? '',
            })),
          }));
        }

        // 4. Experience List
        if (expRes.data && expRes.data.length > 0) {
          setPersonal((prev) => ({
            ...prev,
            experience: expRes.data.map((x: { id: string; company: string; role: string; sub_detail?: string; period?: string }) => ({
              id: x.id,
              company: x.company,
              role: x.role,
              subDetail: x.sub_detail ?? '',
              period: x.period ?? '',
            })),
          }));
        }

        // 5. Projects
        if (projRes.data && projRes.data.length > 0) {
          setProjects(
            projRes.data.map((pr: { id: string; title: string; category?: string; description?: string; tags?: string[]; github?: string; demo?: string; image_url?: string }) => ({
              id: pr.id,
              title: pr.title,
              category: pr.category ?? '',
              description: pr.description ?? '',
              tags: Array.isArray(pr.tags) ? pr.tags : [],
              github: pr.github ?? '#',
              demo: pr.demo ?? '#',
              imageUrl: pr.image_url ?? '',
            }))
          );
        }

        // 6. Certificates
        if (certRes.data && certRes.data.length > 0) {
          setCertificates(
            certRes.data.map((c: { id: string; title: string; issuer?: string; year?: string; credential_id?: string; credential_url?: string; image_url?: string }) => ({
              id: c.id,
              title: c.title,
              issuer: c.issuer ?? '',
              year: c.year ?? '',
              credentialId: c.credential_id ?? '',
              credentialUrl: c.credential_url ?? '',
              imageUrl: c.image_url ?? '',
            }))
          );
        }

        // 7. Awards
        if (awardRes.data && awardRes.data.length > 0) {
          setAwards(
            awardRes.data.map((a: { id: string; title: string; issuer?: string; year?: string; description?: string; image_url?: string }) => ({
              id: a.id,
              title: a.title,
              issuer: a.issuer ?? '',
              year: a.year ?? '',
              description: a.description ?? '',
              imageUrl: a.image_url ?? '',
            }))
          );
        }

        // 8. Contacts
        if (contRes.data && contRes.data.length > 0) {
          setContacts(
            contRes.data.map((ct: { id: string; platform: string; label: string; url: string }) => ({
              id: ct.id,
              platform: ct.platform,
              label: ct.label,
              url: ct.url,
            }))
          );
        }

        // 9. Contact Settings
        if (cSetRes.data) {
          setContactSettings({
            title: cSetRes.data.title ?? DEFAULT_CONTACT_SETTINGS.title,
            description: cSetRes.data.description ?? DEFAULT_CONTACT_SETTINGS.description,
          });
        }

        // 10. Admin Credentials
        if (admRes.data) {
          setAdminCredentials({
            username: admRes.data.username ?? DEFAULT_ADMIN_CREDENTIALS.username,
            password: admRes.data.password ?? DEFAULT_ADMIN_CREDENTIALS.password,
          });
        }
      } catch (err) {
        console.error('Gagal mengambil data tabel Supabase:', err);
      } finally {
        if (!ignore) setIsRemoteLoaded(true);
      }
    };

    void loadFromSupabaseTables();

    return () => {
      ignore = true;
    };
  }, []);

  // ================= SIMPAN KE SEMUA TABEL SUPABASE =================
  const savePortfolio = async () => {
    if (!supabase || !isRemoteLoaded) return;
    setIsSaving(true);

    try {
      await Promise.all([
        // 1. General Settings Table
        supabase.from('general_settings').upsert({
          id: 'default',
          web_title: general.webTitle,
          favicon_url: general.faviconUrl,
          logo_text: general.logoText,
          navbar_logo_url: general.navbarLogoUrl,
          badge_text: general.badgeText,
          hero_katakana: general.heroKatakana,
          hero_big_text: general.heroBigText,
          hero_signature: general.heroSignature,
          hero_image_url: general.heroImageUrl,
          current_status_title: general.currentStatusTitle,
          current_status_text: general.currentStatusText,
          news_label: general.newsLabel,
          hero_intro: general.heroIntro,
          hero_description: general.heroDescription,
          hero_quote: general.heroQuote,
          hero_quote_author: general.heroQuoteAuthor,
          jikosoukai_title: general.jikosoukaiTitle,
          hero_meta_text: general.heroMetaText,
          primary_color: primaryColor,
          secondary_color: secondaryColor,
          is_dark: isDark,
          updated_at: new Date().toISOString(),
        }),

        // 2. Personal Info Table
        supabase.from('personal_info').upsert({
          id: 'default',
          name: personal.name,
          nickname: personal.nickname,
          role: personal.role,
          greeting: personal.greeting,
          bio: personal.bio,
          about_image_url: personal.aboutImageUrl,
          cv_url: personal.cvUrl,
          skills: personal.skills,
          updated_at: new Date().toISOString(),
        }),

        // 3. Education Table (Hapus lalu masukkan list terbaru)
        (async () => {
          await supabase.from('education').delete().neq('id', '');
          if (personal.education && personal.education.length > 0) {
            await supabase.from('education').insert(
              personal.education.map((e) => ({
                id: e.id,
                institution: e.institution,
                major: e.major,
                sub_detail: e.subDetail,
                period: e.period,
              }))
            );
          }
        })(),

        // 4. Experience Table
        (async () => {
          await supabase.from('experience').delete().neq('id', '');
          if (personal.experience && personal.experience.length > 0) {
            await supabase.from('experience').insert(
              personal.experience.map((x) => ({
                id: x.id,
                company: x.company,
                role: x.role,
                sub_detail: x.subDetail,
                period: x.period,
              }))
            );
          }
        })(),

        // 5. Projects Table
        (async () => {
          await supabase.from('projects').delete().neq('id', '');
          if (projects && projects.length > 0) {
            await supabase.from('projects').insert(
              projects.map((p) => ({
                id: p.id,
                title: p.title,
                category: p.category,
                description: p.description,
                tags: p.tags,
                github: p.github,
                demo: p.demo,
                image_url: p.imageUrl ?? '',
              }))
            );
          }
        })(),

        // 6. Certificates Table
        (async () => {
          await supabase.from('certificates').delete().neq('id', '');
          if (certificates && certificates.length > 0) {
            await supabase.from('certificates').insert(
              certificates.map((c) => ({
                id: c.id,
                title: c.title,
                issuer: c.issuer,
                year: c.year,
                credential_id: c.credentialId,
                credential_url: c.credentialUrl ?? '',
                image_url: c.imageUrl ?? '',
              }))
            );
          }
        })(),

        // 7. Awards Table
        (async () => {
          await supabase.from('awards').delete().neq('id', '');
          if (awards && awards.length > 0) {
            await supabase.from('awards').insert(
              awards.map((a) => ({
                id: a.id,
                title: a.title,
                issuer: a.issuer,
                year: a.year,
                description: a.description,
                image_url: a.imageUrl ?? '',
              }))
            );
          }
        })(),

        // 8. Contacts Table
        (async () => {
          await supabase.from('contacts').delete().neq('id', '');
          if (contacts && contacts.length > 0) {
            await supabase.from('contacts').insert(
              contacts.map((ct) => ({
                id: ct.id,
                platform: ct.platform,
                label: ct.label,
                url: ct.url,
              }))
            );
          }
        })(),

        // 9. Contact Settings Table
        supabase.from('contact_settings').upsert({
          id: 'default',
          title: contactSettings.title,
          description: contactSettings.description,
          updated_at: new Date().toISOString(),
        }),

        // 10. Admin Credentials Table
        supabase.from('admin_credentials').upsert({
          id: 'default',
          username: adminCredentials.username,
          password: adminCredentials.password,
          updated_at: new Date().toISOString(),
        }),
      ]);
    } catch (error) {
      console.error('Error saat menyimpan ke tabel Supabase:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // LocalStorage Sync (sebagai cadangan offline)
  useEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      localStorage.setItem('primaryColor', primaryColor);
      localStorage.setItem('secondaryColor', secondaryColor);
      localStorage.setItem('portfolio_general', JSON.stringify(general));
      localStorage.setItem('portfolio_personal', JSON.stringify(personal));
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
      localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
      localStorage.setItem('portfolio_awards', JSON.stringify(awards));
      localStorage.setItem('portfolio_contacts', JSON.stringify(contacts));
      localStorage.setItem('portfolio_contact_settings', JSON.stringify(contactSettings));
      localStorage.setItem('portfolio_admin_credentials', JSON.stringify(adminCredentials));
    } catch {
      // safe ignore
    }

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, primaryColor, secondaryColor, general, personal, projects, certificates, awards, contacts, contactSettings, adminCredentials]);

  const toggleTheme = () => {
    setIsDark((prev: boolean) => {
      const nextIsDark = !prev;
      if (nextIsDark) {
        setPrimaryColor('#000000');
        setSecondaryColor('#ffffff');
      } else {
        setPrimaryColor('#ffffff');
        setSecondaryColor('#000000');
      }
      return nextIsDark;
    });
  };

  const resetTheme = () => {
    if (isDark) {
      setPrimaryColor('#000000');
      setSecondaryColor('#ffffff');
    } else {
      setPrimaryColor('#ffffff');
      setSecondaryColor('#000000');
    }
  };

  const updateGeneral = (data: Partial<GeneralSettings>) => {
    setGeneral((prev: GeneralSettings) => ({ ...prev, ...data }));
  };

  const updatePersonal = (data: Partial<PersonalInfo>) => {
    setPersonal((prev: PersonalInfo) => ({ ...prev, ...data }));
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !personal.skills.includes(trimmed)) {
      setPersonal((prev: PersonalInfo) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setPersonal((prev: PersonalInfo) => ({
      ...prev,
      skills: prev.skills.filter((s: string) => s !== skillToRemove),
    }));
  };

  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newItem: EducationItem = { ...edu, id: Date.now().toString() };
    setPersonal((prev: PersonalInfo) => ({
      ...prev,
      education: [...(prev.education || []), newItem],
    }));
  };

  const deleteEducation = (id: string) => {
    setPersonal((prev: PersonalInfo) => ({
      ...prev,
      education: (prev.education || []).filter((e: EducationItem) => e.id !== id),
    }));
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newItem: ExperienceItem = { ...exp, id: Date.now().toString() };
    setPersonal((prev: PersonalInfo) => ({
      ...prev,
      experience: [...(prev.experience || []), newItem],
    }));
  };

  const deleteExperience = (id: string) => {
    setPersonal((prev: PersonalInfo) => ({
      ...prev,
      experience: (prev.experience || []).filter((e: ExperienceItem) => e.id !== id),
    }));
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newItem: ProjectItem = { ...project, id: Date.now().toString() };
    setProjects((prev: ProjectItem[]) => [newItem, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev: ProjectItem[]) => prev.filter((p: ProjectItem) => p.id !== id));
  };

  const addCertificate = (cert: Omit<CertificateItem, 'id'>) => {
    const newItem: CertificateItem = { ...cert, id: Date.now().toString() };
    setCertificates((prev: CertificateItem[]) => [newItem, ...prev]);
  };

  const deleteCertificate = (id: string) => {
    setCertificates((prev: CertificateItem[]) => prev.filter((c: CertificateItem) => c.id !== id));
  };

  const addAward = (award: Omit<AwardItem, 'id'>) => {
    const newItem: AwardItem = { ...award, id: Date.now().toString() };
    setAwards((prev: AwardItem[]) => [newItem, ...prev]);
  };

  const deleteAward = (id: string) => {
    setAwards((prev: AwardItem[]) => prev.filter((a: AwardItem) => a.id !== id));
  };

  const addContact = (contact: Omit<ContactAccount, 'id'>) => {
    const newItem: ContactAccount = { ...contact, id: Date.now().toString() };
    setContacts((prev: ContactAccount[]) => [...prev, newItem]);
  };

  const deleteContact = (id: string) => {
    setContacts((prev: ContactAccount[]) => prev.filter((c: ContactAccount) => c.id !== id));
  };

  const updateContactSettings = (data: Partial<ContactSettings>) => {
    setContactSettings((prev: ContactSettings) => ({ ...prev, ...data }));
  };

  const updateAdminCredentials = (data: Partial<AdminCredentials>) => {
    setAdminCredentials((prev: AdminCredentials) => ({ ...prev, ...data }));
  };

  const resetAllData = () => {
    setGeneral(DEFAULT_GENERAL);
    setPersonal(DEFAULT_PERSONAL);
    setProjects(DEFAULT_PROJECTS);
    setCertificates(DEFAULT_CERTIFICATES);
    setAwards(DEFAULT_AWARDS);
    setContacts(DEFAULT_CONTACTS);
    setContactSettings(DEFAULT_CONTACT_SETTINGS);
    setAdminCredentials(DEFAULT_ADMIN_CREDENTIALS);
    resetTheme();
  };

  return (
    <PortfolioContext.Provider
      value={{
        isDark,
        toggleTheme,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        resetTheme,
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
        isSaving,
        savePortfolio,
        resetAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
}