import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TemplateModern from '../components/templates/TemplateModern';
import TemplateMinimal from '../components/templates/TemplateMinimal';
import TemplateCreative from '../components/templates/TemplateCreative';
import TemplateDeveloper from '../components/templates/TemplateDeveloper';
import TemplateHeroProfile from '../components/templates/TemplateHeroProfile';
import TemplateSplitCreative from '../components/templates/TemplateSplitCreative';
import TemplateTimeline from '../components/templates/TemplateTimeline';

const mockPortfolio = {
  title: 'John Doe',
  bio: 'Full-stack developer passionate about building web applications. I love working with React, Node.js, and everything in between.',
  contactEmail: 'john@example.com',
  contactPhone: '+91 98765 43210',
  profileImage: '',
  skills: [
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'JavaScript' },
    { name: 'Python' },
    { name: 'MongoDB' },
  ],
  projects: [
    {
      title: 'Portfolio Creator',
      description: 'A web app for creating stunning portfolios with customizable templates.',
      imageUrl: '',
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      imageUrl: '',
    },
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'IIT Delhi',
      year: '2020 – 2024',
    },
  ],
  customizations: {
    fontFamily: 'sans-serif',
    layout: 'top',
    showSkills: true,
    showProjects: true,
    showEducation: true,
    showContact: true,
  },
};

const themes = {
  blue: { primary: '#3b82f6' },
  purple: { primary: '#a855f7' },
  pink: { primary: '#ec4899' },
  green: { primary: '#22c55e' },
  orange: { primary: '#f97316' },
  neutral: { primary: '#64748b' },
  indigo: { primary: '#6366f1' }
};

const templatesList = [
  {
    id: 'modern',
    name: 'Modern Flex',
    themeKey: 'blue',
    description: 'A vibrant card-based layout with clean gradient styles. Best for designers or marketers.',
    Component: TemplateModern,
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    themeKey: 'neutral',
    description: 'Clean, elegant, whitespace-heavy. Perfect for writers or minimalists.',
    Component: TemplateMinimal,
  },
  {
    id: 'creative',
    name: 'Creative Pop',
    themeKey: 'pink',
    description: 'Colorful angled sections that stand out. Great for illustrators or creatives.',
    Component: TemplateCreative,
  },
  {
    id: 'developer',
    name: 'Dev Terminal',
    themeKey: 'green',
    description: 'Dark-themed Github/IDE aesthetic. Built for software engineers.',
    Component: TemplateDeveloper,
  },
  {
    id: 'hero-profile',
    name: 'Hero Profile',
    themeKey: 'purple',
    description: 'Full-width banner with overlapping profile image. Bold, Canva-inspired hero layout.',
    Component: TemplateHeroProfile,
  },
  {
    id: 'split-creative',
    name: 'Split Creative',
    themeKey: 'indigo',
    description: 'Strong two-panel split layout with colored sidebar and white content area.',
    Component: TemplateSplitCreative,
  },
  {
    id: 'timeline',
    name: 'Timeline Portfolio',
    themeKey: 'blue',
    description: 'Vertical timeline layout with sections as timeline blocks. Minimal and modern.',
    Component: TemplateTimeline,
  },
];

const ChooseTemplate = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleSelect = () => {
    if (!selected) return;
    navigate(`/builder?template=${selected}`);
  };

  const openPreview = (tpl) => {
    setPreviewTemplate(tpl);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  const useTemplate = (templateId) => {
    navigate(`/builder?template=${templateId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center px-6 py-8"
    >
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="border border-white/10 rounded-2xl p-6 text-center">
          <h1 className="font-display text-2xl sm:text-3xl font-black signal-text mb-2">Choose Your Portfolio Template</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Pick from 7 professionally designed templates. Customize everything later in the builder.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesList.map((tpl) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={tpl.id}
              className={`
                relative cursor-pointer rounded-2xl p-6 border transition-all duration-300
                ${selected === tpl.id ? 'border-cyan-400/60 ring-2 ring-cyan-400/40' : 'border-white/10 hover:border-pink-500/40'}
              `}
              onClick={() => setSelected(tpl.id)}
            >
              <div className="mb-4 h-48 rounded-lg overflow-hidden border border-white/10 bg-white relative">
                <div className="w-[400%] h-[400%] scale-[0.25] origin-top-left overflow-hidden pointer-events-none absolute top-0 left-0">
                  <tpl.Component portfolio={{ ...mockPortfolio, template: tpl.id }} theme={themes[tpl.themeKey]} />
                </div>
              </div>

              {selected === tpl.id && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-black rounded-full p-1 z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              )}

              <h3 className="font-display text-lg font-bold text-white mb-1">{tpl.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{tpl.description}</p>

              <div className="border-t border-white/10 mb-4"></div>

              <div className="flex gap-2 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openPreview(tpl);
                  }}
                  className="flex-1 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 text-sm font-semibold transition-colors"
                >
                  👁 Preview
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    useTemplate(tpl.id);
                  }}
                  className="font-display flex-1 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-400 text-black text-sm font-bold transition-all"
                >
                  Use Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center border-t border-white/10 pt-8">
          <motion.div whileHover={{ scale: selected ? 1.05 : 1 }} whileTap={{ scale: selected ? 0.97 : 1 }}>
            <button
              onClick={handleSelect}
              disabled={!selected}
              className="font-display px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              {selected ? 'Continue with Selected Template →' : 'Select a template'}
            </button>
          </motion.div>
        </div>

        {/* Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{previewTemplate.name}</h3>
                  <p className="text-sm text-gray-400">Template Preview</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => useTemplate(previewTemplate.id)}
                    className="font-display px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-black text-sm font-bold transition-all"
                  >
                    Use This Template
                  </motion.button>
                  <button
                    onClick={closePreview}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto bg-black/40 p-4">
                <div className="border border-white/10 rounded-xl overflow-hidden bg-white text-gray-900">
                  <previewTemplate.Component portfolio={{ ...mockPortfolio, template: previewTemplate.id }} theme={themes[previewTemplate.themeKey]} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChooseTemplate;