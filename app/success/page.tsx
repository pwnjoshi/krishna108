"use client";

import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="bg-deepSpace-950 text-white min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center space-y-12"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-saffron-500/10 flex items-center justify-center text-saffron-500">
            <CheckCircle className="w-12 h-12" />
          </div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold italic uppercase tracking-tighter">
            Transmission <br/> <span className="text-saffron-500">Received.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
            Your message has been encoded into the temple pulse. We shall respond as the Divine guides.
          </p>
        </div>

        <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-xs font-black tracking-widest uppercase hover:bg-white hover:text-deepSpace-950 transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Vault
        </Link>
      </motion.div>
    </main>
  );
}
