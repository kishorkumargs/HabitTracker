import { useState } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import { format, startOfYear, endOfYear, eachDayOfInterval } from 'date-fns'
import { getCheckins } from '../services/streakService.js'
import StreakDisplay from './StreakDisplay.jsx'
import YearlyOverview from './YearlyOverview.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function HabitAnalyticsPage({ habit, onBack }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const exportToCSV = async () => {
    try {
      const checkins = await getCheckins(habit.id)
      
      let csvContent = 'Habit Tracker Data Export\n'
      csvContent += `Habit: ${habit.name}\n`
      csvContent += `Exported on: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}\n\n`
      csvContent += 'Date,Completed\n'
      
      const yearStart = startOfYear(new Date(currentYear, 0, 1))
      const yearEnd = endOfYear(new Date(currentYear, 0, 1))
      const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd })
      
      const checkinSet = new Set(checkins.map(c => c.date))
      
      allDays.forEach((day) => {
        const dateKey = format(day, 'yyyy-MM-dd')
        const completed = checkinSet.has(dateKey) ? 'Yes' : 'No'
        csvContent += `${dateKey},${completed}\n`
      })

      // Download file
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent))
      element.setAttribute('download', `${habit.name}-${currentYear}.csv`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      console.error('Failed to export data', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Habit Overview Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0"
                style={{ backgroundColor: habit.color }}
              ></div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">{habit.name}</h1>
                {habit.reminderTime && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mt-1">
                    Daily reminder at {habit.reminderTime}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={exportToCSV}
              className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export {currentYear}</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>

          {/* Streak Display */}
          <div className="flex justify-center overflow-x-auto">
            <StreakDisplay streak={habit.streak} accentColor={habit.color} />
          </div>
        </div>

        {/* Yearly Overview */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 p-4 sm:p-6">
          <YearlyOverview 
            habits={[habit]} 
            year={currentYear}
            setYear={setCurrentYear}
          />
        </div>
      </div>
    </div>
  )
}
