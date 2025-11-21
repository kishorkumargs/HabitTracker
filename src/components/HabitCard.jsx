import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { Check, PencilIcon, Trash2, BarChart3 } from 'lucide-react'
import StreakDisplay from './StreakDisplay.jsx'
import ProgressChart from './ProgressChart.jsx'
import ReminderSettings from './ReminderSettings.jsx'

const TODAY_KEY = format(new Date(), 'yyyy-MM-dd')

export default function HabitCard({
  habit,
  onCheckIn,
  onEdit,
  onDelete,
  loadSummary,
  onReminderChange,
  onMockReminder,
  onViewAnalytics,
}) {
  const [summary, setSummary] = useState([])
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)

  const completedToday = useMemo(
    () => habit?.streak?.lastCheckinDate === TODAY_KEY,
    [habit?.streak?.lastCheckinDate],
  )

  useEffect(() => {
    let isMounted = true
    async function fetchSummary() {
      if (!habit?.id || !loadSummary) {
        return
      }

      setIsLoadingSummary(true)
      try {
        const data = await loadSummary(habit.id)
        if (isMounted) {
          setSummary(data)
        }
      } catch (error) {
        console.error('Failed to load habit summary', error)
        if (isMounted) {
          setSummary([])
        }
      } finally {
        if (isMounted) {
          setIsLoadingSummary(false)
        }
      }
    }

    fetchSummary()
    return () => {
      isMounted = false
    }
  }, [habit?.id, loadSummary])

  return (
    <article className="flex flex-col gap-4 sm:gap-6 rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700 dark:hover:shadow-lg dark:shadow-blue-950/20">
      {/* Header with title and actions */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0 pl-4 border-l-4" style={{ borderColor: habit.color }}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-100 truncate">{habit.name}</h3>
          {habit.reminderTime ? (
            <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              Reminder at {habit.reminderTime}
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-400 dark:text-slate-500">No reminder configured</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => onViewAnalytics?.(habit)}
            className="rounded-md border border-transparent px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 transition-all whitespace-nowrap"
            title="View detailed analytics"
          >
            <BarChart3 className='w-5 h-5 transition-transform duration-300 hover:scale-110'/>
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(habit)}
            className="rounded-md border border-transparent px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-300 transition-all whitespace-nowrap"
          >
            <PencilIcon className='w-5 h-5 transition-transform duration-300 hover:scale-110 hover:-rotate-12'/>
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(habit.id)}
            className="rounded-md border border-transparent px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-red-500 transition-all whitespace-nowrap"
          >
            <Trash2 className='w-5 h-5 transition-transform duration-300 hover:scale-110 hover:rotate-12'/>
          </button>
        </div>
      </div>

      {/* Check-in button and streaks - stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          type="button"
          onClick={() => onCheckIn?.(habit.id)}
          className={`rounded-full px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:shadow-lg hover:scale-105 dark:focus-visible:ring-offset-slate-900 w-full sm:w-auto flex items-center justify-center gap-1 ${completedToday ? 'bg-green-500 focus-visible:ring-green-500' : ''}`}
          style={{ backgroundColor: completedToday ? undefined : habit.color }}
        >
          {completedToday ? <><Check className="w-4 h-4" /> Completed today</> : 'Mark today'}
        </button>
        <div className="w-full sm:w-auto flex-shrink-0">
          <StreakDisplay streak={habit.streak} accentColor={habit.color} />
        </div>
      </div>

      {/* Progress and Reminders section - full width on mobile */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-slate-200 mb-3">14-Day History</h4>
          <div className="mt-4">
            <ProgressChart data={summary} loading={isLoadingSummary} />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
          <ReminderSettings
            habit={habit}
            onReminderChange={onReminderChange}
            onMockReminder={onMockReminder}
          />
        </div>
      </div>
    </article>
  )
}
