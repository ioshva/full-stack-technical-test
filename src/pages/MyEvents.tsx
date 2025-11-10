import { Link } from 'react-router-dom'
import { useEventCache } from '@/hooks/useEventCache'
import { useEvents } from '@/hooks/useEvents'
import { EventsGrid } from '@/components/EventsGrid'

export default function MyEvents() {
  const { getRegisteredEventIds } = useEventCache()
  const registeredIds = getRegisteredEventIds()

  const { events, loading, error } = useEvents({})

  const myEvents = events?.filter(event => registeredIds.has(event.id)) ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-14">
          <Link to="/events" className="inline-flex items-center text-sm font-semibold hover:underline mb-6 transition-all">
            ← Back to All Events
          </Link>
          <h1 className="text-6xl md:text-7xl font-black text-black mb-4 tracking-tight">
            My Events
          </h1>
          <p className="text-xl font-semibold text-gray-700 max-w-2xl">
            Events you've registered for
          </p>
        </div>

        {!loading && myEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="border border-black bg-white p-12 inline-block">
              <h2 className="text-2xl font-bold mb-4">No Registered Events</h2>
              <p className="text-gray-600 mb-6">You haven't registered for any events yet.</p>
              <Link to="/events">
                <button className="px-8 py-3 bg-black text-white font-bold border border-black hover:bg-black/90">
                  Browse Events
                </button>
              </Link>
            </div>
          </div>
        )}

        {myEvents.length > 0 && (
          <EventsGrid events={myEvents} loading={loading} error={error} referrer="/my-events" referrerLabel="My Events" />
        )}
      </div>
    </div>
  )
}
