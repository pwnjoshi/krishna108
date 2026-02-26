/**
 * Subscribe Page
 */

import { Bell, BookOpen, Lightbulb, Target, Sunrise, Star, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Subscribe | Krishna108',
  description: 'Subscribe to receive daily devotional wisdom from the Bhagavad Gita and Srimad Bhagavatam.',
};

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-amber-100/40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-8 shadow-sm border border-amber-200/50">
              <Bell className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 font-semibold text-sm tracking-wide">Join Our Community</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Subscribe to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">Krishna108</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
              Receive daily spiritual wisdom delivered to your inbox every morning
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-3xl p-10 md:p-14 border-2 border-amber-200/50 shadow-xl">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-5">
                  Start Your Spiritual Journey
                </h2>
                <p className="text-gray-700 text-lg">
                  Join thousands of devotees receiving daily wisdom
                </p>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I agree to receive daily devotional emails from Krishna108
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="group w-full px-6 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
                >
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Subscribe Now
                </button>
                
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  By subscribing, you'll receive one email per day at 6:00 AM Nepal Time. 
                  Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-saffron/5 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What You'll Receive
              </h2>
              <p className="text-gray-600">Benefits of subscribing to Krishna108</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-md border border-amber-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-5 shadow-md">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Scripture Verses</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  One carefully selected verse from the Bhagavad Gita or Srimad Bhagavatam each day
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-md border border-amber-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-5 shadow-md">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Deep Reflections</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Philosophical insights aligned with authentic ISKCON Vaishnava teachings
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-md border border-amber-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-5 shadow-md">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Guidance</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Actionable advice on applying spiritual wisdom in your daily life
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-md border border-amber-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-5 shadow-md">
                  <Sunrise className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Morning Inspiration</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Start each day with uplifting spiritual content delivered at 6:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our Subscribers Say
              </h2>
              <p className="text-gray-600">Join our growing community of devotees</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-2xl p-8 border-2 border-amber-200/50 shadow-md">
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                </div>
                <p className="text-gray-700 mb-5 italic text-lg leading-relaxed">
                  "Krishna108 has transformed my morning routine. The daily wisdom helps me stay centered throughout the day."
                </p>
                <p className="font-semibold text-gray-900">- Devotee from Kathmandu</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-2xl p-8 border-2 border-amber-200/50 shadow-md">
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                </div>
                <p className="text-gray-700 mb-5 italic text-lg leading-relaxed">
                  "The perfect way to start my day with spiritual guidance. Authentic teachings delivered beautifully."
                </p>
                <p className="font-semibold text-gray-900">- Reader from Pokhara</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-2xl p-8 border-2 border-amber-200/50 shadow-md">
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                </div>
                <p className="text-gray-700 mb-5 italic text-lg leading-relaxed">
                  "I love how each post includes practical applications. It's not just theory - it's wisdom I can use."
                </p>
                <p className="font-semibold text-gray-900">- Subscriber from Lalitpur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
