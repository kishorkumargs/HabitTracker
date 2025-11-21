import { useMemo } from 'react'

export default function useStreaks(habits = []) {
  return useMemo(() => {
    if (!Array.isArray(habits) || habits.length === 0) {
      return {
        totalHabits: 0,
        activeHabits: 0,
        longestStreak: 0,
        averageCurrentStreak: 0,
        topHabits: [],
      }
    }

    const streakValues = habits
      .map((habit) => ({
        id: habit.id,
        name: habit.name,
        current: habit.streak?.currentStreak ?? 0,
        longest: habit.streak?.longestStreak ?? 0,
      }))
      .sort((a, b) => b.current - a.current)

    const totalCurrent = streakValues.reduce((acc, item) => acc + item.current, 0)
    const activeHabits = streakValues.filter((item) => item.current > 0).length
    const longestStreak = streakValues.reduce((max, item) => Math.max(max, item.longest), 0)

    return {
      totalHabits: habits.length,
      activeHabits,
      longestStreak,
      averageCurrentStreak: Number((totalCurrent / habits.length).toFixed(1)),
      topHabits: streakValues.slice(0, 3),
    }
  }, [habits])
}


