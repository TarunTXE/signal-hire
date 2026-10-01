import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as api from '../services/api';
import ResumeTemplateClassic from '../components/templates/ResumeTemplateClassic';
import ResumeTemplateMedical from '../components/templates/ResumeTemplateMedical';
import ResumeTemplateBusiness from '../components/templates/ResumeTemplateBusiness';
import ResumeTemplateAcademic from '../components/templates/ResumeTemplateAcademic';
import ResumeTemplateCreative from '../components/templates/ResumeTemplateCreative';

const RESUME_TEMPLATES = [
  {
    id: 'classic', name: 'Classic', Component: ResumeTemplateClassic, defaultColor: '#1a1a1a',
    tabLabels: { info: 'Info', education: 'Education', experience: 'Experience', skills: 'Skills', projects: 'Projects' },
  },
  {
    id: 'medical', name: 'Medical', Component: ResumeTemplateMedical, defaultColor: '#1e3a5f',
    tabLabels: { info: 'Profile', education: 'Education & Credentials', experience: 'Clinical Experience', skills: 'Certifications', projects: 'Research & Case Work' },
  },
  {
    id: 'business', name: 'Business', Component: ResumeTemplateBusiness, defaultColor: '#333333',
    tabLabels: { info: 'Info', education: 'Education', experience: 'Professional Experience', skills: 'Core Competencies', projects: 'Key Initiatives' },
  },
  {
    id: 'academic', name: 'Academic', Component: ResumeTemplateAcademic, defaultColor: '#7f1d1d',
    tabLabels: { info: 'Profile', education: 'Education', experience: 'Academic Experience', skills: 'Research Skills', projects: 'Publications' },
  },
  {
    id: 'creative', name: 'Creative', Component: ResumeTemplateCreative, defaultColor: '#a855f7',
    tabLabels: { info: 'About', education: 'Education', experience: 'Experience', skills: 'Skills', projects: 'Selected Work' },
  },
];

const emptyResume = {
  fullName: '',
  bio: '',
  contactEmail: '',
  contactPhone: '',
  location: '',
  githubLink: '',
  linkedinLink: '',
  websiteLink: '',
  skills: [],
  education: [],
  experience: [],
  projects: [],
};

const ResumeBuilder = () => {
  const [data, setData] = useState(emptyResume);
  const [resumeTemplate, setResumeTemplate] = useState('classic');
  const activeMeta = RESUME_TEMPLATES.find((t) => t.id === resumeTemplate) || RESUME_TEMPLATES[0];
  const ActiveTemplate = activeMeta.Component;

  const [accentColor, setAccentColor] = useState(activeMeta.defaultColor);

  // Reset accent color to the template's default whenever the template changes
  useEffect(() => {
    setAccentColor(activeMeta.defaultColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeTemplate]);

  const [tab, setTab] = useState('info');
  const [parsing, setParsing] = useState(false);
  const [resumeMsg, setResumeMsg] = useState('');
  const [exporting, setExporting] = useState(false);
  const printRef = useRef();

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setResumeMsg('Please upload a PDF file');
      e.target.value = '';
      return;
    }
    setParsing(true);
    setResumeMsg('');
    try {
      const { data: res } = await api.uploadResume(file);
      const draft = res.draft;
      setData({
        fullName: draft.fullName || '',
        bio: draft.bio || '',
        contactEmail: draft.contactEmail || '',
        contactPhone: draft.contactPhone || '',
        location: draft.location || '',
        githubLink: draft.githubLink || '',
        linkedinLink: draft.linkedinLink || '',
        websiteLink: draft.websiteLink || '',
        skills: draft.skills || [],
        education: draft.education || [],
        experience: draft.experience || [],
        projects: draft.projects || [],
      });
      setResumeMsg('Resume imported! Review and edit below.');
    } catch (err) {
      console.error('Resume parse error:', err.response?.data || err.message);
      setResumeMsg(err.response?.data?.message || 'Failed to parse resume');
    } finally {
      setParsing(false);
      e.target.value = '';
      setTimeout(() => setResumeMsg(''), 4000);
    }
  };

  const [skillInput, setSkillInput] = useState('');
  const addSkill = () => {
    if (!skillInput.trim()) return;
    update('skills', [...data.skills, { name: skillInput.trim() }]);
    setSkillInput('');
  };
  const removeSkill = (i) => update('skills', data.skills.filter((_, idx) => idx !== i));

  const addEducation = () => update('education', [...data.education, { degree: '', institution: '', startYear: '', endYear: '', gpa: '' }]);
  const updateEducation = (i, field, value) => {
    const updated = [...data.education];
    updated[i] = { ...updated[i], [field]: value };
    update('education', updated);
  };
  const removeEducation = (i) => update('education', data.education.filter((_, idx) => idx !== i));

  const addExperience = () => update('experience', [...data.experience, { title: '', company: '', description: '', startYear: '', endYear: '' }]);
  const updateExperience = (i, field, value) => {
    const updated = [...data.experience];
    updated[i] = { ...updated[i], [field]: value };
    update('experience', updated);
  };
  const removeExperience = (i) => update('experience', data.experience.filter((_, idx) => idx !== i));

  const addProject = () => update('projects', [...data.projects, { title: '', description: '', techStack: [] }]);
  const updateProject = (i, field, value) => {
    const updated = [...data.projects];
    updated[i] = { ...updated[i], [field]: value };
    update('projects', updated);
  };
  const removeProject = (i) => update('projects', data.projects.filter((_, idx) => idx !== i));

  const handleExportPDF = async () => {
    try {
      setExporting(true);
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const original = printRef.current.firstChild;
      if (!original) throw new Error('Resume content not found');
      const clone = original.cloneNode(true);

      const container = document.createElement('div');
      container.style.cssText =
        'position:fixed;left:-9999px;top:0;width:800px;background:#fff;color:#000;font-family:sans-serif;all:initial;';
      container.appendChild(clone);
      document.body.appendChild(container);

      const opt = {
        margin: [8, 8, 8, 8],
        filename: `${data.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(container).save();
      document.body.removeChild(container);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all text-white placeholder-gray-500';

  const tabKeys = ['info', 'education', 'experience', 'skills', 'projects'];

  const renderInfo = () => (
    <div className="space-y-4">
      <input className={inputClass} placeholder="Full Name" value={data.fullName} onChange={(e) => update('fullName', e.target.value)} />
      <textarea className={inputClass + ' min-h-[80px]'} placeholder="Professional Summary" value={data.bio} onChange={(e) => update('bio', e.target.value)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className={inputClass} placeholder="Email" value={data.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} />
        <input className={inputClass} placeholder="Phone" value={data.contactPhone} onChange={(e) => update('contactPhone', e.target.value)} />
        <input className={inputClass} placeholder="Location" value={data.location} onChange={(e) => update('location', e.target.value)} />
        <input className={inputClass} placeholder="GitHub" value={data.githubLink} onChange={(e) => update('githubLink', e.target.value)} />
        <input className={inputClass} placeholder="LinkedIn" value={data.linkedinLink} onChange={(e) => update('linkedinLink', e.target.value)} />
        <input className={inputClass} placeholder="Website" value={data.websiteLink} onChange={(e) => update('websiteLink', e.target.value)} />
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {data.education.map((e, i) => (
        <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/10 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Education {i + 1}</span>
            <button onClick={() => removeEducation(i)} className="text-red-400 text-sm">Remove</button>
          </div>
          <input className={inputClass} placeholder="Institution" value={e.institution} onChange={(ev) => updateEducation(i, 'institution', ev.target.value)} />
          <input className={inputClass} placeholder="Degree" value={e.degree} onChange={(ev) => updateEducation(i, 'degree', ev.target.value)} />
          <div className="grid grid-cols-3 gap-2">
            <input className={inputClass} placeholder="Start Year" value={e.startYear} onChange={(ev) => updateEducation(i, 'startYear', ev.target.value)} />
            <input className={inputClass} placeholder="End Year" value={e.endYear} onChange={(ev) => updateEducation(i, 'endYear', ev.target.value)} />
            <input className={inputClass} placeholder="GPA" value={e.gpa} onChange={(ev) => updateEducation(i, 'gpa', ev.target.value)} />
          </div>
        </div>
      ))}
      <button onClick={addEducation} className="w-full py-3 rounded-xl border-2 border-dashed border-white/10 text-gray-400 hover:border-pink-500/50 hover:text-pink-300 transition-all text-sm font-semibold">
        + Add Education
      </button>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      {data.experience.map((x, i) => (
        <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/10 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">{activeMeta.tabLabels.experience} {i + 1}</span>
            <button onClick={() => removeExperience(i)} className="text-red-400 text-sm">Remove</button>
          </div>
          <input className={inputClass} placeholder={resumeTemplate === 'medical' ? 'Role / Position' : 'Job Title'} value={x.title} onChange={(ev) => updateExperience(i, 'title', ev.target.value)} />
          <input className={inputClass} placeholder={resumeTemplate === 'medical' ? 'Hospital / Institution' : 'Company'} value={x.company} onChange={(ev) => updateExperience(i, 'company', ev.target.value)} />
          <textarea className={inputClass + ' min-h-[70px]'} placeholder="One bullet point per line" value={x.description} onChange={(ev) => updateExperience(i, 'description', ev.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input className={inputClass} placeholder="Start Year" value={x.startYear} onChange={(ev) => updateExperience(i, 'startYear', ev.target.value)} />
            <input className={inputClass} placeholder="End Year" value={x.endYear} onChange={(ev) => updateExperience(i, 'endYear', ev.target.value)} />
          </div>
        </div>
      ))}
      <button onClick={addExperience} className="w-full py-3 rounded-xl border-2 border-dashed border-white/10 text-gray-400 hover:border-pink-500/50 hover:text-pink-300 transition-all text-sm font-semibold">
        + Add {activeMeta.tabLabels.experience}
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className={inputClass}
          placeholder={resumeTemplate === 'medical' ? 'Add a certification or skill' : 'Add a skill'}
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <button onClick={addSkill} className="font-display px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-400 text-black text-sm font-bold whitespace-nowrap">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 text-sm border border-white/10">
            {s.name}
            <button onClick={() => removeSkill(i)} className="ml-1 text-gray-500 hover:text-red-400">✕</button>
          </span>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {data.projects.map((p, i) => (
        <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/10 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">{activeMeta.tabLabels.projects} {i + 1}</span>
            <button onClick={() => removeProject(i)} className="text-red-400 text-sm">Remove</button>
          </div>
          <input className={inputClass} placeholder={resumeTemplate === 'academic' ? 'Publication / Project Title' : 'Project Title'} value={p.title} onChange={(ev) => updateProject(i, 'title', ev.target.value)} />
          <textarea className={inputClass + ' min-h-[60px]'} placeholder="Description" value={p.description} onChange={(ev) => updateProject(i, 'description', ev.target.value)} />
          <input
            className={inputClass}
            placeholder={resumeTemplate === 'academic' ? 'Journal / co-authors (comma separated)' : 'Tech stack (comma separated)'}
            value={(p.techStack || []).join(', ')}
            onChange={(ev) => updateProject(i, 'techStack', ev.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
          />
        </div>
      ))}
      <button onClick={addProject} className="w-full py-3 rounded-xl border-2 border-dashed border-white/10 text-gray-400 hover:border-pink-500/50 hover:text-pink-300 transition-all text-sm font-semibold">
        + Add {activeMeta.tabLabels.projects}
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center px-6 py-8"
    >
      <div className="w-full max-w-7xl">
        <div className="border border-white/10 rounded-2xl p-6 mb-6 text-center">
          <h1 className="font-display text-2xl sm:text-3xl font-black signal-text mb-2">Signal Hire — Resume Studio</h1>
          <p className="text-gray-400 text-sm">Build a clean, ATS-friendly resume — no login required</p>
        </div>

        {/* Import box */}
        <div className="border border-dashed border-cyan-400/30 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-6">
          <div>
            <p className="text-sm font-bold text-white">⚡ Import from Resume</p>
            <p className="text-xs text-gray-400 mt-1">Upload a PDF resume to auto-fill this form.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              disabled={parsing}
              className="text-gray-400 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-cyan-400 file:text-black file:font-bold file:cursor-pointer transition-all disabled:opacity-50"
            />
            {parsing && <span className="text-xs text-cyan-300 animate-pulse">Parsing...</span>}
          </div>
        </div>
        {resumeMsg && <p className="text-sm text-center text-cyan-300 mb-6">{resumeMsg}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form side */}
          <div>
            <div className="flex flex-wrap gap-2 border border-white/10 p-2 rounded-xl mb-4">
              {tabKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`font-display px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex-1 min-w-[90px] ${
                    tab === key ? 'bg-gradient-to-r from-pink-500 to-cyan-400 text-black' : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {activeMeta.tabLabels[key]}
                </button>
              ))}
            </div>
            <div className="border border-white/10 rounded-2xl p-6 min-h-[400px]">
              {tab === 'info' && renderInfo()}
              {tab === 'education' && renderEducation()}
              {tab === 'experience' && renderExperience()}
              {tab === 'skills' && renderSkills()}
              {tab === 'projects' && renderProjects()}
            </div>
          </div>

          {/* Preview side */}
          <div>
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h3 className="font-display text-lg font-bold text-white">Live Preview</h3>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={resumeTemplate}
                  onChange={(e) => setResumeTemplate(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                >
                  {RESUME_TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer bg-transparent"
                    title="Accent color"
                  />
                  <span className="text-xs text-gray-400 font-mono hidden sm:inline">{accentColor}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="font-display px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black text-sm font-bold disabled:opacity-50"
                >
                  {exporting ? '⏳ Exporting...' : '📄 Export PDF'}
                </motion.button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[75vh] overflow-y-auto" ref={printRef}>
              <ActiveTemplate resume={data} accentColor={accentColor} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;