/**
 * Homepage Component - Static Version for Launch
 * 
 * Beautiful landing page showcasing Krishna108's mission
 * No database dependency - ready to publish immediately
 */

import Link from 'next/link';
import { BookOpen, Sunrise, Heart, CheckCircle, Bell, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/20 to-amber-100/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.08),transparent_50%)]" />
        
        <div className="relative container mx-auto px-6 py-24 md:py-36">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-10 shadow-sm border border-amber-200/50">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 font-semibold text-sm tracking-wide">Daily Spiritual Wisdom</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Welcome to
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                Krishna108
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Daily devotional wisdom from the <span className="font-semibold text-amber-700">Bhagavad Gita</span> and{' '}
              <span className="font-semibold text-amber-700">Srimad Bhagavatam</span>, bringing authentic ISKCON teachings 
              to devotees in Nepal and beyond.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
              <Link 
                href="/about"
                className="group px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
              <a 
                href="#mission"
                className="px-10 py-4 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-300 hover:border-amber-400 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Our Mission
              </a>
            </div>
            
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 rounded-full border-2 border-amber-300/50 shadow-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
              </span>
              <span className="text-gray-800 font-semibold">Daily posts launching soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20 tracking-tight">
              What Makes Krishna108 Special
            </h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200/50 hover:border-amber-400/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Authentic Scriptures</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Every post draws from the Bhagavad Gita As It Is and Srimad Bhagavatam, 
                  ensuring philosophically accurate guidance.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200/50 hover:border-amber-400/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Sunrise className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Inspiration</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Fresh spiritual insights delivered every morning at 6:00 AM Nepal Time, 
                  perfect for starting your day with devotion.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200/50 hover:border-amber-400/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Wisdom</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Each post includes practical applications to help you integrate 
                  Vaishnava philosophy into your daily life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-amber-100/40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Our Mission
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 mx-auto mb-8 rounded-full"></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-amber-100">
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                Krishna108 is dedicated to bringing the timeless wisdom of ISKCON scriptures 
                to the modern world. We believe that ancient Vedic knowledge holds the key 
                to finding peace, purpose, and spiritual fulfillment in today's fast-paced life.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                Our platform automatically generates and publishes one devotional post each day, 
                systematically progressing through the Bhagavad Gita and Srimad Bhagavatam. 
                Each post includes:
              </p>
              
              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">A carefully selected verse from authentic ISKCON scriptures</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">Clear explanation of the verse's meaning</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">Deep philosophical reflection aligned with Vaishnava teachings</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">Practical guidance for applying wisdom in daily life</span>
                </li>
              </ul>
              
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                Whether you're a longtime devotee or just beginning your spiritual journey, 
                Krishna108 offers accessible, authentic guidance to deepen your connection 
                with Krishna consciousness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
              Join Our Spiritual Journey
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Be among the first to receive daily devotional wisdom when we launch. 
              Start each day with inspiration from the Bhagavad Gita and Srimad Bhagavatam.
            </p>
            
            <div className="bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-amber-100/60 rounded-3xl p-12 md:p-16 border-2 border-amber-200/50 shadow-xl">
              <div className="flex flex-col items-center gap-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4 shadow-lg">
                  <Bell className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Coming Very Soon
                </h3>
                <p className="text-gray-700 mb-8 max-w-2xl text-lg leading-relaxed">
                  We're putting the finishing touches on our platform. Daily devotional posts 
                  will begin publishing automatically at 6:00 AM Nepal Time.
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link 
                    href="/about"
                    className="px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-100/60 to-orange-100/60 border-t-2 border-amber-200/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-800 mb-5 font-medium">
            <span className="font-bold text-amber-700">Hare Krishna!</span> May your spiritual journey be filled with devotion and wisdom.
          </p>
          <p className="text-gray-700 text-lg">
            Daily devotional content • ISKCON-aligned teachings • Authentic scripture references
          </p>
        </div>
      </section>
    </main>
  );
}
