import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  Profile,
  Project,
  Skill,
  Experience,
  Education,
  Article,
  GalleryItem,
  Certificate,
  ContactMessage
} from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';

const STORAGE_KEY = 'evans_osei_portfolio_v1';
const ADMIN_AUTH_KEY = 'evans_portfolio_admin_auth';
const ADMIN_PWD_KEY = 'evans_portfolio_admin_pwd';
const DEFAULT_ADMIN_PWD = 'evans2026';

interface ModalState {
  type: 'project' | 'article' | 'cv' | null;
  id?: string;
}

interface PortfolioContextType {
  data: PortfolioData;
  isAdminLoggedIn: boolean;
  activeModal: ModalState;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPassword: string) => void;
  openProjectModal: (id: string) => void;
  openArticleModal: (id: string) => void;
  openCVModal: () => void;
  closeModal: () => void;
  
  // CRUD Handlers
  updateProfile: (profile: Partial<Profile>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  updateEducation: (edu: Education) => void;

  addArticle: (art: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, art: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;

  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => boolean;
  markMessageRead: (id: string, read: boolean) => void;
  deleteMessage: (id: string) => void;

  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore error and fall back to initial
    }
    return initialPortfolioData;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [activeModal, setActiveModal] = useState<ModalState>({ type: null });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  const loginAdmin = (password: string): boolean => {
    const savedPassword = localStorage.getItem(ADMIN_PWD_KEY) || DEFAULT_ADMIN_PWD;
    if (password === savedPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const updateAdminPassword = (newPassword: string) => {
    localStorage.setItem(ADMIN_PWD_KEY, newPassword);
  };

  const openProjectModal = (id: string) => setActiveModal({ type: 'project', id });
  const openArticleModal = (id: string) => setActiveModal({ type: 'article', id });
  const openCVModal = () => setActiveModal({ type: 'cv' });
  const closeModal = () => setActiveModal({ type: null });

  // Profile
  const updateProfile = (profileUpdate: Partial<Profile>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate }
    }));
  };

  // Projects
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: 'proj-' + Date.now().toString(36)
    };
    setData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id: string, projectUpdate: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...projectUpdate } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Skills
  const addSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: 'skill-' + Date.now().toString(36)
    };
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, skillUpdate: Partial<Skill>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...skillUpdate } : s))
    }));
  };

  const deleteSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Experience
  const addExperience = (expData: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...expData,
      id: 'exp-' + Date.now().toString(36)
    };
    setData(prev => ({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
  };

  const updateExperience = (id: string, expUpdate: Partial<Experience>) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => (e.id === id ? { ...e, ...expUpdate } : e))
    }));
  };

  const deleteExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  // Education
  const updateEducation = (edu: Education) => {
    setData(prev => ({
      ...prev,
      education: edu
    }));
  };

  // Articles
  const addArticle = (artData: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...artData,
      id: 'art-' + Date.now().toString(36)
    };
    setData(prev => ({
      ...prev,
      articles: [newArticle, ...prev.articles]
    }));
  };

  const updateArticle = (id: string, artUpdate: Partial<Article>) => {
    setData(prev => ({
      ...prev,
      articles: prev.articles.map(a => (a.id === id ? { ...a, ...artUpdate } : a))
    }));
  };

  const deleteArticle = (id: string) => {
    setData(prev => ({
      ...prev,
      articles: prev.articles.filter(a => a.id !== id)
    }));
  };

  // Gallery
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: 'gal-' + Date.now().toString(36)
    };
    setData(prev => ({
      ...prev,
      gallery: [newItem, ...prev.gallery]
    }));
  };

  const updateGalleryItem = (id: string, itemUpdate: Partial<GalleryItem>) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.map(g => (g.id === id ? { ...g, ...itemUpdate } : g))
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  // Certificates
  const addCertificate = (certData: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = {
      ...certData,
      id: 'cert-' + Date.now().toString(36)
    };
    setData(prev => ({
      ...prev,
      certificates: [...prev.certificates, newCert]
    }));
  };

  const updateCertificate = (id: string, certUpdate: Partial<Certificate>) => {
    setData(prev => ({
      ...prev,
      certificates: prev.certificates.map(c => (c.id === id ? { ...c, ...certUpdate } : c))
    }));
  };

  const deleteCertificate = (id: string) => {
    setData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c.id !== id)
    }));
  };

  // Contact form submission
  const submitContactMessage = (msg: { name: string; email: string; subject: string; message: string }): boolean => {
    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now().toString(36),
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: msg.subject.trim(),
      message: msg.message.trim(),
      createdAt: new Date().toISOString(),
      read: false
    };

    setData(prev => ({
      ...prev,
      messages: [newMessage, ...prev.messages]
    }));
    return true;
  };

  const markMessageRead = (id: string, read: boolean) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m.id === id ? { ...m, read } : m))
    }));
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id)
    }));
  };

  // Reset & Import/Export
  const resetToDefaults = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJSON = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile && parsed.projects && parsed.skills) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdminLoggedIn,
        activeModal,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        openProjectModal,
        openArticleModal,
        openCVModal,
        closeModal,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        updateEducation,
        addArticle,
        updateArticle,
        deleteArticle,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        submitContactMessage,
        markMessageRead,
        deleteMessage,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
