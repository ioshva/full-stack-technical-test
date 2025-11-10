import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEvent } from '@/hooks/useEvent'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RegistrationModal } from '@/components/RegistrationModal'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const { event, loading, error, refetch } = useEvent(id)
  const [showRegistration, setShowRegistration] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading event...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-destructive mb-2">Error loading event</div>
          <div className="text-sm text-muted-foreground mb-4">{error}</div>
          <Link to="/events" className="text-primary hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-muted-foreground mb-4">Event not found</div>
          <Link to="/events" className="text-primary hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const eventDate = new Date(event.date)
  const availableSpots = event.capacity.max - event.capacity.registered
  const isPastEvent = eventDate < new Date()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/events" className="inline-flex items-center text-sm font-semibold hover:underline mb-8 transition-all">
          ← Back to Events
        </Link>

        <Card className="border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-8 md:p-12">
            <div
              className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-white mb-6 border border-black"
              style={{ backgroundColor: event.category.color }}
            >
              {event.category.name}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
              {event.title}
            </h1>

            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-7">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Date</div>
                  <div className="text-lg font-semibold">
                    {eventDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Time</div>
                  <div className="text-lg font-semibold">
                    {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Location</div>
                  <div className="text-lg font-semibold">
                    {event.location.type === 'physical'
                      ? event.location.address
                      : 'Virtual Event'}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="border border-black p-7 bg-white">
                  <div className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-600">Price</div>
                  <div className="text-5xl font-bold mb-1">
                    ${event.pricing.individual}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">per person</div>
                </div>

                <div className="border border-black p-7 bg-white">
                  <div className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-600">Availability</div>
                  <div className="text-3xl font-bold mb-1">
                    {availableSpots} / {event.capacity.max}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">spots remaining</div>
                </div>
              </div>
            </div>

            <div className="border-t border-black pt-8 mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                {event.description}
              </p>
            </div>

            {isPastEvent && (
              <div className="mb-4 border border-black bg-gray-100 p-4 text-center">
                <div className="text-sm font-semibold text-gray-700">
                  This event has passed
                </div>
              </div>
            )}

            {!isPastEvent && availableSpots === 0 && (
              <div className="mb-4 border border-black bg-gray-100 p-4 text-center">
                <div className="text-sm font-semibold text-gray-700">
                  This event has reached maximum capacity
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setShowRegistration(true)}
                disabled={availableSpots === 0 || isPastEvent}
                className="flex-1 sm:flex-none sm:px-12 bg-black text-white hover:bg-black/90 border border-black font-bold disabled:bg-gray-400 disabled:opacity-50"
              >
                Register for Event
              </Button>
            </div>
          </CardContent>
        </Card>

        <RegistrationModal
          eventId={event.id}
          eventTitle={event.title}
          availableSpots={availableSpots}
          open={showRegistration}
          onOpenChange={setShowRegistration}
          onRegistrationSuccess={refetch}
        />
      </div>
    </div>
  )
}
