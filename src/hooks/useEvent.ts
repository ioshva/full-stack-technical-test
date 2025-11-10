import { useApi } from './useApi'
import { Event } from '@/types/event'

interface EventResponse {
  event: Event
}

export function useEvent(id: string | undefined) {
  const { data, loading, error } = useApi<EventResponse>(id ? `/events/${id}` : '')

  return {
    event: data?.event ?? null,
    loading,
    error,
  }
}
