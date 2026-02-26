/**
 * Contact Page
 */

import { Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Krishna108',
  description: 'Get in touch with Krishna108. We would love to hear from you.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-amber-100/40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-8 shadow-sm border border-amber-200/50">
              <MessageCircle className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 font-semibold text-sm tracking-wide">Get In Touch</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">Us</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Let&apos;s Connect</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Whether you have questions about our teachings, want to share feedback, 
                  or simply wish to connect with our community, we&apos;re here to help.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Location</h3>
                      <p className="text-gray-700 text-base">Kathmandu, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                      <p className="text-gray-700 text-base">contact@krishna108.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Response Time</h3>
                      <p className="text-gray-700 text-base">Within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-3xl p-10 border-2 border-amber-200/50 shadow-lg">
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
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base"
                      placeholder="What&apos;s this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none text-base"
                      placeholder="Tell us more..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="group w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-saffron/5 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">Quick answers to common questions</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-white rounded-xl p-6 shadow-sm group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>When are new posts published?</span>
                  <span className="text-saffron group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  New devotional posts are automatically published every day at 6:00 AM Nepal Time (UTC+5:45). 
                  Each post features a verse from either the Bhagavad Gita or Srimad Bhagavatam.
                </p>
              </details>
              
              <details className="bg-white rounded-xl p-6 shadow-sm group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How can I subscribe to receive posts?</span>
                  <span className="text-saffron group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Visit our Subscribe page to sign up for daily email notifications. You&apos;ll receive each new post 
                  directly in your inbox, making it easy to start your day with spiritual wisdom.
                </p>
              </details>
              
              <details className="bg-white rounded-xl p-6 shadow-sm group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Are the teachings authentic ISKCON philosophy?</span>
                  <span className="text-saffron group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Yes! All our content is based on authentic ISKCON scriptures - the Bhagavad Gita As It Is and 
                  Srimad Bhagavatam. We maintain strict alignment with Vaishnava philosophy while creating original 
                  reflections that respect copyright.
                </p>
              </details>
              
              <details className="bg-white rounded-xl p-6 shadow-sm group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Can I share the posts on social media?</span>
                  <span className="text-saffron group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Absolutely! We encourage you to share our posts with friends and family. Each post is designed 
                  to be easily shareable, helping spread spiritual wisdom to more people.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
