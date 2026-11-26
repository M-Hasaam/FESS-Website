import { Instagram, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS, type PageId } from '../data/fessData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#141923] text-white pt-14 sm:pt-16 pb-28 md:pb-10 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white mb-2">
              FAST Entrepreneurship and Startup Society
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-5">
              Where Future Leaders Are Born
            </p>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#991B1B] to-red-500" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/40 transition-all duration-150 group text-left"
            >
              <span className="w-10 h-10 rounded-xl bg-red-950/90 border border-red-800/60 flex items-center justify-center text-red-300 group-hover:scale-105 transition-transform">
                <Instagram className="w-5 h-5" />
              </span>
              <span>
                <span className="font-bold text-sm text-white block">Follow Us</span>
                <span className="text-xs text-slate-300 block">{SOCIAL_LINKS.instagram.handle}</span>
              </span>
            </a>

            {SOCIAL_LINKS.linkedin && (
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/40 transition-all duration-150 group text-left"
              >
                <span className="w-10 h-10 rounded-xl bg-red-950/90 border border-red-800/60 flex items-center justify-center text-red-300 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </span>
                <span>
                  <span className="font-bold text-sm text-white block">Connect</span>
                  <span className="text-xs text-slate-300 block">{SOCIAL_LINKS.linkedin.label}</span>
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <nav className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-300" aria-label="Footer Navigation">
            <button type="button" onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <button type="button" onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
              Flagship Event
            </button>
            <button type="button" onClick={() => onNavigate('teams')} className="hover:text-white transition-colors">
              Our Teams
            </button>
            <button type="button" onClick={() => onNavigate('connect')} className="hover:text-white transition-colors">
              Connect
            </button>
          </nav>

          <div className="text-xs text-slate-400 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© 2026 FESS. Building the next generation of entrepreneurs.</span>
            <span className="text-slate-500">Made by FESS Tech Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
