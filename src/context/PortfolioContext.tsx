import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
  heroIntro: string;
  heroDescription: string;
  heroQuote: string;
  heroQuoteAuthor: string;
  jikosoukaiTitle?: string;
  heroMetaText?: string;
}

export interface TechLogoItem {
  id: string;
  title: string;
  src?: string;
  href?: string;
  hoverColor?: string;
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

const DEFAULT_GENERAL: GeneralSettings = {
  webTitle: '',
  faviconUrl: '',
  logoText: '',
  navbarLogoUrl: '',
  badgeText: '',
  heroKatakana: '',
  heroBigText: '',
  heroSignature: '',
  heroImageUrl: '',
  currentStatusTitle: '',
  heroIntro: '',
  heroDescription: '',
  heroQuote: '',
  heroQuoteAuthor: '',
  jikosoukaiTitle: '',
  heroMetaText: ''
};

const DEFAULT_PERSONAL: PersonalInfo = {
  name: '',
  nickname: '',
  role: '',
  greeting: '',
  bio: '',
  aboutImageUrl: '',
  cvUrl: '',
  education: [],
  experience: []
};

const DEFAULT_TECH_LOGOS: TechLogoItem[] = [];
const DEFAULT_PROJECTS: ProjectItem[] = [];
const DEFAULT_CERTIFICATES: CertificateItem[] = [];
const DEFAULT_AWARDS: AwardItem[] = [];
const DEFAULT_CONTACTS: ContactAccount[] = [];

const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  title: '',
  description: ''
};

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

  isSaving: boolean;
  savePortfolio: () => Promise<void>;
  resetAllData: () => void;

  techLogos: TechLogoItem[];
  addTechLogo: (logo: Omit<TechLogoItem, 'id'>) => void;
  deleteTechLogo: (id: string) => void;
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

  // Ignore malformed saved values and use the defaults.
  const [techLogos, setTechLogos] = useState<TechLogoItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_tech_logos');
      if (!saved) return DEFAULT_TECH_LOGOS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter((item: TechLogoItem) => item && item.title) : DEFAULT_TECH_LOGOS;
    } catch {
      return DEFAULT_TECH_LOGOS;
    }
  });

  const addTechLogo = (logo: Omit<TechLogoItem, 'id'>) => {
    const newItem: TechLogoItem = { ...logo, id: Date.now().toString() };
    setTechLogos((prev) => [...prev, newItem]);
  };

  const deleteTechLogo = (id: string) => {
    setTechLogos((prev) => prev.filter((item) => item.id !== id));
  };

  const [general, setGeneral] = useState<GeneralSettings>(() => {
    try {
      const saved = localStorage.getItem('portfolio_general');
      return saved ? JSON.parse(saved) : DEFAULT_GENERAL;
    } catch {
      return DEFAULT_GENERAL;
    }
  });

  useEffect(() => {
    if (general.webTitle) {
      document.title = general.webTitle;
    } else {
      document.title = 'Portfolio';
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
      return saved ? JSON.parse(saved) : DEFAULT_PERSONAL;
    } catch {
      return DEFAULT_PERSONAL;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_certificates');
      return saved ? JSON.parse(saved) : DEFAULT_CERTIFICATES;
    } catch {
      return DEFAULT_CERTIFICATES;
    }
  });

  const [awards, setAwards] = useState<AwardItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_awards');
      return saved ? JSON.parse(saved) : DEFAULT_AWARDS;
    } catch {
      return DEFAULT_AWARDS;
    }
  });

  const [contacts, setContacts] = useState<ContactAccount[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_contacts');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACTS;
    } catch {
      return DEFAULT_CONTACTS;
    }
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => {
    try {
      const saved = localStorage.getItem('portfolio_contact_settings');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT_SETTINGS;
    } catch {
      return DEFAULT_CONTACT_SETTINGS;
    }
  });

  const [isRemoteLoaded, setIsRemoteLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
          logoRes,
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
          supabase.from('tech_logos').select('*').order('created_at', { ascending: true }),
        ]);

        if (ignore) return;

        if (genRes.data) {
          const g = genRes.data;
          setGeneral({
            webTitle: g.web_title ?? '',
            faviconUrl: g.favicon_url ?? '',
            logoText: g.logo_text ?? '',
            navbarLogoUrl: g.navbar_logo_url ?? '',
            badgeText: g.badge_text ?? '',
            heroKatakana: g.hero_katakana ?? '',
            heroBigText: g.hero_big_text ?? '',
            heroSignature: g.hero_signature ?? '',
            heroImageUrl: g.hero_image_url ?? '',
            currentStatusTitle: g.current_status_title ?? '',
            heroIntro: g.hero_intro ?? '',
            heroDescription: g.hero_description ?? '',
            heroQuote: g.hero_quote ?? '',
            heroQuoteAuthor: g.hero_quote_author ?? '',
            jikosoukaiTitle: g.jikosoukai_title ?? '',
            heroMetaText: g.hero_meta_text ?? '',
          });
          if (g.is_dark !== undefined) setIsDark(g.is_dark);
          if (g.primary_color) setPrimaryColor(g.primary_color);
          if (g.secondary_color) setSecondaryColor(g.secondary_color);
        }

        if (perRes.data) {
          const p = perRes.data;
          setPersonal({
            name: p.name ?? '',
            nickname: p.nickname ?? '',
            role: p.role ?? '',
            greeting: p.greeting ?? '',
            bio: p.bio ?? '',
            aboutImageUrl: p.about_image_url ?? '',
            cvUrl: p.cv_url ?? '',
            education: [],
            experience: [],
          });
        }

        if (eduRes.data) {
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

        if (expRes.data) {
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

        if (projRes.data) {
          setProjects(
            projRes.data.map((pr: { id: string; title: string; category?: string; description?: string; tags?: string[]; github?: string; demo?: string; image_url?: string }) => ({
              id: pr.id,
              title: pr.title,
              category: pr.category ?? '',
              description: pr.description ?? '',
              tags: Array.isArray(pr.tags) ? pr.tags : [],
              github: pr.github ?? '',
              demo: pr.demo ?? '',
              imageUrl: pr.image_url ?? '',
            }))
          );
        }

        if (certRes.data) {
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

        if (awardRes.data) {
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

        if (contRes.data) {
          setContacts(
            contRes.data.map((ct: { id: string; platform: string; label: string; url: string }) => ({
              id: ct.id,
              platform: ct.platform,
              label: ct.label,
              url: ct.url,
            }))
          );
        }

        if (cSetRes.data) {
          setContactSettings({
            title: cSetRes.data.title ?? '',
            description: cSetRes.data.description ?? '',
          });
        }

        if (logoRes.data) {
          setTechLogos(
            logoRes.data.map((tl: { id: string; title: string; src?: string; href?: string; hover_color?: string }) => ({
              id: tl.id,
              title: tl.title,
              src: tl.src ?? '',
              href: tl.href ?? '',
              hoverColor: tl.hover_color ?? '',
            }))
          );
        }
      } catch (err) {
        console.error('Error load Supabase:', err);
      } finally {
        if (!ignore) setIsRemoteLoaded(true);
      }
    };

    void loadFromSupabaseTables();

    return () => {
      ignore = true;
    };
  }, []);

  const savePortfolio = async () => {
    if (!supabase) throw new Error('Supabase is not configured.');
    if (!isRemoteLoaded) throw new Error('Portfolio data is still loading from Supabase.');
    setIsSaving(true);

    try {
      const ensureSuccess = async (
        operation: PromiseLike<{ error: { message: string } | null }>
      ) => {
        const { error } = await operation;
        if (error) throw error;
      };

      await Promise.all([
        ensureSuccess(supabase.from('general_settings').upsert({
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
        })),

        ensureSuccess(supabase.from('personal_info').upsert({
          id: 'default',
          name: personal.name,
          nickname: personal.nickname,
          role: personal.role,
          greeting: personal.greeting,
          bio: personal.bio,
          about_image_url: personal.aboutImageUrl,
          cv_url: personal.cvUrl,
          updated_at: new Date().toISOString(),
        })),

        (async () => {
          await ensureSuccess(supabase.from('education').delete().neq('id', ''));
          if (personal.education && personal.education.length > 0) {
            await ensureSuccess(supabase.from('education').insert(
              personal.education.map((e) => ({
                id: e.id,
                institution: e.institution,
                major: e.major,
                sub_detail: e.subDetail,
                period: e.period,
              }))
            ));
          }
        })(),

        (async () => {
          await ensureSuccess(supabase.from('experience').delete().neq('id', ''));
          if (personal.experience && personal.experience.length > 0) {
            await ensureSuccess(supabase.from('experience').insert(
              personal.experience.map((x) => ({
                id: x.id,
                company: x.company,
                role: x.role,
                sub_detail: x.subDetail,
                period: x.period,
              }))
            ));
          }
        })(),

        (async () => {
          await ensureSuccess(supabase.from('projects').delete().neq('id', ''));
          if (projects && projects.length > 0) {
            await ensureSuccess(supabase.from('projects').insert(
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
            ));
          }
        })(),

        (async () => {
          await ensureSuccess(supabase.from('certificates').delete().neq('id', ''));
          if (certificates && certificates.length > 0) {
            await ensureSuccess(supabase.from('certificates').insert(
              certificates.map((c) => ({
                id: c.id,
                title: c.title,
                issuer: c.issuer,
                year: c.year,
                credential_id: c.credentialId,
                credential_url: c.credentialUrl ?? '',
                image_url: c.imageUrl ?? '',
              }))
            ));
          }
        })(),

        (async () => {
          await ensureSuccess(supabase.from('awards').delete().neq('id', ''));
          if (awards && awards.length > 0) {
            await ensureSuccess(supabase.from('awards').insert(
              awards.map((a) => ({
                id: a.id,
                title: a.title,
                issuer: a.issuer,
                year: a.year,
                description: a.description,
                image_url: a.imageUrl ?? '',
              }))
            ));
          }
        })(),

        (async () => {
          await ensureSuccess(supabase.from('contacts').delete().neq('id', ''));
          if (contacts && contacts.length > 0) {
            await ensureSuccess(supabase.from('contacts').insert(
              contacts.map((ct) => ({
                id: ct.id,
                platform: ct.platform,
                label: ct.label,
                url: ct.url,
              }))
            ));
          }
        })(),

        (async () => {
          await ensureSuccess(supabase.from('tech_logos').delete().neq('id', ''));
          if (techLogos && techLogos.length > 0) {
            await ensureSuccess(supabase.from('tech_logos').insert(
              techLogos.map((tl) => ({
                id: tl.id,
                title: tl.title,
                src: tl.src ?? '',
                href: tl.href ?? '',
                hover_color: tl.hoverColor ?? '',
              }))
            ));
          }
        })(),

        ensureSuccess(supabase.from('contact_settings').upsert({
          id: 'default',
          title: contactSettings.title,
          description: contactSettings.description,
          updated_at: new Date().toISOString(),
        })),

      ]);
    } catch (error) {
      console.error('Error simpan Supabase:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

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
      localStorage.setItem('portfolio_tech_logos', JSON.stringify(techLogos));
    } catch {
      // Storage may be unavailable; keep the in-memory state.
    }

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, primaryColor, secondaryColor, general, personal, projects, certificates, awards, contacts, contactSettings, techLogos]);

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

  const resetAllData = () => {
    setGeneral(DEFAULT_GENERAL);
    setPersonal(DEFAULT_PERSONAL);
    setTechLogos(DEFAULT_TECH_LOGOS);
    setProjects(DEFAULT_PROJECTS);
    setCertificates(DEFAULT_CERTIFICATES);
    setAwards(DEFAULT_AWARDS);
    setContacts(DEFAULT_CONTACTS);
    setContactSettings(DEFAULT_CONTACT_SETTINGS);
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
        isSaving,
        savePortfolio,
        resetAllData,
        techLogos,
        addTechLogo,
        deleteTechLogo,
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