import { useApi } from './useApi'
import { EventsResponse } from '@/types/api'

interface UseEventsParams {
  category?: string
  search?: string
  status?: string
}

export function useEvents(params?: UseEventsParams) {
  const queryParams = new URLSearchParams()

  if (params?.category) queryParams.append('category', params.category)
  if (params?.search) queryParams.append('search', params.search)
  if (params?.status) queryParams.append('status', params.status)

  const endpoint = `/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

  const { data, loading, error } = useApi<EventsResponse>(endpoint)

  return {
    events: data?.events ?? null,
    total: data?.total ?? 0,
    lastKey: data?.lastKey,
    loading,
    error,
  }
}
