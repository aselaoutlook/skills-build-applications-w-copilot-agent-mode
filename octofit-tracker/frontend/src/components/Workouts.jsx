import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../utils/baseUrl.js'

const endpoint = `${apiBaseUrl}/workouts/`

const parseResponseItems = (response) => {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.data?.items)) return response.data.items
  if (Array.isArray(response?.data?.results)) return response.data.results
  if (Array.isArray(response?.data?.docs)) return response.data.docs
  if (Array.isArray(response?.results)) return response.results
  if (Array.isArray(response?.items)) return response.items
  if (Array.isArray(response?.docs)) return response.docs
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts: ${response.status}`)
        }
        const data = await response.json()
        setWorkouts(parseResponseItems(data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <div>
      <h2>Workouts</h2>
      <p className="mb-3 small text-muted">
        API: <code>{endpoint}</code>
      </p>

      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && workouts.length === 0 && <p>No workouts were returned from the API.</p>}

      {!loading && workouts.length > 0 && (
        <div className="list-group">
          {workouts.map((workout, index) => (
            <div key={workout._id ?? workout.id ?? index} className="list-group-item">
              <strong>{workout.name ?? workout.title ?? 'Unnamed workout'}</strong>
              <div className="text-muted">
                {workout.type ?? 'Unknown type'} • {workout.duration ?? 'N/A'} min
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts
