import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PortfolioData, GalleryProject, AwardItem, TrainingItem } from '../../types/portfolio';
import { 
  X, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  User, 
  FolderGit2, 
  Award, 
  GraduationCap, 
  Mail, 
  Sparkles,
  ExternalLink,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface LiveStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSaveData: (updated: PortfolioData) => void;
  onResetData: () => void;
}

export function LiveStudioModal({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetData
}: LiveStudioModalProps) {
  const { isDarkMode } = useTheme();

  // Local draft state
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'awards' | 'trainings' | 'messages' | 'backup'>('profile');
  const [saveToast, setSaveToast] = useState(false);

  // New Project Form state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<GalleryProject>>({
    title: '',
    category: 'Full-Stack Web',
    technologies: ['React', 'TypeScript', 'Node.js'],
    description: '',
    badge: 'New Project',
    accentColor: '#2563eb',
    mockupType: 'dashboard',
    githubUrl: 'https://github.com/evans-osei',
    liveUrl: 'https://demo.app',
  });

  // New Award Form state
  const [isAddingAward, setIsAddingAward] = useState(false);
  const [newAward, setNewAward] = useState<Partial<AwardItem>>({
    title: '',
    subtitle: '',
    year: '2026',
    issuer: 'University of Ghana',
    icon: 'trophy'
  });

  // Sync draft when data changes
  React.useEffect(() => {
    setDraft(data);
  }, [data]);

  if (!isOpen) return null;

  const handleProfileChange = (field: keyof typeof draft.profile, value: any) => {
    setDraft((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSaveData(draft);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draft, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Evans_Osei_Portfolio_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setDraft(parsed);
          onSaveData(parsed);
          setSaveToast(true);
          setTimeout(() => setSaveToast(false), 2500);
        } catch {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteProject = (id: string) => {
    const updated = (draft.galleryProjects || []).filter((p) => p.id !== id);
    setDraft((prev) => ({ ...prev, galleryProjects: updated }));
  };

  const handleAddProjectSubmit = () => {
    if (!newProject.title) return;
    const projectToAdd: GalleryProject = {
      id: 'proj-' + Date.now().toString(36),
      title: newProject.title || 'Untitled Project',
      category: newProject.category || 'Web Application',
      technologies: newProject.technologies || ['TypeScript', 'React'],
      description: newProject.description || '',
      badge: newProject.badge || 'New',
      accentColor: newProject.accentColor || '#2563eb',
      mockupType: newProject.mockupType || 'dashboard',
      githubUrl: newProject.githubUrl,
      liveUrl: newProject.liveUrl,
    };
    setDraft((prev) => ({
      ...prev,
      galleryProjects: [projectToAdd, ...(prev.galleryProjects || [])]
    }));
    setIsAddingProject(false);
    setNewProject({
      title: '',
      category: 'Full-Stack Web',
      technologies: ['React', 'TypeScript', 'Node.js'],
      description: '',
      badge: 'New Project',
      accentColor: '#2563eb',
      mockupType: 'dashboard',
    });
  };

  const handleDeleteAward = (id: string) => {
    const updated = (draft.awards || []).filter((a) => a.id !== id);
    setDraft((prev) => ({ ...prev, awards: updated }));
  };

  const handleAddAwardSubmit = () => {
    if (!newAward.title) return;
    const awardToAdd: AwardItem = {
      id: 'award-' + Date.now().toString(36),
      title: newAward.title || '',
      subtitle: newAward.subtitle || '',
      year: newAward.year || '2026',
      issuer: newAward.issuer || 'University of Ghana',
      icon: (newAward.icon as any) || 'trophy'
    };
    setDraft((prev) => ({
      ...prev,
      awards: [awardToAdd, ...(prev.awards || [])]
    }));
    setIsAddingAward(false);
    setNewAward({ title: '', subtitle: '', year: '2026', issuer: 'University of Ghana', icon: 'trophy' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-hidden transition-colors ${
          isDarkMode ? 'bg-[#0E0E0E] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Top Header Bar */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between shrink-0 ${
          isDarkMode ? 'border-neutral-800 bg-[#0E0E0E]' : 'border-neutral-200 bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Evans Live Portfolio Studio</h2>
              <p className="text-[11px] text-neutral-500 font-mono">
                Update your portfolio anytime · Saves directly to your live app
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Changes Button */}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Save size={14} />
              <span>Save & Publish</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-500/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Studio"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`px-6 border-b flex gap-2 overflow-x-auto shrink-0 ${
          isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-neutral-50'
        }`}>
          {[
            { id: 'profile', label: 'Profile & Bio', icon: User },
            { id: 'projects', label: 'Selected Projects', icon: FolderGit2 },
            { id: 'awards', label: 'Awards & Honors', icon: Award },
            { id: 'trainings', label: 'Trainings', icon: GraduationCap },
            { id: 'messages', label: 'Contact Messages', icon: Mail },
            { id: 'backup', label: 'Export & Backup', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3 border-b-2 font-mono text-xs tracking-wider uppercase font-semibold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'border-amber-400 text-amber-400' 
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Toast confirmation */}
        {saveToast && (
          <div className="absolute top-20 right-6 z-50 bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 size={16} />
            <span>Portfolio updated live!</span>
          </div>
        )}

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-3xl space-y-6">
              {/* Profile Photo Quick Preview & Upload */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-700 bg-black shrink-0">
                    <img 
                      src={localStorage.getItem('evans_custom_photo_url') || '/evans_cutout.svg'} 
                      alt="Evans Osei"
                      className="w-full h-full object-contain object-bottom"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">Hero Portrait</h4>
                    <p className="text-xs text-neutral-400">Custom photo displays in the Hero and About Me sections</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-sm">
                    Upload Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              try {
                                localStorage.setItem('evans_custom_photo_url', ev.target.result as string);
                                window.location.reload();
                              } catch {
                                // storage quota
                              }
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <button
                    onClick={() => {
                      localStorage.removeItem('evans_custom_photo_url');
                      window.location.reload();
                    }}
                    className="px-2.5 py-1.5 rounded-xl border border-neutral-700 text-neutral-400 hover:text-white text-xs transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={draft.profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Headline</label>
                  <input
                    type="text"
                    value={draft.profile.headline}
                    onChange={(e) => handleProfileChange('headline', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Professional Tagline</label>
                <input
                  type="text"
                  value={draft.profile.tagline}
                  onChange={(e) => handleProfileChange('tagline', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">University</label>
                  <input
                    type="text"
                    value={draft.profile.university}
                    onChange={(e) => handleProfileChange('university', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Degree</label>
                  <input
                    type="text"
                    value={draft.profile.degree}
                    onChange={(e) => handleProfileChange('degree', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={draft.profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Bio (Paragraph 1)</label>
                <textarea
                  rows={3}
                  value={draft.profile.bioParagraph1}
                  onChange={(e) => handleProfileChange('bioParagraph1', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none resize-none ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Bio (Paragraph 2 - Projects & Math)</label>
                <textarea
                  rows={3}
                  value={draft.profile.bioParagraph2}
                  onChange={(e) => handleProfileChange('bioParagraph2', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none resize-none ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={draft.profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={draft.profile.githubUrl}
                    onChange={(e) => handleProfileChange('githubUrl', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={draft.profile.linkedinUrl}
                    onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold">Featured 3D Work Gallery Projects</h3>
                  <p className="text-xs text-neutral-500">Edit existing projects or add new case studies to your portfolio</p>
                </div>
                <button
                  onClick={() => setIsAddingProject(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Add Project Form */}
              {isAddingProject && (
                <div className={`p-5 rounded-2xl border mb-6 ${
                  isDarkMode ? 'bg-neutral-900/60 border-neutral-700' : 'bg-neutral-100 border-neutral-300'
                }`}>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold mb-3 text-amber-400">
                    New Project Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Project Title (e.g. PulseCare)"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className={`px-3 py-2 rounded-lg text-xs border ${
                        isDarkMode ? 'bg-black border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Category (e.g. HealthTech / Algorithm)"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className={`px-3 py-2 rounded-lg text-xs border ${
                        isDarkMode ? 'bg-black border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
                      }`}
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Project Description..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg text-xs border mb-3 resize-none ${
                      isDarkMode ? 'bg-black border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingProject(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddProjectSubmit}
                      className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                    >
                      Insert Project
                    </button>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {(draft.galleryProjects || []).map((p) => (
                  <div
                    key={p.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-colors ${
                      isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold">{p.title}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                          {p.badge || p.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-1 max-w-xl">
                        {p.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {p.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-[9px] font-mono text-neutral-500">
                            • {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AWARDS */}
          {activeTab === 'awards' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold">Academic & Capstone Recognitions</h3>
                  <p className="text-xs text-neutral-500">Manage Dean's Honor Roll, capstone awards, and honors</p>
                </div>
                <button
                  onClick={() => setIsAddingAward(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Award</span>
                </button>
              </div>

              {isAddingAward && (
                <div className={`p-4 rounded-2xl border mb-6 ${
                  isDarkMode ? 'bg-neutral-900/60 border-neutral-700' : 'bg-neutral-100 border-neutral-300'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Award Title (e.g. Dean's Honor Roll)"
                      value={newAward.title}
                      onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                      className={`px-3 py-2 rounded-lg text-xs border ${
                        isDarkMode ? 'bg-black border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Issuer (e.g. University of Ghana)"
                      value={newAward.issuer}
                      onChange={(e) => setNewAward({ ...newAward, issuer: e.target.value })}
                      className={`px-3 py-2 rounded-lg text-xs border ${
                        isDarkMode ? 'bg-black border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subtitle / Reason..."
                    value={newAward.subtitle}
                    onChange={(e) => setNewAward({ ...newAward, subtitle: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg text-xs border mb-3 ${
                      isDarkMode ? 'bg-black border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
                    }`}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingAward(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddAwardSubmit}
                      className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                    >
                      Insert Award
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {(draft.awards || []).map((a) => (
                  <div
                    key={a.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                      isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold">{a.title}</h4>
                        <span className="text-[10px] font-mono text-neutral-500">{a.year}</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">{a.subtitle}</p>
                      <span className="text-[10px] font-mono text-emerald-400 block mt-1">{a.issuer}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteAward(a.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete award"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TRAININGS */}
          {activeTab === 'trainings' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold">Workshops, Hackathons & GDSC Leadership</h3>
              <div className="space-y-3">
                {(draft.trainings || []).map((t) => (
                  <div
                    key={t.id}
                    className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                      isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold">{t.title}</h4>
                      <div className="text-[10px] font-mono text-neutral-500 mt-0.5">{t.organization} · {t.date}</div>
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{t.description}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 whitespace-nowrap">
                      {t.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold">Inquiries Received</h3>
                <p className="text-xs text-neutral-500">Messages sent through your portfolio contact form</p>
              </div>

              {(draft.messages || []).length === 0 ? (
                <div className="py-12 text-center text-xs text-neutral-500 font-mono">
                  No contact messages yet. Test submissions from the Contact section will show up here!
                </div>
              ) : (
                <div className="space-y-3">
                  {(draft.messages || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border ${
                        isDarkMode ? 'bg-[#121212] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-bold">{msg.name}</span>
                        <span className="text-neutral-500 font-mono text-[10px]">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <div className="text-xs text-blue-400 font-mono">{msg.email}</div>
                      <p className="mt-2 text-xs leading-relaxed text-neutral-300 bg-black/20 p-3 rounded-lg border border-neutral-800">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: BACKUP & EXPORT */}
          {activeTab === 'backup' && (
            <div className="max-w-xl space-y-6">
              <div>
                <h3 className="text-base font-bold">Data Portability & Backups</h3>
                <p className="text-xs text-neutral-500">Export your data to a JSON file or restore from a backup</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Button */}
                <button
                  onClick={handleExportJSON}
                  className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-colors cursor-pointer ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600' : 'bg-neutral-100 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <Download size={24} className="text-amber-400" />
                  <span className="text-xs font-bold">Export JSON Backup</span>
                  <span className="text-[10px] text-neutral-500">Download all your projects, bio & awards</span>
                </button>

                {/* Import Button */}
                <label 
                  className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-colors cursor-pointer ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600' : 'bg-neutral-100 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <Upload size={24} className="text-blue-400" />
                  <span className="text-xs font-bold">Import JSON File</span>
                  <span className="text-[10px] text-neutral-500">Restore from previously exported backup</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportJSON}
                  />
                </label>
              </div>

              {/* Reset to Defaults */}
              <div className="pt-6 border-t border-neutral-500/10">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset the portfolio to default settings?')) {
                      onResetData();
                      setSaveToast(true);
                      setTimeout(() => setSaveToast(false), 2000);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset All Data to Original Evans Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between shrink-0 ${
          isDarkMode ? 'border-neutral-800 bg-[#0E0E0E]' : 'border-neutral-200 bg-white'
        }`}>
          <span className="text-xs font-mono text-neutral-500">
            Changes auto-save to browser storage
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                isDarkMode ? 'border-neutral-800 hover:bg-neutral-800 text-neutral-300' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
