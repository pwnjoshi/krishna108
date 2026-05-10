'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModernNavigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'The Vault' },
    { href: '/about', label: 'Manifesto' },
    { href: '/teachings', label: 'The Code' },
    { href: '/contact', label: 'Inquiry' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-deepSpace-950/90 backdrop-blur-2xl border-b border-white/5 py-4'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-serif font-black text-white tracking-tighter uppercase italic">
              Krishna<span className="text-saffron-500">108</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-black transition-all text-[10px] uppercase tracking-[0.4em] ${
                  pathname === link.href
                    ? 'text-saffron-500'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-4 h-[2px] bg-saffron-500" 
                  />
                )}
              </Link>
            ))}
            <Link
              href="/subscribe"
              className="px-8 py-3 bg-white text-deepSpace-950 font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-saffron-500 transition-all"
            >
              Initialize
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-saffron-500 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 py-12 bg-deepSpace-950 border-b border-white/5 shadow-2xl"
            >
              <div className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-serif font-bold italic transition-colors ${
                      pathname === link.href ? 'text-saffron-500' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/subscribe"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-12 py-4 bg-saffron-500 text-deepSpace-950 font-black uppercase tracking-widest rounded-full"
                >
                  Join Circle
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
