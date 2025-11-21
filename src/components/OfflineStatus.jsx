import { useEffect, useState } from 'react'
import { getSyncStatus, onSyncStatusChange } from '../services/offlineSyncService.js'

export default function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [syncStatus, setSyncStatus] = useState(null)

  useEffect(() => {
    async function loadSyncStatus() {
      try {
        const status = await getSyncStatus()
        setSyncStatus(status)
      } catch (error) {
        console.error('Failed to load sync status', error)
      }
    }

    loadSyncStatus()

    function handleOnline() {
      setIsOnline(true)
    }

    function handleOffline() {
      setIsOnline(false)
    }

    const unsubscribeSync = onSyncStatusChange(async (event) => {
      if (event.type === 'synced' || event.type === 'failed') {
        const status = await getSyncStatus()
        setSyncStatus(status)
      }
    })

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      unsubscribeSync()
    }
  }, [])

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
        <span className="inline-block h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400" />
        You&apos;re offline. Changes will sync when you&apos;re back online.
      </div>
    )
  }

  if (syncStatus && syncStatus.pending > 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
        Syncing {syncStatus.pending} change{syncStatus.pending !== 1 ? 's' : ''}...
      </div>
    )
  }

  return null
}
