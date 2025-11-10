import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'registered_events'

export function useEventCache() {
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRegisteredEvents(new Set(JSON.parse(stored)))
      }
    } catch (error) {
      console.error('Failed to load registered events from localStorage:', error)
    }
  }, [])

  const addRegistration = useCallback((eventId: string) => {
    setRegisteredEvents((prev: Set<string>) => {
      const updated = new Set(prev).add(eventId)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(updated)))
      } catch (error) {
        console.error('Failed to save registration to localStorage:', error)
      }
      return updated
    })
  }, [])

  const isRegistered = useCallback(
    (eventId: string) => {
      return registeredEvents.has(eventId)
    },
    [registeredEvents]
  )

  const getRegisteredEventIds = useCallback(() => {
    return new Set(registeredEvents)
  }, [registeredEvents])

  return {
    registeredEvents,
    addRegistration,
    isRegistered,
    getRegisteredEventIds,
  }
}
