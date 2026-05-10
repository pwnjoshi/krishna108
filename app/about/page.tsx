"use client";

import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="bg-deepSpace-950 text-white min-h-screen pt-24 pb-20">
      {/* 01. THE ORIGIN: CINEMATIC HERO */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-deepSpace-900">
          <div 
            className="w-full h-full bg-cover bg-center opacity-30 grayscale contrast-125"
            style={{ backgroundImage: `url('/manifesto.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deepSpace-950/20 via-deepSpace-950/80 to-deepSpace-950" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <span className="text-saffron-500 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Our Manifesto</span>
            <h1 className="text-[14vw] md:text-[8vw] font-serif font-bold leading-[0.8] tracking-tighter italic mb-8 md:mb-12">
              THE <br/> <span className="text-saffron-500">AWAKENING.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed">
              Krishna108 is a digital sanctuary dedicated to presenting the authentic Vedic science of God-realization, as taught in the authorized disciplic succession.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02. THE MISSION: SPLIT LAYOUT */}
      <section className="container mx-auto px-6 py-24 md:py-40">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="space-y-8 md:space-y-12">
            <h2 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">
              Why we <br/> <span className="text-saffron-500">Exist.</span>
            </h2>
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-slate-400 font-light leading-relaxed">
               <p>
                 In an age of distraction, we have lost the anchor of our eternal relationship with Krishna. Krishna108 was born to restore that connection.
               </p>
               <p>
                 We leverage technology to serve the Absolute Truth. Every pixel and every transmission is an offering to the Supreme Personality of Godhead, Lord Sri Krishna.
               </p>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-[30px] md:rounded-[60px] overflow-hidden aspect-square shadow-2xl bg-deepSpace-900"
          >
            <img 
              src="/mission.png" 
              alt="Our Mission" 
              className="w-full h-full object-cover grayscale-[20%] contrast-110"
            />
          </motion.div>
        </div>
      </section>

      {/* 03. CORE VALUES: GRID */}
      <section className="bg-white text-deepSpace-950 py-24 md:py-40 rounded-t-[40px] md:rounded-t-[60px]">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:mb-24">
             <h2 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">The Code <br/> <span className="text-saffron-500">We Live By.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { icon: Shield, title: "Authenticity", desc: "Zero compromise on scriptural purity. We follow the disciplic succession with absolute fidelity." },
              { icon: Zap, title: "Innovation", desc: "Using the tools of the 21st century to amplify the wisdom of the ancients." },
              { icon: Heart, title: "Devotion", desc: "Bhakti is the core of everything. Our work is an offering, not a commodity." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.2 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-deepSpace-950 text-saffron-500 flex items-center justify-center">
                  <value.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold italic">{value.title}</h3>
                <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. THE TEAM: MINIMALIST */}
      <section className="bg-deepSpace-950 py-24 md:py-40">
        <div className="container mx-auto px-6 text-center">
           <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-6xl font-serif font-bold italic text-white mb-10 md:mb-16 uppercase">
                A Global <span className="text-saffron-500">Collective.</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 font-light max-w-3xl mx-auto mb-16 md:mb-24 leading-relaxed">
                We are a distributed team of devotees, engineers, and designers unified by a single vision: to make the divine accessible to all.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-4 text-saffron-500 font-bold tracking-widest uppercase text-xs md:text-sm border-b border-saffron-500 pb-2 hover:text-white hover:border-white transition-all">
                Connect with the Mission <ArrowRight className="w-5 h-5" />
              </Link>
           </motion.div>
        </div>
      </section>
    </main>
  );
}
