"use client";

import { motion } from 'framer-motion';
import { Bell, BookOpen, Lightbulb, Target, Sunrise, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SubscribePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeOut" as any }
  };

  return (
    <main className="bg-deepSpace-950 text-white min-h-screen pt-24 pb-20 md:pb-40">
      {/* 01. HEADER: MINIMALIST IMPACT */}
      <section className="container mx-auto px-6 py-12 md:py-24">
        <motion.div {...fadeIn} className="max-w-6xl">
           <span className="text-saffron-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">The Connection</span>
           <h1 className="text-[14vw] md:text-[10vw] lg:text-[7vw] font-serif font-bold leading-[0.85] tracking-tighter mb-8 md:mb-16 italic">
             JOIN THE <br/> <span className="text-saffron-500">CIRCLE.</span>
           </h1>
           <p className="text-xl md:text-3xl text-slate-400 font-light leading-tight max-w-4xl">
             Receive a daily frequency of divine wisdom directly in your inbox. No noise. Just the eternal code.
           </p>
        </motion.div>
      </section>

      {/* 02. SUBSCRIBE FORM: MODERN MINIMALISM */}
      <section className="container mx-auto px-6 py-10 md:py-20">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-start">
          <div className="space-y-12 md:space-y-16">
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-3xl md:text-4xl font-serif font-bold italic uppercase">Why Subscribe?</h3>
              <div className="grid gap-8 md:gap-10">
                {[
                  { icon: Sunrise, title: "Morning Alignment", desc: "Start your day with a focused mind and an open heart." },
                  { icon: BookOpen, title: "Authorized Wisdom", desc: "Pure translations from the disciplic succession." },
                  { icon: Target, title: "Modern Application", desc: "Ancient philosophy made relevant for your digital life." }
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    {...fadeIn}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 md:gap-8 group"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-saffron-500 group-hover:bg-saffron-500 group-hover:text-deepSpace-950 transition-all">
                      <benefit.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{benefit.title}</h4>
                      <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 md:p-20 bg-white/[0.02] border border-white/5 rounded-[40px] md:rounded-[60px] relative overflow-hidden"
          >
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-10 md:space-y-12 relative z-10">
              <input type="hidden" name="access_key" value="9fb245d4-b188-4b8b-b514-23b66e38a815" />
              <input type="hidden" name="subject" value="New Subscriber for Krishna108 Pulse" />
              <input type="hidden" name="from_name" value="Krishna108 Pulse" />
              <input type="hidden" name="redirect" value="https://krishna108.com.np/success" />

              <div className="space-y-3 md:space-y-4">
                 <label className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/40">Full Name</label>
                 <input type="text" name="name" required className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-saffron-500 transition-all text-xl md:text-2xl font-light" placeholder="Arjuna" />
              </div>
              <div className="space-y-3 md:space-y-4">
                 <label className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/40">Email Address</label>
                 <input type="email" name="email" required className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-saffron-500 transition-all text-xl md:text-2xl font-light" placeholder="bhakti@yoga.com" />
              </div>
              
              <div className="pt-6 md:pt-8">
                <button type="submit" className="w-full py-5 md:py-6 bg-saffron-500 text-deepSpace-950 rounded-full font-black tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm">
                  INITIALIZE SUBSCRIPTION <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <p className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/20 mt-6 md:mt-8">
                  Pure Transmission • No Spam • Secure
                </p>
              </div>
            </form>
            
            <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5">
              <Bell className="w-24 h-24 md:w-40 md:h-40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 03. FOOTER IMPACT: THE PROMISE */}
      <section className="container mx-auto px-6 py-24 md:py-40 border-t border-white/5">
         <div className="max-w-4xl">
            <h2 className="text-3xl md:text-6xl font-serif font-bold italic leading-tight mb-6 md:mb-8 uppercase">
              Consistency is the <br/> <span className="text-saffron-500">Key to Mastery.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
              Spiritual growth is not a sprint; it is a marathon of small, daily alignments. By joining the circle, you commit to showing up for yourself and the Divine, every single day.
            </p>
         </div>
      </section>
    </main>
  );
}
