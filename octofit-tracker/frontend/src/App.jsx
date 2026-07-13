import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

function App() {
  const [health, setHealth] = useState(null)
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthResponse, activitiesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/health`),
          fetch(`${API_BASE_URL}/api/activities`),
        ])

        if (!healthResponse.ok || !activitiesResponse.ok) {
          throw new Error('Failed to load OctoFit data')
        }

        const healthData = await healthResponse.json()
        const activitiesData = await activitiesResponse.json()

        setHealth(healthData)
        setActivities(activitiesData)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app-shell">
      <h1>OctoFit Tracker</h1>
      <p>Modern multi-tier fitness tracking application</p>

      {error ? <p className="error">{error}</p> : null}

      <div className="card-grid">
        <div className="card">
          <h2>System status</h2>
          <p>{health?.status || 'Checking backend...'}</p>
          <small>{health?.message || 'Connecting to API'}</small>
        </div>
        <div className="card">
          <h2>Recent activities</h2>
          <p>{activities.length} logged activities</p>
          <small>Fetched from the backend API</small>
        </div>
      </div>

      {activities.length > 0 ? (
        <div className="activity-list">
          <h3>Latest activity entries</h3>
          <ul>
            {activities.slice(0, 5).map((activity) => (
              <li key={activity._id}>
                <strong>{activity.name}</strong> — {activity.type} • {activity.duration} min • {activity.calories} kcal
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default App
