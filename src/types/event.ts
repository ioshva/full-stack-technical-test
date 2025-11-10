export interface Event {
  id: string
  title: string
  description: string
  date: string
  category: {
    id: 'technology' | 'business' | 'health' | 'education' | 'entertainment'
    name: string
    color: string
  }
  capacity: {
    max: number
    registered: number
  }
  pricing: {
    individual: number
  }
  location: {
    type: 'physical' | 'virtual'
    address?: string
  }
}
