import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'
import { Event } from '@/types/event'

interface EventResponse {
  event: Event
}

export function useEvent(id: string | undefined) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvent = useCallback(async () => {
    if (!id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await apiClient.get<EventResponse>(`/events/${id}`)
      setEvent(response.data.event)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch event')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent])

  return {
    event,
    loading: loading && !event,
    error,
    refetch: fetchEvent,
  }
}
