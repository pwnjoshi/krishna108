"use client";

import { motion } from 'framer-motion';
import { Book, Heart, Sunrise, Anchor, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function TeachingsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="bg-deepSpace-950 text-white min-h-screen pt-24 pb-20 md:pb-40">
      {/* 01. THE MANIFESTO HEADER */}
      <section className="container mx-auto px-6 py-12 md:py-24 border-b border-white/5">
        <motion.div {...fadeIn} className="max-w-6xl">
           <span className="text-saffron-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">The Foundation</span>
           <h1 className="text-[14vw] md:text-[10vw] lg:text-[7vw] font-serif font-bold leading-[0.85] tracking-tighter mb-10 md:mb-16 italic">
             ANCIENT <br/> <span className="text-saffron-500">TRUTH.</span>
           </h1>
           <p className="text-xl md:text-3xl lg:text-4xl text-slate-400 font-light leading-tight max-w-4xl">
             We decode the eternal frequencies of the Vedic scriptures for the modern conscious explorer. No fluff. Just pure spiritual transmission.
           </p>
        </motion.div>
      </section>

      {/* 02. SCRIPTURAL SOURCES: BRUTALIST CARDS */}
      <section className="container mx-auto px-6 py-20 md:py-40">
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {/* Bhagavad Gita */}
          <motion.div 
            whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
            className="p-8 md:p-16 lg:p-24 bg-deepSpace-950 transition-colors group"
          >
            <div className="flex justify-between items-start mb-8 md:mb-12">
               <span className="text-4xl md:text-6xl font-serif italic text-white/10 group-hover:text-saffron-500/20 transition-colors">01</span>
               <Book className="w-8 h-8 md:w-12 md:h-12 text-saffron-500" />
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-8 group-hover:italic transition-all">Bhagavad <br/> <span className="text-saffron-500">Gita.</span></h3>
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-10 md:mb-12">
              The ultimate guide to consciousness, duty, and divinity. 700 verses that solve every human dilemma ever conceived.
            </p>
            <Link href="/" className="inline-flex items-center gap-4 text-white font-bold tracking-widest uppercase text-xs md:text-sm border-b-2 border-white pb-2 hover:border-saffron-500 hover:text-saffron-500 transition-all">
              Explore the Code <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>

          {/* Srimad Bhagavatam */}
          <motion.div 
            whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
            className="p-8 md:p-16 lg:p-24 bg-deepSpace-950 transition-colors group"
          >
            <div className="flex justify-between items-start mb-8 md:mb-12">
               <span className="text-4xl md:text-6xl font-serif italic text-white/10 group-hover:text-saffron-500/20 transition-colors">02</span>
               <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-saffron-500" />
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-8 group-hover:italic transition-all">Srimad <br/> <span className="text-saffron-500">Bhagavatam.</span></h3>
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-10 md:mb-12">
              The post-graduate study of spiritual science. Immersive histories and cosmic philosophy for the serious seeker.
            </p>
            <Link href="/" className="inline-flex items-center gap-4 text-white font-bold tracking-widest uppercase text-xs md:text-sm border-b-2 border-white pb-2 hover:border-saffron-500 hover:text-saffron-500 transition-all">
              Enter the Epic <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 03. PHILOSOPHY PILLARS */}
      <section className="container mx-auto px-6 py-20 md:py-40">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-16 md:gap-20">
           <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-serif font-bold italic lg:sticky lg:top-32">The Pillars of <br/> <span className="text-saffron-500">Bhakti.</span></h2>
           </div>
           <div className="lg:col-span-2 space-y-20 md:space-y-32">
              {[
                { icon: Sunrise, title: "Sadhana", desc: "The technology of daily practice. Morning rituals that align your frequency with the divine." },
                { icon: Heart, title: "Prema", desc: "Pure, unconditional divine love. The ultimate destination of all conscious evolution." },
                { icon: Anchor, title: "Dharma", desc: "Alignment with the cosmic order. Living your truth without compromise." }
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  className="group flex flex-col md:flex-row gap-6 md:gap-12"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-[30px] bg-white/5 border border-white/10 flex items-center justify-center text-saffron-500 group-hover:bg-saffron-500 group-hover:text-deepSpace-950 transition-all">
                    <pillar.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">{pillar.title}</h4>
                    <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 04. CTA: THE CALL */}
      <section className="container mx-auto px-6 py-20 md:py-40">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-saffron-500 p-8 md:p-16 lg:p-32 rounded-[30px] md:rounded-[60px] text-deepSpace-950 text-center relative overflow-hidden"
         >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold leading-none tracking-tighter mb-8 md:mb-12 italic uppercase">READY FOR THE <br/> REVELATION?</h2>
              <Link href="/subscribe" className="inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-6 bg-deepSpace-950 text-white rounded-full font-black tracking-widest uppercase hover:bg-white hover:text-deepSpace-950 transition-all text-xs md:text-base">
                Subscribe to the Pulse <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10">
              <Sparkles className="w-32 h-32 md:w-64 md:h-64" />
            </div>
         </motion.div>
      </section>
    </main>
  );
}
