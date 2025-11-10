import { useApi } from './useApi'
import { EventsResponse } from '@/types/api'

export function useEvents() {
  const { data, loading, error } = useApi<EventsResponse>('/events')

  return {
    events: data?.events ?? null,
    total: data?.total ?? 0,
    lastKey: data?.lastKey,
    loading,
    error,
  }
}
