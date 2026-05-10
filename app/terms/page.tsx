"use client";

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <main className="bg-deepSpace-950 text-white min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <h1 className="text-6xl font-serif font-bold italic text-saffron-500">Terms of Service.</h1>
          <div className="space-y-8 text-xl text-slate-400 font-light leading-relaxed">
            <p>By accessing Krishna108, you agree to engage with this platform with respect and sincerity. All content is provided for spiritual growth and educational purposes.</p>
            <p>The transmissions provided here are based on the Vedic scriptures as taught in the disciplic succession. We strive for absolute accuracy in our representation of these eternal truths.</p>
            <p>For any inquiries regarding usage or collaboration, please contact us via the Inquiry page.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
