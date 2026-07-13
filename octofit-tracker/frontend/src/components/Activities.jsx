import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'
const endpoint = `${apiBaseUrl}/activities`

const parseResponseItems = (response) => {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.results)) return response.results
  if (Array.isArray(response?.items)) return response.items
  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status}`)
        }
        const data = await response.json()
        setActivities(parseResponseItems(data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div>
      <h2>Activities</h2>
      <p className="mb-3 small text-muted">
        API: <code>{endpoint}</code>
      </p>

      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && activities.length === 0 && (
        <p>No activities were returned from the API.</p>
      )}

      {!loading && activities.length > 0 && (
        <div className="list-group">
          {activities.map((activity, index) => (
            <div key={activity._id ?? activity.id ?? index} className="list-group-item">
              <strong>{activity.name || activity.title || 'Unnamed activity'}</strong>
              <div className="text-muted">
                {activity.type ?? 'Unknown type'} • {activity.duration ?? 'N/A'} min • {activity.calories ?? 'N/A'} kcal
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Activities
