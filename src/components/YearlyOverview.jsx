import { memo, useState, useEffect } from 'react'
import { format, startOfYear, endOfYear, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'
import { Download } from 'lucide-react'
import { getCheckins } from '../services/streakService.js'

const MonthCalendar = memo(function MonthCalendar({ year, month, checkinMap, accentColor }) {
  const monthDate = new Date(year, month, 1)
  const monthStart = startOfMonth(monthDate)
  const monthEnd = endOfMonth(monthDate)
  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Get starting day of week (0 = Sunday, 1 = Monday, etc.)
  const startDay = getDay(monthStart)
  const emptyCells = Array(startDay).fill(null)
  
  const weekDayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="space-y-1">
      {/* Month name */}
      <div className="text-center mb-2">
        <h4 className="text-sm sm:text-sm font-semibold text-gray-700 dark:text-slate-300">
          {format(monthDate, 'MMM')}
        </h4>
        <p className="text-xs sm:text-xs text-gray-500 dark:text-slate-400">{year}</p>
      </div>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDayLabels.map((day, idx) => (
          <div
            key={idx}
            className="text-center text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-slate-400 h-5 sm:h-6 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {emptyCells.map((_, idx) => (
          <div key={`empty-${idx}`} className="h-5 sm:h-6"></div>
        ))}
        {allDays.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd')
          const completed = checkinMap.has(dateKey)
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
          
          return (
            <div
              key={dateKey}
              title={format(day, 'EEEE, MMM d, yyyy')}
              className={`h-5 sm:h-6 flex items-center justify-center text-[10px] sm:text-xs rounded transition-all cursor-pointer sm:hover:scale-110 sm:hover:shadow-md ${
                isToday ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                backgroundColor: completed ? accentColor : '#f3f4f6',
                color: completed ? '#ffffff' : '#6b7280',
                fontWeight: completed ? '600' : '400',
              }}
            >
              {format(day, 'd')}
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default function YearlyOverview({ habits, year: propYear, setYear: propSetYear }) {
  const currentYear = new Date().getFullYear()
  const [internalYear, setInternalYear] = useState(currentYear)
  const [habitData, setHabitData] = useState({})
  
  const year = propYear !== undefined ? propYear : internalYear
  const setYear = propSetYear || setInternalYear

  useEffect(() => {
    const loadHabitData = async () => {
      const data = {}
      for (const habit of habits) {
        try {
          const checkins = await getCheckins(habit.id)
          data[habit.id] = {
            name: habit.name,
            color: habit.color,
            checkins: checkins.filter(c => {
              const date = new Date(c.date)
              return date.getFullYear() === year
            }),
          }
        } catch (error) {
          console.error(`Failed to load checkins for habit ${habit.id}`, error)
          data[habit.id] = { name: habit.name, color: habit.color, checkins: [] }
        }
      }
      setHabitData(data)
    }
    loadHabitData()
  }, [habits, year])

  const exportToExcel = async () => {
    try {
      // Fetch all checkin data
      const exportData = {}
      for (const habit of habits) {
        try {
          const checkins = await getCheckins(habit.id)
          exportData[habit.id] = {
            name: habit.name,
            color: habit.color,
            checkins: checkins,
          }
        } catch (error) {
          console.error(`Failed to load checkins for habit ${habit.id}`, error)
          exportData[habit.id] = { name: habit.name, color: habit.color, checkins: [] }
        }
      }

      // Create CSV content
      let csvContent = 'Habit Tracker Data Export\n'
      csvContent += `Exported on: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}\n\n`

      // Create data for each habit
      for (const [_, data] of Object.entries(exportData)) {
        csvContent += `Habit: ${data.name}\n`
        csvContent += 'Date,Completed\n'
        
        const yearStart = startOfYear(new Date(currentYear, 0, 1))
        const yearEnd = endOfYear(new Date(currentYear, 0, 1))
        const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd })
        
        const checkinSet = new Set(data.checkins.map(c => c.date))
        
        allDays.forEach((day) => {
          const dateKey = format(day, 'yyyy-MM-dd')
          const completed = checkinSet.has(dateKey) ? 'Yes' : 'No'
          csvContent += `${dateKey},${completed}\n`
        })
        
        csvContent += '\n'
      }

      // Create and download file
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent))
      element.setAttribute('download', `habit-tracker-${currentYear}.csv`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      console.error('Failed to export data', error)
    }
  }

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
            Yearly Overview
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            View your habit completion throughout the year
          </p>
        </div>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Year selector */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setYear(year - 1)}
          className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← Previous
        </button>
        <span className="text-sm font-semibold text-gray-700 dark:text-slate-200 min-w-16 text-center">
          {year}
        </span>
        <button
          onClick={() => setYear(year + 1)}
          className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Habits overview */}
      {habits.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-slate-400">
          No habits to display. Add a habit to get started!
        </p>
      ) : (
        <div className="space-y-8">
          {habits.map((habit) => {
            const data = habitData[habit.id]
            if (!data) return null

            const checkinSet = new Set(data.checkins.map(c => c.date))
            const yearStart = startOfYear(new Date(year, 0, 1))
            const yearEnd = endOfYear(new Date(year, 0, 1))
            const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd })
            const completedCount = allDays.filter(day => checkinSet.has(format(day, 'yyyy-MM-dd'))).length
            const completionRate = Math.round((completedCount / allDays.length) * 100)

            return (
              <div key={habit.id} className="space-y-3 pb-6 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md" style={{ backgroundColor: habit.color }}></div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-slate-100">{habit.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {completedCount} days completed • {completionRate}% completion rate
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 12-month grid */}
                <div className="overflow-x-auto -mx-2 px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }, (_, monthIndex) => (
                    <MonthCalendar
                      key={monthIndex}
                      year={year}
                      month={monthIndex}
                      checkinMap={checkinSet}
                      accentColor={habit.color}
                    />
                  ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 pt-6 border-t border-gray-200 dark:border-slate-700 text-xs text-gray-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#3b82f6', border: '1px solid #3b82f6' }}></div>
          <span>Completed day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-slate-700" style={{ border: '1px solid #d1d5db' }}></div>
          <span>Missed day</span>
        </div>
      </div>
    </div>
  )
}
