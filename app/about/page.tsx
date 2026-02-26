/**
 * About Page
 * 
 * Explains the platform's mission and philosophy
 * - Content about Krishna108's purpose
 * - Consistent design system styling
 * - Mobile responsive layout
 * 
 * Requirements: 11.1, 11.4
 */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Krishna108
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Daily devotional wisdom from authentic ISKCON scriptures
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-saffron/10 to-saffron/5 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Krishna108 is a fully automated devotional publishing platform dedicated to 
                  delivering daily spiritual content to youth and devotees in Nepal and beyond. 
                  We bring the timeless wisdom of the Bhagavad Gita As It Is and Srimad Bhagavatam 
                  to modern seekers through thoughtful, original reflections.
                </p>
                <p>
                  Every day, our platform automatically generates and publishes one devotional post, 
                  drawing from ISKCON scripture references while creating fresh insights that respect 
                  copyright boundaries. This ensures a consistent flow of spiritual guidance without 
                  manual intervention.
                </p>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Philosophy
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="border-l-4 border-saffron pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Scripture Authenticity
                </h3>
                <p>
                  All our content is rooted in authentic ISKCON scriptures—the Bhagavad Gita As It Is 
                  and Srimad Bhagavatam. We maintain philosophical accuracy and alignment with 
                  Vaishnava teachings in every post.
                </p>
              </div>

              <div className="border-l-4 border-saffron pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Original Reflections
                </h3>
                <p>
                  While we reference sacred verses, we create original devotional reflections and 
                  practical applications. This approach respects copyright while providing fresh 
                  perspectives on timeless wisdom.
                </p>
              </div>

              <div className="border-l-4 border-saffron pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Practical Spirituality
                </h3>
                <p>
                  Each post includes practical applications to help you integrate spiritual wisdom 
                  into daily life. We believe that devotional knowledge should be both contemplative 
                  and actionable.
                </p>
              </div>

              <div className="border-l-4 border-saffron pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Sequential Learning
                </h3>
                <p>
                  Our posts follow a sequential progression through the scriptures, allowing readers 
                  to systematically explore the Bhagavad Gita and Srimad Bhagavatam over time. This 
                  structured approach supports deep, sustained spiritual growth.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-saffron text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Daily Automation
                  </h3>
                  <p className="text-gray-700">
                    Every day at 6:00 AM Nepal Time, our system automatically selects the next 
                    sequential verse from the scriptures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-saffron text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Content Generation
                  </h3>
                  <p className="text-gray-700">
                    AI-powered content generation creates original devotional reflections based on 
                    the selected verse, maintaining ISKCON-aligned philosophy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-saffron text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Instant Publishing
                  </h3>
                  <p className="text-gray-700">
                    The post is immediately published to the website, complete with SEO optimization 
                    for maximum reach and impact.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Who We Serve
            </h2>
            <div className="bg-gradient-to-r from-saffron/5 to-white rounded-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Krishna108 is designed for youth and devotees in Nepal seeking daily spiritual 
                guidance. Whether you&apos;re new to Krishna consciousness or a seasoned practitioner, 
                our posts offer accessible wisdom and practical insights.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to build a community of seekers who value authentic spiritual teachings, 
                philosophical depth, and practical application in modern life.
              </p>
            </div>
          </section>

          {/* Long-term Vision Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Long-term Vision
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Our vision extends beyond daily posts. We&apos;re building a comprehensive spiritual 
                resource that will grow organically over years, creating a vast library of devotional 
                content that serves seekers for generations.
              </p>
              <p>
                With 365+ unique verses and systematic progression through the scriptures, Krishna108 
                will become a trusted companion on your spiritual journey, offering fresh insights 
                day after day, year after year.
              </p>
              <p>
                Through SEO optimization and consistent publishing, we aim to reach seekers across 
                Nepal and beyond, making authentic ISKCON wisdom accessible to anyone with an 
                internet connection.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-saffron/20 to-saffron/10 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Spiritual Journey
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Visit daily for fresh devotional wisdom and deepen your connection with 
                Krishna consciousness.
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-saffron text-white font-semibold rounded-lg hover:bg-saffron/90 transition-colors"
              >
                Read Today&apos;s Post
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
