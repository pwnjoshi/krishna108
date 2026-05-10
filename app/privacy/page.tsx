"use client";

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <main className="bg-deepSpace-950 text-white min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <h1 className="text-6xl font-serif font-bold italic text-saffron-500">Privacy Policy.</h1>
          <div className="space-y-8 text-xl text-slate-400 font-light leading-relaxed">
            <p>Your privacy is sacred to us. We only collect the data you explicitly provide (like your name and email) to facilitate transmissions from Krishna108.</p>
            <p>We do not sell, rent, or trade your personal information with any third-party entities. All data is handled with the highest level of integrity and service.</p>
            <p>If you have any questions regarding your data, please reach out to us at <span className="text-saffron-500">wisdom@krishna108.com.np</span></p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
