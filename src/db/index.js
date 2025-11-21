import { openDB } from 'idb'

export const DB_NAME = 'habit-tracker-db'
export const DB_VERSION = 2
export const HABITS_STORE = 'habits'
export const CHECKINS_STORE = 'checkins'
export const SYNC_QUEUE_STORE = 'sync-queue'
export const ANALYTICS_STORE = 'analytics'

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
      const habitsStore = db.createObjectStore(HABITS_STORE, {
        keyPath: 'id',
      })
      habitsStore.createIndex('by-name', 'name', { unique: false })
      habitsStore.createIndex('by-reminder', 'reminderTime', { unique: false })

      const checkinsStore = db.createObjectStore(CHECKINS_STORE, {
        keyPath: 'id',
        autoIncrement: true,
      })
      checkinsStore.createIndex('by-habit', 'habitId', { unique: false })
      checkinsStore.createIndex('by-date', 'date', { unique: false })
      checkinsStore.createIndex('by-habit-date', ['habitId', 'date'], {
        unique: true,
      })
    }

    if (oldVersion < 2) {
      // Create sync queue store for offline changes
      if (!db.objectStoreNames.contains(SYNC_QUEUE_STORE)) {
        const syncStore = db.createObjectStore(SYNC_QUEUE_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        })
        syncStore.createIndex('by-timestamp', 'timestamp', { unique: false })
        syncStore.createIndex('by-status', 'status', { unique: false })
      }

      // Create analytics store for tracking metrics
      if (!db.objectStoreNames.contains(ANALYTICS_STORE)) {
        const analyticsStore = db.createObjectStore(ANALYTICS_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        })
        analyticsStore.createIndex('by-habit', 'habitId', { unique: false })
        analyticsStore.createIndex('by-date', 'date', { unique: false })
      }
    }
  },
})

export function getDB() {
  return dbPromise
}

export async function withStore(storeName, mode, callback) {
  const db = await dbPromise
  const tx = db.transaction(storeName, mode)
  const store = tx.objectStore(storeName)
  const result = await callback(store, tx)
  await tx.done
  return result
}

export async function withStores(storeNames, mode, callback) {
  const db = await dbPromise
  const tx = db.transaction(storeNames, mode)
  const stores = storeNames.map((name) => tx.objectStore(name))
  const result = await callback(...stores, tx)
  await tx.done
  return result
}


