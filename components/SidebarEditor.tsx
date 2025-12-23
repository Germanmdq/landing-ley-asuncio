
import React, { useState } from 'react';
import { LandingPageData, SectionCopy } from '../types';
import { ChevronDownIcon, ChevronUpIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { refineSectionCopy } from '../geminiService';

interface SidebarEditorProps {
  data: LandingPageData;
  onUpdate: (id: string, newContent: any) => void;
}

const SidebarEditor: React.FC<SidebarEditorProps> = ({ data, onUpdate }) => {
  const [openSection, setOpenSection] = useState<string | null>("above_the_fold");
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleChange = (id: string, field: string, value: any) => {
    const section = data.sections.find(s => s.id === id);
    if (section) {
      onUpdate(id, { ...section.content, [field]: value });
    }
  };

  const handleBulletChange = (id: string, index: number, value: string) => {
    const section = data.sections.find(s => s.id === id);
    if (section && section.content.bullets) {
      const newBullets = [...section.content.bullets];
      newBullets[index] = value;
      onUpdate(id, { ...section.content, bullets: newBullets });
    }
  };

  const handleRefine = async (section: SectionCopy) => {
    const sectionFeedback = feedback[section.id] || "Make it more persuasive and clear.";
    setIsLoading(section.id);
    try {
      const refined = await refineSectionCopy(section.id, section.content, sectionFeedback);
      onUpdate(section.id, refined);
      setFeedback(prev => ({ ...prev, [section.id]: "" }));
    } catch (error) {
      console.error("AI Refinement failed", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {data.sections.map((section) => (
        <div key={section.id} className="bg-slate-700/50 rounded-xl border border-white/5 overflow-hidden">
          <button 
            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition"
          >
            <div>
              <h3 className="text-sm font-semibold text-white">{section.name}</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{section.id.replace('_', ' ')}</p>
            </div>
            {openSection === section.id ? <ChevronUpIcon className="w-4 h-4 text-slate-400" /> : <ChevronDownIcon className="w-4 h-4 text-slate-400" />}
          </button>

          {openSection === section.id && (
            <div className="p-4 pt-0 border-t border-white/5 space-y-4">
              <p className="text-xs text-slate-400 italic mb-4">{section.purpose}</p>
              
              {section.content.eyebrow !== undefined && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Eyebrow</label>
                  <input 
                    type="text" 
                    value={section.content.eyebrow} 
                    onChange={(e) => handleChange(section.id, 'eyebrow', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Headline</label>
                <textarea 
                  rows={2}
                  value={section.content.headline} 
                  onChange={(e) => handleChange(section.id, 'headline', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              {section.content.bullets && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bullets</label>
                  {section.content.bullets.map((bullet, idx) => (
                    <input 
                      key={idx}
                      type="text" 
                      value={bullet} 
                      onChange={(e) => handleBulletChange(section.id, idx, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none mb-1"
                    />
                  ))}
                </div>
              )}

              {section.content.painPoint && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pain Point</label>
                  <textarea 
                    rows={3}
                    value={section.content.painPoint} 
                    onChange={(e) => handleChange(section.id, 'painPoint', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>
              )}

              {section.content.cta && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Button Text</label>
                  <input 
                    type="text" 
                    value={section.content.cta} 
                    onChange={(e) => handleChange(section.id, 'cta', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              )}

              <div className="pt-4 border-t border-white/5">
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">AI Feedback (Optional)</label>
                <input 
                  type="text"
                  placeholder="e.g., 'Make it punchier', 'Target skeptical users'"
                  value={feedback[section.id] || ""}
                  onChange={(e) => setFeedback(prev => ({ ...prev, [section.id]: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white mb-2"
                />
                <button 
                  onClick={() => handleRefine(section)}
                  disabled={!!isLoading}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg text-xs text-white font-medium flex items-center justify-center gap-2 transition"
                >
                  <SparklesIcon className={`w-3 h-3 ${isLoading === section.id ? 'animate-spin' : ''}`} />
                  {isLoading === section.id ? 'Refining...' : 'Refine with Gemini'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarEditor;
