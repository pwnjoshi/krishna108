"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BookOpen, Sunrise, Heart, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { useRef } from 'react';
import { Post } from '@/lib/types';

interface HomeClientProps {
  recentPosts: Post[];
}

export default function HomeClient({ recentPosts }: HomeClientProps) {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  const getSpan = (index: number) => {
    const spans = [
      "md:col-span-2 md:row-span-2",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-2",
      "md:col-span-2 md:row-span-1",
    ];
    return spans[index % spans.length];
  };

  const defaultImages = [
    "/soul.png",
    "/kurukshetra.png",
    "/abode.png",
    "/bhakti.png",
    "/mastery.png",
  ];

  return (
    <main className="bg-deepSpace-950" ref={containerRef}>
      {/* 01. HERO: THE MANIFESTO */}
      <section ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20">
        <motion.div 
          style={{ y, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0 bg-deepSpace-900"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-deepSpace-950/20 via-deepSpace-950/40 to-deepSpace-950 z-10" />
          <div 
            className="w-full h-full bg-cover bg-center grayscale-[20%] contrast-125 opacity-40"
            style={{ backgroundImage: `url('/hero.png')` }}
          />
        </motion.div>

        <div className="relative z-20 container mx-auto px-6">
          <div className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="h-[1px] w-8 md:w-12 bg-saffron-500" />
                <span className="text-saffron-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">The Eternal Code</span>
              </div>
              
              <h1 className="text-[16vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-serif font-bold text-white mb-8 md:mb-12 tracking-tighter">
                ANCIENT <br/>
                <span className="inline-block text-transparent border-t-2 border-white/10 pt-2 md:pt-4 bg-clip-text bg-gradient-to-r from-saffron-300 via-white to-saffron-500">
                  WISDOM.
                </span>
              </h1>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end">
                <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-md">
                  Transforming existence through the timeless frequencies of the Bhagavad Gita. A digital sanctuary for the conscious soul.
                </p>
                <div className="flex flex-col items-start gap-8">
                   <Link href="#wisdom-grid" className="group relative px-8 md:px-12 py-4 md:py-5 overflow-hidden rounded-full bg-white text-deepSpace-950 font-bold transition-all hover:pr-14 md:hover:pr-16 text-sm md:text-base">
                     <span className="relative z-10">ENTER SANCTUARY</span>
                     <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                       <ArrowRight className="w-5 h-5" />
                     </div>
                   </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 hidden sm:block">
           <div className="flex flex-col items-end gap-1 md:gap-2">
             <span className="text-white/20 text-[50px] md:text-[80px] font-serif italic leading-none">108</span>
             <span className="text-saffron-500 tracking-[0.5em] text-[8px] md:text-[10px] font-bold">SACRED ALIGNMENT</span>
           </div>
        </div>
      </section>

      {/* 02. THE VAULT: BENTO GRID */}
      <section id="wisdom-grid" className="py-24 md:py-40 bg-white text-deepSpace-950 rounded-t-[40px] md:rounded-t-[60px] relative z-40 -mt-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-saffron-600 font-bold tracking-widest text-[10px] md:text-xs uppercase mb-4 block">The Daily Drop</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">Unveiling the <span className="text-saffron-500">Divine Vault.</span></h2>
            </div>
            <Link href="/teachings" className="text-xs md:text-sm font-bold border-b-2 border-deepSpace-950 pb-2 hover:text-saffron-600 hover:border-saffron-600 transition-all uppercase tracking-widest">
              Explore All Frequency
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[400px]">
            {recentPosts.slice(0, 5).map((post, i) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className={`${getSpan(i)} group relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-100 min-h-[300px] md:min-h-0`}>
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={post.featuredImageUrl || defaultImages[i % defaultImages.length]} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepSpace-950/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 left-6 md:top-8 md:left-8">
                    <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold tracking-widest uppercase border border-white/30">
                      {post.scriptureSource}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-saffron-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2">
                      {post.verseReference}
                    </p>
                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03. PHILOSOPHY: MINIMALIST IMPACT */}
      <section className="py-24 md:py-40 bg-deepSpace-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video rounded-[30px] md:rounded-[40px] overflow-hidden bg-deepSpace-900"
            >
              <img 
                src="/cosmic.png" 
                alt="Cosmic Connection" 
                className="w-full h-full object-cover animate-slow-pan"
              />
              <div className="absolute inset-0 bg-saffron-500/10 mix-blend-overlay" />
            </motion.div>

            <div className="space-y-12 md:space-y-16">
              <div>
                <span className="text-saffron-500 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">Our Essence</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">
                  Design for the <br/> <span className="text-saffron-500">Infinite.</span>
                </h2>
              </div>

              <div className="grid gap-8 md:gap-12">
                {[
                  { icon: Shield, title: "Pure Lineage", desc: "Unaltered transmissions from the disciplic succession." },
                  { icon: Zap, title: "High Octane Bhakti", desc: "Spiritual fuel for the high-performance modern life." },
                  { icon: Sparkles, title: "Transcendent UI", desc: "A sanctuary where pixels meet prayer." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex gap-6 md:gap-8 group"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-saffron-400 group-hover:bg-saffron-500 group-hover:text-deepSpace-950 transition-all">
                      <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{item.title}</h4>
                      <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

