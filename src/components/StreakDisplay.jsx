import { FlameIcon } from 'lucide-react';

function StreakStat({ label, value }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xs uppercase tracking-wide text-gray-600 dark:text-slate-400">
        {label}
      </span>
      <span className="mt-1 text-sm sm:text-base font-bold text-gray-900 dark:text-slate-100">{value}</span>
    </div>
  )
}

export default function StreakDisplay({ streak, accentColor }) {
  const current = streak?.currentStreak ?? 0
  const longest = streak?.longestStreak ?? 0

  return (
    <div className="flex items-center gap-4 rounded-lg px-4 py-2 transition-all duration-300 hover:shadow-md dark:hover:shadow-lg" style={{ backgroundColor: accentColor ? `${accentColor}15` : '#fef3c7', borderLeft: `3px solid ${accentColor || '#f59e0b'}` }}>
      <span aria-hidden="true" className="text-2xl flex-shrink-0">
        <FlameIcon className='w-5 h-5 border-2 border-none' style={{ color: accentColor || '#f59e0b' }} />
      </span>
      <div className="flex gap-6 divide-x" style={{ borderColor: accentColor ? `${accentColor}40` : '#fbbf24' }}>
        <StreakStat label="Current" value={`${current} day${current === 1 ? '' : 's'}`} />
        <div className="pl-6">
          <StreakStat label="Longest" value={`${longest} day${longest === 1 ? '' : 's'}`} />
        </div>
      </div>
    </div>
  )
}


