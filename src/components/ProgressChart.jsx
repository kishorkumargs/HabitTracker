import { memo, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { Check, X } from 'lucide-react'

function ProgressChartComponent({ data, loading }) {
  const calendarData = useMemo(() => {
    if (!Array.isArray(data)) {
      return []
    }
    return data.map((entry) => {
      const parsedDate = parseISO(entry.date)
      return {
        date: parsedDate,
        dayLabel: format(parsedDate, 'd'),
        monthLabel: format(parsedDate, 'MMM'),
        fullLabel: format(parsedDate, 'MMM d'),
        completed: entry.completed,
      }
    })
  }, [data])

  if (loading) {
    return <p className="text-sm text-gray-400 dark:text-slate-500">Loading calendar...</p>
  }

  if (calendarData.length === 0) {
    return <p className="text-sm text-gray-400 dark:text-slate-500">No data yet. Start tracking today!</p>
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-slate-700"></div>
          <span>Missed</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {calendarData.map((day, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col items-center pb-1"
          >
            <div
              className={`w-full max-w-[60px] aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                day.completed
                  ? 'bg-green-500 text-white shadow-md hover:shadow-lg hover:scale-105'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold">{day.dayLabel}</span>
            </div>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">
              {day.monthLabel}
            </span>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block z-10">
              <div className="bg-gray-900 dark:bg-slate-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap flex items-center gap-1">
                {day.completed ? <><Check className="w-3 h-3" /> {day.fullLabel}: Completed</> : <><X className="w-3 h-3" /> {day.fullLabel}: Missed</>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProgressChart = memo(ProgressChartComponent)

export default ProgressChart


