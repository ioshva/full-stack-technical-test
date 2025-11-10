import { useState } from 'react'
import { useEvents } from '@/hooks/useEvents'
import { EventsGrid } from '@/components/EventsGrid'

export default function EventsList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  const { events, loading, error } = useEvents({ search, category, status })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-14">
          <h1 className="text-6xl md:text-7xl font-black text-black mb-4 tracking-tight">
            Events
          </h1>
          <p className="text-xl font-semibold text-gray-700 max-w-2xl">
            Discover and register for exciting events
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 border border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="full">Full</option>
          </select>
        </div>

        <EventsGrid events={events} loading={loading} error={error} />
      </div>
    </div>
  )
}
