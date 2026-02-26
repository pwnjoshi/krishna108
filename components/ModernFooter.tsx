/**
 * Modern Footer Component
 * Professional footer with multiple sections and social links
 */

import Link from 'next/link';
import { Sparkles, Facebook, Twitter, Instagram, Mail, MapPin, Clock } from 'lucide-react';

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-10 h-10 text-amber-500" />
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Krishna108
                </h3>
                <p className="text-sm text-gray-400 font-medium">Daily Spiritual Wisdom</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-md text-lg">
              Bringing authentic ISKCON teachings from the Bhagavad Gita and Srimad Bhagavatam 
              to devotees worldwide. Start each day with divine wisdom and practical spiritual guidance.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-600 flex items-center justify-center transition-all transform hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-600 flex items-center justify-center transition-all transform hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-600 flex items-center justify-center transition-all transform hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-400">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/teachings" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  Teachings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-400">Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/subscribe" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  Subscribe
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  Bhagavad Gita
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  Srimad Bhagavatam
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  ISKCON
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-base">
              © {currentYear} Krishna108. All rights reserved.
            </p>
            <div className="flex gap-8 text-base">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
