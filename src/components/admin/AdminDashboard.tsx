import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Project,
  Skill,
  Experience,
  Article,
  GalleryItem,
  Certificate,
  SkillCategory,
  ProjectCategory
} from '../../types/portfolio';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  BookOpen,
  Camera,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Lock,
  LogOut,
  ArrowLeft,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

type TabType =
  | 'overview'
  | 'profile'
  | 'projects'
  | 'blog'
  | 'gallery'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certificates'
  | 'messages'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const {
    data,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    updateAdminPassword,
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
    markMessageRead,
    deleteMessage,
    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Editing states
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  // Forms
  const [profileForm, setProfileForm] = useState(data.profile);
  const [educationForm, setEducationForm] = useState(data.education);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  // If not logged in, render password barrier
  if (!isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-[#07090e] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl glass-panel border border-white/10 text-center shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-display font-bold text-white mb-1">
            Admin Management
          </h2>
          <p className="text-xs text-slate-400 mb-6 font-mono">
            Control portfolio content without modifying code
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Security Passkey
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Default: evans2026"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 font-mono">
                Invalid passkey. Default is evans2026.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-cyan-500/20"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-500 font-mono">
            Protected area for Evans Osei
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#07090e] text-slate-200 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 px-6 border-b border-white/10 bg-[#0a0f1d] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="font-display font-bold text-white text-sm">Portfolio Content Hub</span>
        </div>

        {feedbackMsg && (
          <div className="px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono animate-in fade-in">
            {feedbackMsg}
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Logged in as {data.profile.name}
          </span>
          <button
            onClick={logoutAdmin}
            className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-60 border-r border-white/10 bg-[#070a14] p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'profile', label: 'Profile Bio', icon: User },
              { id: 'projects', label: 'Projects', icon: FolderGit2, badge: data.projects.length },
              { id: 'skills', label: 'Skills & Stack', icon: Sparkles, badge: data.skills.length },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'blog', label: 'Blog Articles', icon: BookOpen, badge: data.articles.length },
              { id: 'gallery', label: 'Gallery Archive', icon: Camera, badge: data.gallery.length },
              { id: 'certificates', label: 'Certificates', icon: Award, badge: data.certificates.length },
              {
                id: 'messages',
                label: 'Inquiries',
                icon: Mail,
                badge: data.messages.filter(m => !m.read).length || undefined
              },
              { id: 'settings', label: 'Data & Settings', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                        item.id === 'messages' && item.badge > 0
                          ? 'bg-rose-500 text-white font-bold'
                          : 'bg-white/[0.08] text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-slate-500">
            <div>All changes persist immediately into browser storage.</div>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#07090e]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-5xl space-y-8">
              <div>
                <h1 className="text-2xl font-display font-bold text-white mb-1">
                  Dashboard Overview
                </h1>
                <p className="text-xs font-mono text-slate-400">
                  Real-time status of your portfolio assets and incoming communications.
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl glass-panel border border-white/10">
                  <FolderGit2 className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-2xl font-bold font-mono text-white">
                    {data.projects.length}
                  </div>
                  <div className="text-xs text-slate-400">Active Projects</div>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-white/10">
                  <BookOpen className="w-5 h-5 text-indigo-400 mb-2" />
                  <div className="text-2xl font-bold font-mono text-white">
                    {data.articles.length}
                  </div>
                  <div className="text-xs text-slate-400">Published Articles</div>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-white/10">
                  <Camera className="w-5 h-5 text-teal-400 mb-2" />
                  <div className="text-2xl font-bold font-mono text-white">
                    {data.gallery.length}
                  </div>
                  <div className="text-xs text-slate-400">Gallery Items</div>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-white/10">
                  <Mail className="w-5 h-5 text-rose-400 mb-2" />
                  <div className="text-2xl font-bold font-mono text-white">
                    {data.messages.length}
                  </div>
                  <div className="text-xs text-slate-400">
                    Inquiries ({data.messages.filter(m => !m.read).length} unread)
                  </div>
                </div>
              </div>

              {/* Quick links & recent inquiries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider">
                    Recent Contact Inquiries
                  </h3>
                  {data.messages.length === 0 ? (
                    <p className="text-xs text-slate-500">No messages yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.messages.slice(0, 3).map(msg => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-xl border text-xs ${
                            msg.read
                              ? 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                              : 'bg-cyan-950/20 border-cyan-400/30 text-slate-200'
                          }`}
                        >
                          <div className="flex justify-between font-medium text-white mb-1">
                            <span>{msg.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(msg.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-cyan-300 font-mono mb-1">{msg.subject}</div>
                          <p className="line-clamp-2 text-slate-400">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    View all messages →
                  </button>
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider">
                    Fast Action Shortcuts
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left"
                    >
                      <Plus className="w-4 h-4 text-cyan-400 mb-1" />
                      <div className="font-semibold text-white">Add Project</div>
                      <div className="text-[11px] text-slate-400">Publish new build</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('blog')}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left"
                    >
                      <Plus className="w-4 h-4 text-indigo-400 mb-1" />
                      <div className="font-semibold text-white">Write Article</div>
                      <div className="text-[11px] text-slate-400">Share your thoughts</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left"
                    >
                      <Edit2 className="w-4 h-4 text-emerald-400 mb-1" />
                      <div className="font-semibold text-white">Edit Bio</div>
                      <div className="text-[11px] text-slate-400">Update headline</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left"
                    >
                      <Download className="w-4 h-4 text-teal-400 mb-1" />
                      <div className="font-semibold text-white">Backup JSON</div>
                      <div className="text-[11px] text-slate-400">Export database</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE EDITOR */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Profile & Identity</h2>
                  <p className="text-xs font-mono text-slate-400">Manage headline, biography, and personal coordinates</p>
                </div>
                <button
                  onClick={() => {
                    updateProfile(profileForm);
                    showNotification('Profile updated successfully!');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Professional Tagline</label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Hero Supporting Text</label>
                <textarea
                  rows={2}
                  value={profileForm.supportingText}
                  onChange={e => setProfileForm({ ...profileForm, supportingText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-mono text-slate-400">About Section Biography</label>
                <textarea
                  rows={3}
                  value={profileForm.bioParagraph1}
                  onChange={e => setProfileForm({ ...profileForm, bioParagraph1: e.target.value })}
                  placeholder="Bio Paragraph 1"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
                <textarea
                  rows={3}
                  value={profileForm.bioParagraph2}
                  onChange={e => setProfileForm({ ...profileForm, bioParagraph2: e.target.value })}
                  placeholder="Bio Paragraph 2"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
                <textarea
                  rows={3}
                  value={profileForm.bioParagraph3}
                  onChange={e => setProfileForm({ ...profileForm, bioParagraph3: e.target.value })}
                  placeholder="Bio Paragraph 3"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
                  <input
                    type="text"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={profileForm.githubUrl}
                    onChange={e => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profileForm.linkedinUrl}
                    onChange={e => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="max-w-5xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Project Case Studies</h2>
                  <p className="text-xs font-mono text-slate-400">Add, edit, or configure featured status</p>
                </div>
                <button
                  onClick={() => {
                    const newP: Omit<Project, 'id'> = {
                      title: 'New Engineering Project',
                      subtitle: 'Architecture & Implementation',
                      category: 'Web',
                      technologies: ['React', 'TypeScript', 'Node.js'],
                      role: 'Lead Developer',
                      description: 'Concise summary of what this project accomplishes.',
                      fullOverview: 'Detailed architectural story and impact.',
                      problem: 'The real-world issue this project was designed to address.',
                      solution: 'How the architecture solves the problem.',
                      keyFeatures: ['Feature 1', 'Feature 2'],
                      challenges: 'Key technical hurdles overcome.',
                      learnings: 'Core takeaways.',
                      featured: false,
                      date: '2026'
                    };
                    addProject(newP);
                    showNotification('New draft project created.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-base text-white">
                          {proj.title}
                        </span>
                        <span className="text-xs font-mono text-cyan-400">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                            FEATURED
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updateProject(proj.id, { featured: !proj.featured });
                            showNotification(`Toggled featured status for ${proj.title}`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                            proj.featured
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-white/[0.04] text-slate-400 hover:text-white'
                          }`}
                        >
                          {proj.featured ? 'Unfeature' : 'Mark Featured'}
                        </button>

                        <button
                          onClick={() => setEditingProjectId(editingProjectId === proj.id ? null : proj.id)}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.05] hover:bg-white/[0.1] text-slate-200"
                        >
                          {editingProjectId === proj.id ? 'Close' : 'Edit'}
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showNotification('Project deleted.');
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400">{proj.description}</p>

                    {/* Inline Editor if expanded */}
                    {editingProjectId === proj.id && (
                      <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-mono text-slate-400">Project Title</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={e => updateProject(proj.id, { title: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-mono text-slate-400">Subtitle</label>
                            <input
                              type="text"
                              value={proj.subtitle}
                              onChange={e => updateProject(proj.id, { subtitle: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-mono text-slate-400">Category</label>
                            <select
                              value={proj.category}
                              onChange={e => updateProject(proj.id, { category: e.target.value as any })}
                              className="w-full px-3 py-1.5 bg-[#0a0e1a] border border-white/10 rounded-lg text-xs text-white"
                            >
                              <option value="Web">Web</option>
                              <option value="AI">AI</option>
                              <option value="Backend">Backend</option>
                              <option value="UI/UX">UI/UX</option>
                              <option value="University">University</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-mono text-slate-400">Role</label>
                            <input
                              type="text"
                              value={proj.role}
                              onChange={e => updateProject(proj.id, { role: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-mono text-slate-400">Date/Year</label>
                            <input
                              type="text"
                              value={proj.date}
                              onChange={e => updateProject(proj.id, { date: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400">
                            Technologies (comma separated)
                          </label>
                          <input
                            type="text"
                            value={proj.technologies.join(', ')}
                            onChange={e =>
                              updateProject(proj.id, {
                                technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400">Short Description</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={e => updateProject(proj.id, { description: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-mono text-slate-400">Problem</label>
                            <textarea
                              rows={2}
                              value={proj.problem}
                              onChange={e => updateProject(proj.id, { problem: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-mono text-slate-400">Solution</label>
                            <textarea
                              rows={2}
                              value={proj.solution}
                              onChange={e => updateProject(proj.id, { solution: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-mono text-slate-400">GitHub Link</label>
                            <input
                              type="text"
                              value={proj.githubUrl || ''}
                              onChange={e => updateProject(proj.id, { githubUrl: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-mono text-slate-400">Live Demo Link</label>
                            <input
                              type="text"
                              value={proj.liveUrl || ''}
                              onChange={e => updateProject(proj.id, { liveUrl: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BLOG ARTICLES */}
          {activeTab === 'blog' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Articles & Writing</h2>
                  <p className="text-xs font-mono text-slate-400">Write, edit, and toggle publication status</p>
                </div>
                <button
                  onClick={() => {
                    const newArt: Omit<Article, 'id'> = {
                      slug: 'new-article-' + Date.now().toString(36),
                      title: 'New Reflective Article',
                      summary: 'A short summary of what this article is about.',
                      content: [
                        'First paragraph of your article...',
                        'Second paragraph exploring technical details...'
                      ],
                      date: '2026',
                      readTime: '4 min read',
                      category: 'Software Engineering',
                      tags: ['Tech', 'Thoughts'],
                      published: true
                    };
                    addArticle(newArt);
                    showNotification('New article drafted.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Draft Article</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.articles.map(art => (
                  <div key={art.id} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-display font-bold text-white text-base">{art.title}</h3>
                        <div className="text-xs font-mono text-slate-400">
                          {art.category} · {art.date} · {art.readTime}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updateArticle(art.id, { published: !art.published });
                            showNotification(`Article ${art.published ? 'unpublished' : 'published'}.`);
                          }}
                          className={`px-2 py-1 rounded text-xs font-mono ${
                            art.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {art.published ? 'Published' : 'Draft'}
                        </button>
                        <button
                          onClick={() => setEditingArticleId(editingArticleId === art.id ? null : art.id)}
                          className="px-2.5 py-1 text-xs bg-white/[0.05] rounded"
                        >
                          {editingArticleId === art.id ? 'Close' : 'Edit'}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete article?')) deleteArticle(art.id);
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {editingArticleId === art.id && (
                      <div className="pt-4 border-t border-white/10 space-y-3 animate-in fade-in">
                        <div>
                          <label className="text-xs font-mono text-slate-400">Article Title</label>
                          <input
                            type="text"
                            value={art.title}
                            onChange={e => updateArticle(art.id, { title: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400">Summary</label>
                          <textarea
                            rows={2}
                            value={art.summary}
                            onChange={e => updateArticle(art.id, { summary: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400">
                            Content Paragraphs (separated by double newlines)
                          </label>
                          <textarea
                            rows={6}
                            value={Array.isArray(art.content) ? art.content.join('\n\n') : (art.content || '')}
                            onChange={e =>
                              updateArticle(art.id, {
                                content: e.target.value.split('\n\n').filter(Boolean)
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Gallery Archive</h2>
                  <p className="text-xs font-mono text-slate-400">Manage photos, blueprints, and captions</p>
                </div>
                <button
                  onClick={() => {
                    const newItem: Omit<GalleryItem, 'id'> = {
                      title: 'Campus Landmark / Project Session',
                      caption: 'Description of this moment or architectural diagram.',
                      category: 'University',
                      date: '2026',
                      location: 'Legon, Ghana'
                    };
                    addGalleryItem(newItem);
                    showNotification('Added gallery slot.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.gallery.map(item => (
                  <div key={item.id} className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={e => updateGalleryItem(item.id, { title: e.target.value })}
                          className="font-bold text-white text-sm bg-transparent border-b border-transparent hover:border-white/20 focus:border-cyan-400 focus:outline-none"
                        />
                        <div className="text-xs font-mono text-cyan-400">{item.category}</div>
                      </div>
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={item.caption}
                      onChange={e => updateGalleryItem(item.id, { caption: e.target.value })}
                      className="w-full p-2 bg-white/[0.03] border border-white/10 rounded-lg text-xs text-slate-300"
                    />

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.location || ''}
                        onChange={e => updateGalleryItem(item.id, { location: e.target.value })}
                        placeholder="Location"
                        className="w-1/2 p-1.5 bg-white/[0.03] border border-white/10 rounded text-xs text-slate-300"
                      />
                      <input
                        type="text"
                        value={item.date}
                        onChange={e => updateGalleryItem(item.id, { date: e.target.value })}
                        placeholder="Date"
                        className="w-1/2 p-1.5 bg-white/[0.03] border border-white/10 rounded text-xs text-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SKILLS */}
          {activeTab === 'skills' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Skills Matrix</h2>
                  <p className="text-xs font-mono text-slate-400">Real capabilities, descriptions, and engineering contexts</p>
                </div>
                <button
                  onClick={() => {
                    const newS: Omit<Skill, 'id'> = {
                      name: 'New Technology',
                      category: 'Programming',
                      description: 'What you use this for.',
                      context: 'Practical engineering usage context.',
                      icon: 'Code2'
                    };
                    addSkill(newS);
                    showNotification('Added new skill.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.skills.map(s => (
                  <div key={s.id} className="p-3.5 rounded-xl glass-panel border border-white/10 flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{s.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{s.category}</span>
                      </div>
                      <p className="text-xs text-slate-400">{s.description}</p>
                      <p className="text-[11px] text-slate-500 font-mono">Context: {s.context}</p>
                    </div>

                    <button
                      onClick={() => deleteSkill(s.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Contact Submissions</h2>
                  <p className="text-xs font-mono text-slate-400">
                    Transmissions sent via the portfolio contact form
                  </p>
                </div>
              </div>

              {data.messages.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 text-slate-500">
                  No contact messages received yet. Test by submitting through the contact section!
                </div>
              ) : (
                <div className="space-y-4">
                  {data.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        msg.read
                          ? 'glass-panel border-white/[0.08]'
                          : 'bg-cyan-950/20 border-cyan-400/40 shadow-lg shadow-cyan-950/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">{msg.name}</span>
                            <span className="text-xs text-slate-400 font-mono">({msg.email})</span>
                            {!msg.read && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500 text-slate-950 font-bold">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-cyan-300 font-mono mt-0.5">{msg.subject}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => markMessageRead(msg.id, !msg.read)}
                            className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                          >
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || '')}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-cyan-500 text-slate-950 font-bold"
                          >
                            <span>Reply</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-sm text-slate-200 leading-relaxed">
                        {msg.message}
                      </div>

                      <div className="mt-3 text-[11px] font-mono text-slate-500">
                        Received {new Date(msg.createdAt || Date.now()).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SETTINGS & EXPORT/IMPORT */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Data Architecture & Settings</h2>
                <p className="text-xs font-mono text-slate-400">
                  Export complete data for Supabase/Firebase migrations, or backup local state
                </p>
              </div>

              {/* Data Export / Import */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider">
                  Database Portability (JSON)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The portfolio is built with decoupled data structures. You can export the entire state to transfer into PostgreSQL, Supabase, or Firebase later.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const json = exportDataJSON();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `evans_osei_portfolio_${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      showNotification('Portfolio database exported!');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download Complete JSON Backup</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white cursor-pointer">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Import JSON Backup</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => {
                            const content = ev.target?.result as string;
                            if (importDataJSON(content)) {
                              showNotification('Data successfully imported!');
                            } else {
                              alert('Invalid portfolio JSON format.');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-3">
                <h3 className="text-sm font-semibold text-rose-300 uppercase font-mono tracking-wider">
                  Reset State
                </h3>
                <p className="text-xs text-slate-300">
                  Restore the initial rich seeded data for Evans Osei (University of Ghana, PulseCare, NeuroGraph, etc.).
                </p>
                <button
                  onClick={() => {
                    if (confirm('Reset portfolio data back to defaults?')) {
                      resetToDefaults();
                      showNotification('Portfolio reset to initial data.');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 text-xs font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Initial Seed Data</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: EXPERIENCE / EDUCATION / CERTIFICATES */}
          {(activeTab === 'experience' || activeTab === 'education' || activeTab === 'certificates') && (
            <div className="max-w-4xl space-y-6">
              <h2 className="text-xl font-display font-bold text-white capitalize">
                {activeTab} Management
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Edit items directly; changes are automatically persisted to the live site.
              </p>

              {activeTab === 'experience' && (
                <div className="space-y-4">
                  {data.experiences.map(exp => (
                    <div key={exp.id} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-white">{exp.title}</span>
                        <span className="text-xs font-mono text-cyan-400">{exp.period}</span>
                      </div>
                      <p className="text-xs text-slate-400">{exp.organization} · {exp.location}</p>
                      <p className="text-xs text-slate-300">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Institution</label>
                    <input
                      type="text"
                      value={educationForm.institution}
                      onChange={e => setEducationForm({ ...educationForm, institution: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Degree</label>
                    <input
                      type="text"
                      value={educationForm.degree}
                      onChange={e => setEducationForm({ ...educationForm, degree: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                  <button
                    onClick={() => {
                      updateEducation(educationForm);
                      showNotification('Education updated!');
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    Save Education
                  </button>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="space-y-3">
                  {data.certificates.map(c => (
                    <div key={c.id} className="p-4 rounded-xl glass-panel border border-white/10 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white text-sm">{c.title}</div>
                        <div className="text-xs font-mono text-cyan-400">{c.organization} ({c.issueDate})</div>
                      </div>
                      <button
                        onClick={() => deleteCertificate(c.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
