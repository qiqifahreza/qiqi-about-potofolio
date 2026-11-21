export interface GeneralSettings {
  logoText: string;
  badgeText: string;
  heroKatakana: string;
  heroBigText: string;
  heroSignature: string;
  heroImageUrl: string;
  currentStatusTitle: string;
  quoteTitle: string;
  quoteText: string;
}

export interface PersonalInfo {
  name: string;
  nickname: string;
  role: string;
  bio: string;
  yearsExperience: string;
  projectsCompleted: string;
  codeQualityStat: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  credentialUrl?: string;
}

export interface ContactAccount {
  id: string;
  platform: string;
  label: string;
  url: string;
}
