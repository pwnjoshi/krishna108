import Link from 'next/link';
import { Sparkles, Facebook, Twitter, Instagram } from 'lucide-react';

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deepSpace-950 text-slate-300 border-t border-white/5 relative overflow-hidden py-20">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-saffron-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-8 group">
              <h3 className="text-2xl font-serif font-black text-white tracking-tighter uppercase italic">
                Krishna<span className="text-saffron-500">108</span>
              </h3>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-md font-light text-lg">
              A digital sanctuary decoding the eternal frequencies of the Vedic scriptures. We leverage technology to serve the Infinite. Reach us at <span className="text-saffron-500">wisdom@krishna108.com.np</span>
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-saffron-500 hover:text-deepSpace-950 flex items-center justify-center transition-all group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-8">Navigation</h4>
            <ul className="space-y-6 font-medium text-xs uppercase tracking-widest">
              <li>
                <Link href="/" className="text-slate-300 hover:text-saffron-500 transition-colors">The Vault</Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-saffron-500 transition-colors">Manifesto</Link>
              </li>
              <li>
                <Link href="/teachings" className="text-slate-300 hover:text-saffron-500 transition-colors">The Code</Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-saffron-500 transition-colors">Inquiry</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-8">Resources</h4>
            <ul className="space-y-6 font-medium text-xs uppercase tracking-widest">
              <li>
                <Link href="/subscribe" className="text-slate-300 hover:text-saffron-500 transition-colors">Join Circle</Link>
              </li>
              <li>
                <a href="https://vedabase.io/en/library/bg/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-saffron-500 transition-colors">Bhagavad Gita</a>
              </li>
              <li>
                <a href="https://vedabase.io/en/library/sb/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-saffron-500 transition-colors">Srimad Bhagavatam</a>
              </li>
              <li>
                <a href="https://www.iskcon.org/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-saffron-500 transition-colors">ISKCON World</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <p>© {currentYear} Krishna108 • Eternal Transmission</p>
            <div className="flex gap-10">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          <p className="tracking-widest">
            Powered by <a href="https://techsangi.com.np" target="_blank" rel="noopener noreferrer" className="text-saffron-500/50 hover:text-saffron-500 transition-colors">Tech Sangi</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
