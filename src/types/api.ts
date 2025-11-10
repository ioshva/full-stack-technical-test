import { Event } from './event'

export interface EventsResponse {
  events: Event[]
  total: number
  lastKey?: string
}
