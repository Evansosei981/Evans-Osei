export type ProjectCategory = 'All' | 'Web' | 'AI' | 'Backend' | 'UI/UX' | 'University';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web' | 'AI' | 'Backend' | 'UI/UX' | 'University';
  technologies: string[];
  role: string;
  description: string;
  fullOverview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  challenges: string;
  learnings: string;
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  imageUrl?: string;
  featured: boolean;
  date: string;
}

export type SkillCategory = 'Programming' | 'Web Development' | 'Backend & Database' | 'Tools' | 'Concepts';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  context: string;
  icon: string;
}

export interface Experience {
  id: string;
  period: string;
  title: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  points: string[];
  tags: string[];
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  standing: string;
  coursework: string[];
  academicInterests: string[];
  highlights: string[];
}

export interface ExploringTopic {
  id: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  focusArea?: string;
  category?: string;
  status?: string;
  note?: string;
  icon?: string;
}

export interface ThinkingStep {
  id?: string;
  title?: string;
  stepNumber?: string;
  step?: string | number;
  label?: string;
  tagline?: string;
  description?: string | string[];
  shortDescription?: string;
  expandedDetails?: string;
  execution?: string;
  quote?: string;
}

export interface Article {
  id: string;
  slug?: string;
  title: string;
  summary: string;
  publishedDate?: string;
  date?: string;
  readTime: string;
  category?: string;
  tags: string[];
  content: string | string[];
  published?: boolean;
}

export type GalleryCategory = string;

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description?: string;
  imageUrl?: string;
  image?: string;
  date: string;
  location?: string;
  caption?: string;
}

export interface Certificate {
  id: string;
  name?: string;
  title?: string;
  issuer?: string;
  organization?: string;
  issuedDate?: string;
  issueDate?: string;
  credentialUrl?: string;
  credentialId?: string;
  description?: string;
  type?: string;
  skillsCovered?: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  submittedAt?: string;
  createdAt?: string;
  read?: boolean;
}

export interface Profile {
  name: string;
  aliasName?: string;
  tagline: string;
  headline: string;
  supportingText: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  university: string;
  degree: string;
  location: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  cvDownloadFileName: string;
  stats?: {
    projectsCount: string;
    certificatesCount: string;
    softwareTestedYear: string;
  };
}

export interface GalleryProject {
  id: string;
  title: string;
  description: string;
  badge?: string;
  category: string;
  technologies: string[];
  imageUrl?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
  mockupType: 'dashboard' | 'mobile-auth' | 'terminal' | 'card-deck' | 'analytics';
  stats?: { label: string; value: string }[];
  features?: string[];
}

export interface TechnicalProjectItem {
  id: string;
  title: string;
  description: string;
  framework: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  year?: string;
}

export interface DigitalProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  tags: string[];
  link?: string;
  slidesCount?: number;
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: 'trophy' | 'medal' | 'ribbon' | 'star';
  year: string;
  issuer: string;
}

export interface TrainingItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  badge: string;
  imageUrl?: string;
  category?: string;
}

export interface TraitItem {
  id: string;
  title: string;
  tagline: string;
  color: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education;
  exploringTopics?: ExploringTopic[];
  exploring: ExploringTopic[];
  thinkingSteps: ThinkingStep[];
  articles: Article[];
  gallery: GalleryItem[];
  certificates: Certificate[];
  messages: ContactMessage[];
  // Extended fields for the video portfolio
  galleryProjects?: GalleryProject[];
  technicalProjects?: TechnicalProjectItem[];
  digitalProjects?: DigitalProjectItem[];
  awards?: AwardItem[];
  trainings?: TrainingItem[];
  traits?: TraitItem[];
}
