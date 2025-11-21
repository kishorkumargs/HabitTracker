import { useEffect, useState } from 'react'
import { ThemeContext } from './themeContext.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('habit-tracker-theme')
    return saved || 'light'
  })

  useEffect(() => {
    localStorage.setItem('habit-tracker-theme', theme)

    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [theme])

  // Listen for system theme changes - removed, only light/dark now
  useEffect(() => {
    // No need to listen for system changes anymore
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
