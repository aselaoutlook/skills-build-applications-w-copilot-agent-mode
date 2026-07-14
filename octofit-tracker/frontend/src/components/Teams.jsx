import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../utils/baseUrl.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${apiBaseUrl}/teams/`

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

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`)
        }
        const data = await response.json()
        setTeams(parseResponseItems(data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return (
    <div>
      <h2>Teams</h2>
      <p className="mb-3 small text-muted">
        API: <code>{endpoint}</code>
      </p>

      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && teams.length === 0 && <p>No teams were returned from the API.</p>}

      {!loading && teams.length > 0 && (
        <div className="list-group">
          {teams.map((team, index) => (
            <div key={team._id ?? team.id ?? index} className="list-group-item">
              <strong>{team.name ?? 'Unnamed team'}</strong>
              <div className="text-muted">
                Members: {Array.isArray(team.members) ? team.members.length : team.size ?? 'N/A'}
              </div>
              {(team.city || team.sport) && (
                <small className="text-muted">{team.city ?? 'Unknown city'} • {team.sport ?? 'Unknown sport'}</small>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams
