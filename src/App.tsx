import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import EventsList from './pages/EventsList'
import EventDetail from './pages/EventDetail'
import MyEvents from './pages/MyEvents'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
