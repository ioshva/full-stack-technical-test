import { useState } from 'react'
import { apiClient } from '@/lib/api-client'
import { Event } from '@/types/event'

interface RegisterEventParams {
  attendeeEmail: string
  attendeeName: string
  groupSize: number
}

interface RegisterEventResponse {
  success: boolean
  registrationId: string
  event: Event
  attendee: {
    email: string
    name: string
    groupSize: number
    registeredAt: string
  }
}

interface RegisterEventError {
  error: string
  message: string
}

export function useRegisterEvent(eventId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<RegisterEventResponse | null>(null)

  const registerForEvent = async (params: RegisterEventParams) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.post<RegisterEventResponse>(
        `/events/${eventId}/register`,
        params
      )
      setData(response.data)
      return response.data
    } catch (err: any) {
      const errorData = err.response?.data as RegisterEventError
      const errorMessage = errorData?.message || 'Failed to register for event'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    registerForEvent,
    loading,
    error,
    data,
  }
}
