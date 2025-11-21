import { useCallback, useEffect, useState } from 'react'
import { createHabit, deleteHabit, updateHabit } from '../services/habitService.js'
import {
  getAllHabitsWithStats,
  getCompletionSummary,
  toggleTodayCheckin,
} from '../services/streakService.js'

export default function useHabits() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllHabitsWithStats()
      setHabits(data)
    } catch (err) {
      console.error('Failed to load habits', err)
      setError(err)
      setHabits([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addHabit = useCallback(
    async (habit) => {
      await createHabit(habit)
      await refresh()
    },
    [refresh],
  )

  const editHabit = useCallback(
    async (id, updates) => {
      await updateHabit(id, updates)
      await refresh()
    },
    [refresh],
  )

  const removeHabit = useCallback(
    async (id) => {
      await deleteHabit(id)
      await refresh()
    },
    [refresh],
  )

  const checkInToday = useCallback(
    async (habitId) => {
      await toggleTodayCheckin(habitId)
      await refresh()
    },
    [refresh],
  )

  const getSummary = useCallback(async (habitId, days = 14) => {
    return getCompletionSummary(habitId, days)
  }, [])

  return {
    habits,
    loading,
    error,
    refresh,
    addHabit,
    editHabit,
    removeHabit,
    checkInToday,
    getSummary,
  }
}


