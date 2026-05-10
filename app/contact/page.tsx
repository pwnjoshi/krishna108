"use client";

import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, MessageCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="bg-deepSpace-950 text-white min-h-screen pt-24 pb-20 md:pb-40">
      {/* 01. HEADER: MINIMALIST IMPACT */}
      <section className="container mx-auto px-6 py-12 md:py-24">
        <motion.div {...fadeIn} className="max-w-4xl">
           <span className="text-saffron-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Inquiry</span>
           <h1 className="text-[14vw] md:text-[8vw] font-serif font-bold leading-[0.8] tracking-tighter italic mb-8 md:mb-12">
             GET IN <br/> <span className="text-saffron-500">TOUCH.</span>
           </h1>
           <p className="text-xl md:text-3xl text-slate-400 font-light leading-tight">
             Have a question about the teachings or the mission? We are here to listen and respond.
           </p>
        </motion.div>
      </section>

      {/* 02. CONTACT GRID: FORM + INFO */}
      <section className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-32">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-10 md:space-y-12">
              <input type="hidden" name="access_key" value="9fb245d4-b188-4b8b-b514-23b66e38a815" />
              <input type="hidden" name="subject" value="New Inquiry from Krishna108" />
              <input type="hidden" name="from_name" value="Krishna108 Pulse" />
              <input type="hidden" name="redirect" value="https://krishna108.com.np/success" />
              
              <div className="space-y-3 md:space-y-4">
                 <label className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/40">Your Name</label>
                 <input type="text" name="name" required className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-saffron-500 transition-all text-xl md:text-2xl font-light" placeholder="Arjuna" />
              </div>
              <div className="space-y-3 md:space-y-4">
                 <label className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/40">Email Address</label>
                 <input type="email" name="email" required className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-saffron-500 transition-all text-xl md:text-2xl font-light" placeholder="bhakti@yoga.com" />
              </div>
              <div className="space-y-3 md:space-y-4">
                 <label className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/40">Message</label>
                 <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-saffron-500 transition-all text-xl md:text-2xl font-light resize-none" placeholder="I have a question about..." />
              </div>
              <button type="submit" className="group flex items-center gap-4 md:gap-6 text-xl md:text-2xl font-serif font-bold italic text-saffron-500 hover:text-white transition-all">
                SEND TRANSMISSION <Send className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <div className="space-y-16 md:space-y-24">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
               {[
                 { icon: MapPin, title: "Nexus", value: "Kathmandu, Nepal" },
                 { icon: Mail, title: "Pulse", value: "wisdom@krishna108.com.np" },
                 { icon: Clock, title: "Latency", value: "< 24 Earth Hours" },
                 { icon: MessageCircle, title: "Channel", value: "Status: Offline" }
               ].map((item, idx) => (
                 <motion.div 
                   key={idx}
                   {...fadeIn}
                   transition={{ delay: idx * 0.1 }}
                   className="space-y-3 md:space-y-4"
                 >
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-saffron-500 mb-4 md:mb-6">
                     <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <h4 className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest">{item.title}</h4>
                   <p className="text-lg md:text-xl font-serif italic text-white">{item.value}</p>
                 </motion.div>
               ))}
             </div>

             <div className="p-8 md:p-12 bg-saffron-500 text-deepSpace-950 rounded-[30px] md:rounded-[40px] relative overflow-hidden">
                <h3 className="text-2xl md:text-3xl font-serif font-bold italic mb-4 md:mb-6 uppercase">Looking to <br className="hidden md:block" /> Contribute?</h3>
                <p className="text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-10 opacity-80">
                  We are always seeking developers, designers, and editors who want to use their skills for the Supreme.
                </p>
                <button className="flex items-center gap-3 text-xs md:text-sm font-black tracking-widest uppercase border-b-2 border-deepSpace-950 pb-1">
                   Join the Collective <Sparkles className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
