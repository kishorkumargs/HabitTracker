import ThemeToggle from './ThemeToggle.jsx'
import {
  Flame,
  BarChart3,
  Bell,
  Smartphone,
  TrendingUp,
  Settings,
  ArrowRight,
  CheckCircle2,
  Zap,
  Infinity as InfinityIcon,
  Heart,
} from 'lucide-react'

export default function Homepage({ onGetStarted }) {
  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById('benefits-section')
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const benefits = [
    {
      icon: Flame,
      title: 'Track Streaks',
      description: 'Maintain consistent habits with visual streak tracking. See your current and longest streaks grow day by day.',
    },
    {
      icon: BarChart3,
      title: 'Calendar Analytics',
      description: '4-month calendar view shows completed days at a glance. Visualize your habit patterns and consistency over time.',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Set daily reminder times with browser notifications. Send mock notifications to test and get real-time alerts.',
    },
    {
      icon: Smartphone,
      title: 'Offline First',
      description: 'Track habits anywhere, anytime. Works completely offline with IndexedDB storage and auto-syncs when online.',
    },
    {
      icon: TrendingUp,
      title: 'Visual Progress',
      description: '14-day completion charts in each habit card show your recent history. Track your completion rate instantly.',
    },
    {
      icon: Settings,
      title: 'Customizable Design',
      description: 'Choose accent colors for each habit. Dark mode support. Installable as a PWA on any device.',
    },
  ]

  const stats = [
    { number: <InfinityIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />, label: 'Unlimited Habits' },
    { number: '365+', label: 'Days to Track' },
    { number: '100%', label: 'Privacy Protected' },
    { number: '0', label: 'Ads or Trackers' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Habit Tracker</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <button
              onClick={onGetStarted}
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24 text-center">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Build Better Habits,
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your Life
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto px-4">
            Track daily habits with streak tracking, calendar views, smart reminders, and detailed analytics. Customize each habit with accent colors, view your 14-day progress instantly, and get insights from 4-month calendars. All offline-first, completely private, and installable on any device.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-8 px-4">
            <button
              onClick={onGetStarted}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all text-sm sm:text-base md:text-lg"
            >
              Start Tracking Now
            </button>
            <button
              onClick={scrollToBenefits}
              className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-sm sm:text-base md:text-lg"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Image/Preview */}
        <div className="mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800">
          <style>{`
            .icon-hover:hover svg {
              filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
              transition: filter 0.3s ease;
            }
          `}</style>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="icon-hover p-3 sm:p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 sm:mb-2 text-blue-600" />
              <p className="text-xs sm:text-sm font-semibold">Analytics</p>
            </div>
            <div className="icon-hover p-3 sm:p-4 md:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 sm:mb-2 text-green-600" />
              <p className="text-xs sm:text-sm font-semibold">Streaks</p>
            </div>
            <div className="icon-hover p-3 sm:p-4 md:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Bell className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 sm:mb-2 text-purple-600" />
              <p className="text-xs sm:text-sm font-semibold">Reminders</p>
            </div>
            <div className="icon-hover p-3 sm:p-4 md:p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 sm:mb-2 text-orange-600" />
              <p className="text-xs sm:text-sm font-semibold">Offline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-900 border-y border-gray-200 dark:border-slate-800 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center">
                  {typeof stat.number === 'string' ? (
                    stat.number
                  ) : (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                      {stat.number}
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400 font-semibold mt-1 sm:mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits-section" className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Why Use Habit Tracker?</h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-400">
            Everything you need to build and maintain consistent habits
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={idx}
                className="group p-4 sm:p-6 md:p-8 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="mb-3 sm:mb-4 group-hover:scale-110 transition-transform inline-block p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{benefit.title}</h4>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400 leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 py-12 sm:py-16 md:py-24 border-y border-gray-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">How It Works</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: CheckCircle2, title: 'Create Habits', desc: 'Add your daily habits in seconds' },
              { icon: Zap, title: 'Check In Daily', desc: 'Mark completion each day' },
              { icon: Flame, title: 'Build Streaks', desc: 'Watch your consistency grow' },
              { icon: BarChart3, title: 'Analyze', desc: 'Review trends and celebrate progress' },
            ].map((item, idx) => {
              const ItemIcon = item.icon
              return (
                <div key={idx} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white mb-3 sm:mb-4">
                      <ItemIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                    <h4 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-6 sm:top-8 -right-3 sm:-right-4 text-2xl text-gray-300 dark:text-slate-700">
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 md:p-16 text-white">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">Ready to Transform Your Habits?</h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 text-blue-100">
            Start tracking today. No signup required, completely private, works offline.
          </p>
          <button
            onClick={onGetStarted}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base md:text-lg"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-slate-400">
          <p className="mb-2 text-sm sm:text-base flex items-center justify-center gap-1">Built with <Heart className="w-4 h-4 fill-red-500 text-red-500" /> for habit enthusiasts</p>
          <p className="text-xs sm:text-sm">100% Private • Offline First • No Tracking • Open Source</p>
        </div>
      </footer>
    </div>
  )
}