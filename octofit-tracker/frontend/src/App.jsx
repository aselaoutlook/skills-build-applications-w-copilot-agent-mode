import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseNotice, apiBaseSource, apiBaseUrl } from './utils/baseUrl.js'
import './App.css'

const healthEndpoint = `${apiBaseUrl}/health`
const activitiesEndpoint = `${apiBaseUrl}/activities/`

const parseResponseItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.docs)) return payload.data.docs
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Home() {
  const [health, setHealth] = useState(null)
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthResponse, activitiesResponse] = await Promise.all([
          fetch(healthEndpoint),
          fetch(activitiesEndpoint),
        ])

        if (!healthResponse.ok || !activitiesResponse.ok) {
          throw new Error('Failed to load OctoFit data')
        }

        const healthData = await healthResponse.json()
        const activitiesData = await activitiesResponse.json()

        setHealth(healthData)
        setActivities(parseResponseItems(activitiesData))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app-shell">
      <h1>OctoFit Tracker</h1>
      <p>Modern multi-tier fitness tracking application</p>

      {apiBaseNotice && <div className="alert alert-warning">{apiBaseNotice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card-grid">
        <div className="card">
          <h2>System status</h2>
          <p>{loading ? 'Checking backend…' : health?.status ?? 'Unknown'}</p>
          <small>{loading ? 'Connecting to API' : health?.message ?? 'No health message available'}</small>
        </div>
        <div className="card">
          <h2>Recent activities</h2>
          <p>{loading ? 'Loading…' : `${activities.length} logged activities`}</p>
          <small>Using API: <code>{activitiesEndpoint}</code></small>
          <br />
          <small>URL source: <code>{apiBaseSource}</code></small>
        </div>
      </div>

      {!loading && activities.length > 0 && (
        <div className="activity-list">
          <h3>Latest activity entries</h3>
          <ul>
            {activities.slice(0, 5).map((activity) => (
              <li key={activity._id ?? activity.id ?? activity.name ?? activity.type}>
                <strong>{activity.name}</strong> — {activity.type} • {activity.duration} min • {activity.calories} kcal
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav">
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/activities">
              Activities
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/teams">
              Teams
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/users">
              Users
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
