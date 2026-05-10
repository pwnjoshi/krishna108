"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Post } from '@/lib/types';
import { BookOpen, Share2, ArrowLeft, Bookmark, Check } from 'lucide-react';
import Link from 'next/link';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(post.id));
    }
  }, [post.id]);

  const handleBookmark = () => {
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      let newBookmarks;
      if (isBookmarked) {
        newBookmarks = bookmarks.filter((id: string) => id !== post.id);
      } else {
        newBookmarks = [...bookmarks, post.id];
      }
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setIsBookmarked(!isBookmarked);
    }
  };
  const handleShare = async () => {
    const shareData = {
      title: `Krishna108: ${post.title}`,
      text: post.verseExcerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <article className="bg-deepSpace-950 min-h-screen text-slate-200 pb-20">
      {/* 01. FULLSCREEN HERO */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-deepSpace-900"
        >
          <div 
            className="w-full h-full bg-cover bg-center opacity-60 grayscale-[20%] contrast-110"
            style={{ backgroundImage: `url('${post.featuredImageUrl || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deepSpace-950 via-deepSpace-950/20 to-transparent" />
        </motion.div>

        <div className="absolute bottom-12 md:bottom-20 left-0 w-full z-20">
          <div className="container mx-auto px-6">
            <motion.div {...fadeIn} className="max-w-4xl">
              <Link href="/" className="inline-flex items-center gap-2 text-saffron-400 font-bold tracking-widest text-[10px] md:text-xs uppercase mb-6 md:mb-8 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Return to Vault
              </Link>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="px-3 py-1 md:px-4 md:py-1 rounded-full bg-saffron-500 text-deepSpace-950 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">
                  {post.scriptureSource}
                </span>
                <span className="text-white/40 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                  Verse {post.verseReference}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white leading-[0.9] tracking-tighter mb-4 md:mb-8 italic uppercase">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 02. THE REVELATION */}
      <section className="py-20 md:py-32 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-20">
          {/* Sidebar Meta */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-8 md:space-y-12 border-l border-white/5 pl-6 md:pl-8"
          >
            <div className="space-y-2 md:space-y-4">
               <h4 className="text-[10px] md:text-xs font-bold text-saffron-500 uppercase tracking-[0.3em]">Temporal Marker</h4>
               <p className="text-white font-serif italic text-lg md:text-xl">
                 {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
               </p>
            </div>
            <div className="space-y-2 md:space-y-4">
               <h4 className="text-[10px] md:text-xs font-bold text-saffron-500 uppercase tracking-[0.3em]">Frequency</h4>
               <p className="text-white font-serif italic text-lg md:text-xl">Sathya-Yuga Consciousness</p>
            </div>
            <div className="flex gap-4 pt-4 md:pt-8">
               <button 
                 onClick={handleBookmark}
                 className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all ${
                   isBookmarked 
                     ? 'bg-saffron-500 border-saffron-500 text-deepSpace-950' 
                     : 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-deepSpace-950'
                 }`}
               >
                 <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
               </button>
               <button 
                 onClick={handleShare}
                 className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all ${
                   isShared 
                     ? 'bg-green-500 border-green-500 text-white' 
                     : 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-deepSpace-950'
                 }`}
               >
                 {isShared ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
               </button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-5 space-y-16 md:space-y-24">
            {/* The Sacred Verse */}
            <motion.div {...fadeIn} className="relative p-8 md:p-20 bg-white/[0.02] rounded-[30px] md:rounded-[40px] border border-white/5 overflow-hidden">
               <div className="absolute top-0 right-0 p-6 md:p-8">
                 <BookOpen className="w-12 h-12 md:w-20 md:h-20 text-white/[0.03]" />
               </div>
               <p className="text-2xl md:text-5xl font-serif italic leading-relaxed text-white text-center mb-0">
                 &ldquo;{post.verseExcerpt}&rdquo;
               </p>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-20 md:space-y-32">
              <section className="space-y-6 md:space-y-8">
                <h3 className="text-[10px] md:text-xs font-bold text-saffron-500 uppercase tracking-[0.5em]">The Transmission</h3>
                <div className="text-lg md:text-2xl text-slate-300 font-light leading-relaxed prose prose-invert prose-p:mb-8 prose-p:italic max-w-none">
                  {post.explanation}
                </div>
              </section>

              <div className="h-[1px] w-full bg-gradient-to-r from-saffron-500/50 via-white/5 to-transparent" />

              <section className="space-y-6 md:space-y-8">
                <h3 className="text-[10px] md:text-xs font-bold text-saffron-500 uppercase tracking-[0.5em]">Reflection Gradient</h3>
                <div className="text-lg md:text-xl text-slate-400 font-light leading-relaxed italic">
                  {post.reflection}
                </div>
              </section>

              <section className="bg-saffron-500 p-8 md:p-16 rounded-[30px] md:rounded-[40px] text-deepSpace-950">
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-6 md:mb-8 opacity-60">Practical Application</h3>
                <div className="text-xl md:text-3xl font-serif font-bold italic leading-tight uppercase">
                  {post.practicalApplication}
                </div>
              </section>
            </div>

            {/* Closing */}
            <footer className="pt-16 md:pt-20 text-center">
              <p className="text-3xl md:text-6xl font-serif italic text-white/20 hover:text-saffron-500 transition-colors duration-1000 uppercase">
                {post.closingLine || "Jai Sri Krishna."}
              </p>
            </footer>
          </div>
        </div>
      </section>
    </article>
  );
}
