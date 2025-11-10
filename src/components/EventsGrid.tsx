import { Event } from '@/types/event'
import { EventCard } from './EventCard'

interface EventsGridProps {
  events: Event[] | null
  loading: boolean
  error: string | null
  referrer?: string
  referrerLabel?: string
}

export function EventsGrid({ events, loading, error, referrer, referrerLabel }: EventsGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg font-semibold">Loading events...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-lg text-destructive mb-2 font-semibold">Error loading events</div>
          <div className="text-sm text-muted-foreground">{error}</div>
        </div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-lg text-muted-foreground font-semibold">No events found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} referrer={referrer} referrerLabel={referrerLabel} />
      ))}
    </div>
  )
}
