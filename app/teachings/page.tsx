/**
 * Teachings Page - Scripture Information
 */

import Link from 'next/link';
import { BookOpen, Heart, Sparkles, Users, Lightbulb, Target, BookMarked, Scroll } from 'lucide-react';

export const metadata = {
  title: 'Teachings | Krishna108',
  description: 'Learn about the Bhagavad Gita and Srimad Bhagavatam - the sacred scriptures that guide our daily devotional posts.',
};

export default function TeachingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-amber-100/40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-8 shadow-sm border border-amber-200/50">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 font-semibold text-sm tracking-wide">Sacred Scriptures</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">Teachings</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
              Discover the timeless wisdom of the Bhagavad Gita and Srimad Bhagavatam, 
              the foundational texts of ISKCON philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* Bhagavad Gita Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-6xl mb-6">🕉️</div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Bhagavad Gita As It Is
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. 
                  It is a sacred dialogue between Lord Krishna and the warrior Arjuna on the battlefield of Kurukshetra.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "Bhagavad Gita As It Is" by A.C. Bhaktivedanta Swami Prabhupada presents the Gita's 
                  original Sanskrit verses with English translations and detailed purports, making this 
                  ancient wisdom accessible to modern readers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-saffron text-xl">✓</span>
                    <span className="text-gray-700">18 Chapters covering all aspects of spiritual life</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-saffron text-xl">✓</span>
                    <span className="text-gray-700">700 verses of divine wisdom</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-saffron text-xl">✓</span>
                    <span className="text-gray-700">Practical guidance for daily living</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-3xl p-10 border-2 border-amber-200/50 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Key Themes</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Dharma (Duty)</h4>
                      <p className="text-gray-700">Understanding one's righteous path</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Yoga (Union)</h4>
                      <p className="text-gray-700">Paths to connect with the Divine</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Karma (Action)</h4>
                      <p className="text-gray-700">The science of action and reaction</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Bhakti (Devotion)</h4>
                      <p className="text-gray-700">The path of loving devotion</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Srimad Bhagavatam Section */}
      <section className="py-20 bg-gradient-to-br from-saffron/5 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-3xl p-10 border-2 border-amber-200/50 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Structure</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <BookMarked className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">12 Cantos</h4>
                      <p className="text-gray-700">Comprehensive spiritual encyclopedia</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Scroll className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">18,000 Verses</h4>
                      <p className="text-gray-700">Detailed narratives and teachings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Krishna's Pastimes</h4>
                      <p className="text-gray-700">Divine activities and teachings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Historical Accounts</h4>
                      <p className="text-gray-700">Stories of great devotees</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="text-6xl mb-6">📿</div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Srimad Bhagavatam
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The Srimad Bhagavatam, also known as the Bhagavata Purana, is one of the most important 
                  texts in Vaishnavism. It is a comprehensive work covering cosmology, philosophy, culture, 
                  and the pastimes of Lord Krishna.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Composed by Vyasadeva, this scripture is considered the ripened fruit of the Vedic tree 
                  of knowledge. It presents the science of Krishna consciousness through captivating 
                  narratives and profound philosophical discussions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-saffron text-xl">✓</span>
                    <span className="text-gray-700">The essence of all Vedic literature</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-saffron text-xl">✓</span>
                    <span className="text-gray-700">Detailed accounts of Krishna's life</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-saffron text-xl">✓</span>
                    <span className="text-gray-700">Philosophical and practical wisdom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use These Teachings */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                How We Share These Teachings
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-saffron to-orange-600 mx-auto mb-8"></div>
            </div>
            
            <div className="bg-gradient-to-br from-saffron/10 to-orange-50 rounded-2xl p-8 md:p-12 border border-saffron/20">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Krishna108, we systematically progress through both the Bhagavad Gita and Srimad Bhagavatam, 
                selecting one verse each day. Our AI-powered system generates original devotional content that:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    Explains the Verse
                  </h3>
                  <p className="text-gray-700">
                    Clear, accessible explanations of the verse's meaning in modern language
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">💭</span>
                    Provides Reflection
                  </h3>
                  <p className="text-gray-700">
                    Deep philosophical insights aligned with ISKCON Vaishnava teachings
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Offers Application
                  </h3>
                  <p className="text-gray-700">
                    Practical guidance on applying the wisdom in your daily life
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Inspires Action
                  </h3>
                  <p className="text-gray-700">
                    Uplifting conclusions that motivate spiritual growth
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Each post is carefully crafted to respect copyright while providing original, 
                authentic spiritual guidance that honors the tradition of these sacred texts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-saffron/20 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Start Your Spiritual Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Receive daily wisdom from these sacred scriptures delivered to your inbox
            </p>
            <Link
              href="/subscribe"
              className="inline-block px-8 py-4 bg-gradient-to-r from-saffron to-orange-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
