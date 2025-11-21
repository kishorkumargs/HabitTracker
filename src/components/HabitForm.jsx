import { useEffect, useMemo, useState } from 'react'

const DEFAULT_COLOR = '#3b82f6'

export default function HabitForm({
  initialHabit,
  onSubmit,
  onCancel,
  submitLabel = 'Save Habit',
}) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [reminderTime, setReminderTime] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!initialHabit) {
      return
    }
    setName(initialHabit.name ?? '')
    setColor(initialHabit.color ?? DEFAULT_COLOR)
    setReminderTime(initialHabit.reminderTime ?? '')
  }, [initialHabit])

  const isValid = useMemo(() => name.trim().length > 0, [name])

  function handleSubmit(event) {
    event.preventDefault()
    if (!isValid) {
      setErrors({ name: 'Please enter a habit name.' })
      return
    }
    setErrors({})
    onSubmit?.({
      name: name.trim(),
      color,
      reminderTime: reminderTime || null,
    })
    if (!initialHabit) {
      setName('')
      setColor(DEFAULT_COLOR)
      setReminderTime('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded-lg bg-white p-4 shadow-md ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-slate-800"
    >
      <div>
        <label htmlFor="habit-name" className="block text-sm font-medium text-gray-700 dark:text-slate-200">
          Habit name
        </label>
        <input
          id="habit-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Meditate"
          className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label htmlFor="habit-reminder" className="block text-sm font-medium text-gray-700 dark:text-slate-200">
            Daily reminder time
          </label>
          <input
            id="habit-reminder"
            type="time"
            value={reminderTime ?? ''}
            onChange={(event) => setReminderTime(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label htmlFor="habit-color" className="block text-sm font-medium text-gray-700 dark:text-slate-200">
            Accent color
          </label>
          <input
            id="habit-color"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="mt-1 h-10 w-16 cursor-pointer rounded border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}


