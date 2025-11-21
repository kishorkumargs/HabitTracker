import { withStore, withStores, HABITS_STORE, CHECKINS_STORE } from '../db/index.js'

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `habit-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export async function getAllHabits() {
  return withStore(HABITS_STORE, 'readonly', async (store) => store.getAll())
}

export async function getHabit(id) {
  return withStore(HABITS_STORE, 'readonly', async (store) => store.get(id))
}

export async function createHabit(habit) {
  const now = new Date().toISOString()
  const record = {
    id: generateId(),
    name: habit.name.trim(),
    color: habit.color ?? '#3b82f6',
    reminderTime: habit.reminderTime ?? null,
    createdAt: now,
    updatedAt: now,
  }

  await withStore(HABITS_STORE, 'readwrite', async (store) => {
    await store.add(record)
  })

  return record
}

export async function updateHabit(id, updates) {
  return withStore(HABITS_STORE, 'readwrite', async (store) => {
    const existing = await store.get(id)
    if (!existing) {
      throw new Error(`Habit with id ${id} not found`)
    }
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    await store.put(updated)
    return updated
  })
}

export async function deleteHabit(id) {
  await withStores([HABITS_STORE, CHECKINS_STORE], 'readwrite', async (habitStore, checkinStore) => {
    await habitStore.delete(id)

    const checkinIndex = checkinStore.index('by-habit')
    const range = IDBKeyRange.only(id)
    const requests = []

    for await (const cursor of checkinIndex.iterate(range)) {
      requests.push(cursor.delete())
    }

    await Promise.all(requests)
  })
}

export async function clearAllHabits() {
  await withStores([HABITS_STORE, CHECKINS_STORE], 'readwrite', async (habitStore, checkinStore) => {
    await habitStore.clear()
    await checkinStore.clear()
  })
}


