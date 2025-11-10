import { useState } from 'react'
import { useRegisterEvent } from '@/hooks/useRegisterEvent'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface RegistrationModalProps {
  eventId: string
  eventTitle: string
  availableSpots: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onRegistrationSuccess?: () => void
}

export function RegistrationModal({
  eventId,
  eventTitle,
  availableSpots,
  open,
  onOpenChange,
  onRegistrationSuccess,
}: RegistrationModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [groupSize, setGroupSize] = useState(1)
  const [success, setSuccess] = useState(false)
  const [registrationId, setRegistrationId] = useState('')

  const { registerForEvent, loading, error } = useRegisterEvent(eventId)

  const maxGroupSize = Math.min(50, availableSpots)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await registerForEvent({
        attendeeName: name,
        attendeeEmail: email,
        groupSize,
      })
      setSuccess(true)
      setRegistrationId(result.registrationId)
      onRegistrationSuccess?.()
    } catch (err) {
    }
  }

  const handleClose = () => {
    setSuccess(false)
    setName('')
    setEmail('')
    setGroupSize(1)
    setRegistrationId('')
    onOpenChange(false)
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful!</DialogTitle>
            <DialogDescription>
              You've been registered for {eventTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="border border-black p-6 bg-gray-50">
            <div className="text-sm font-bold uppercase tracking-wider mb-2 text-gray-600">
              Registration ID
            </div>
            <div className="font-mono text-sm break-all">{registrationId}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-semibold">Name:</span> {name}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Email:</span> {email}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Group Size:</span> {groupSize}
            </div>
          </div>

          <Button
            onClick={handleClose}
            className="w-full bg-black text-white hover:bg-black/90 border border-black font-bold"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
          <DialogDescription>{eventTitle}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="groupSize" className="block text-sm font-bold mb-2">
              Group Size
            </label>
            <input
              id="groupSize"
              type="number"
              required
              min="1"
              max={maxGroupSize}
              value={groupSize}
              onChange={(e) => setGroupSize(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && (
            <div className="border border-red-600 bg-red-50 p-4">
              <div className="text-sm font-semibold text-red-600">{error}</div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border border-black hover:bg-gray-100 font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white hover:bg-black/90 border border-black font-bold"
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
