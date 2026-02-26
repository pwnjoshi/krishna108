/**
 * Modern Navigation Component with Glassmorphism
 * Sticky header with blur effect and smooth animations
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Bell } from 'lucide-react';

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
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/teachings', label: 'Teachings' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-xl border-b border-amber-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="transform group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Krishna108
              </span>
              <p className="text-xs text-gray-600 -mt-1 font-medium">Daily Spiritual Wisdom</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-semibold transition-colors text-base ${
                  pathname === link.href
                    ? 'text-amber-700'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full" />
                )}
              </Link>
            ))}
            <Link
              href="/subscribe"
              className="group px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full hover:from-amber-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors rounded-lg hover:bg-amber-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-2xl border-t border-amber-200/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 py-3 font-semibold transition-colors ${
                  pathname === link.href
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full text-center shadow-md"
            >
              <Bell className="w-4 h-4" />
              Subscribe
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
