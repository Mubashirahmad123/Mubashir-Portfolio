import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, RefreshCw, Github, Linkedin, ShieldCheck, Database } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { submitContactMessage, isSupabaseConfigured } from '../../lib/supabase';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultState, setResultState] = useState<{ success: boolean; mode?: 'supabase' | 'local'; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setResultState({
        success: false,
        message: 'Please fill in your name, email, and message.',
      });
      return;
    }

    setIsSubmitting(true);
    setResultState(null);

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setResultState({
          success: true,
          mode: res.mode,
          message: res.mode === 'supabase'
            ? 'Thank you! Your message has been inserted into the Supabase database.'
            : 'Thank you! Your message has been safely received (Demo/Local mode enabled).',
        });
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setResultState({
          success: false,
          message: res.error || 'Unable to deliver message at this time.',
        });
      }
    } catch (err: any) {
      setResultState({
        success: false,
        message: err?.message || 'Unexpected connection error.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1.5 uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Collaboration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Initiate Contact & Discussion
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Currently discussing opportunities for Full Stack and Backend Engineering roles, AI automation projects, and technical consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info & Free Backend Architecture Strip (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white tracking-tight">Direct Channels</h3>
              
              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 p-2.5 rounded bg-zinc-950/60 border border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-3 p-2.5 rounded bg-zinc-950/60 border border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>

                <div className="flex items-center gap-3 p-2.5 rounded bg-zinc-950/60 border border-zinc-800 text-zinc-400">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-2 flex items-center gap-3 font-mono text-xs">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-zinc-300" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Supabase Free-Tier Architecture Explanation */}
            <div className="p-5 rounded-xl bg-zinc-950/80 border border-zinc-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Backend Persistence Tier</span>
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  isSupabaseConfigured 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}>
                  {isSupabaseConfigured ? 'Supabase Connected' : 'Local Fallback Ready'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Integrated with <strong>Supabase free tier</strong> for zero-cost PostgreSQL message storage. Built with automatic graceful degradation to browser localStorage so forms never crash even without credentials.
              </p>
            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-4"
            >
              <h3 className="text-base font-bold text-white tracking-tight">Send a Direct Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Henderson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 font-sans transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 font-sans transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Company / Organization (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. FastBeetle, Scale AI, or Independent"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 font-sans transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Message / Discussion Scope *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about the role, technical project, or questions you have..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 font-sans transition-colors resize-none"
                />
              </div>

              {/* Status Banner */}
              {resultState && (
                <div className={`p-3 rounded-md text-xs font-mono flex items-start gap-2 ${
                  resultState.success 
                    ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-400' 
                    : 'bg-rose-950/30 border border-rose-500/40 text-rose-400'
                }`}>
                  {resultState.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{resultState.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm shadow-emerald-500/20"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Mubashir</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
