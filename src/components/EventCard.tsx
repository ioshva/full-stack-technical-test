import { Link } from 'react-router-dom'
import { Event } from '@/types/event'
import { Card, CardContent } from '@/components/ui/card'

interface EventCardProps {
  event: Event
  referrer?: string
  referrerLabel?: string
}

export function EventCard({ event, referrer, referrerLabel }: EventCardProps) {
  const eventDate = new Date(event.date)
  const availableSpots = event.capacity.max - event.capacity.registered

  return (
    <Link
      to={`/events/${event.id}`}
      state={{ from: referrer, label: referrerLabel }}
      className="block h-full"
    >
      <Card className="h-full border border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group bg-white">
        <CardContent className="p-6 flex flex-col h-full">
          <div
            className="inline-flex items-center px-4 py-2 text-sm font-bold text-white mb-5 w-fit border border-black"
            style={{ backgroundColor: event.category.color }}
          >
            {event.category.name}
          </div>

          <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <div className="space-y-3 text-sm flex-1 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">
                {eventDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="truncate">
                {event.location.type === 'physical'
                  ? event.location.address
                  : 'Virtual'}
              </span>
            </div>
          </div>

          <div className="pt-5 border-t border-black flex items-center justify-between">
            <div className="text-2xl font-bold">
              ${event.pricing.individual}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              {availableSpots} / {event.capacity.max}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
