import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'
const endpoint = `${apiBaseUrl}/teams`

const parseResponseItems = (response) => {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.results)) return response.results
  if (Array.isArray(response?.items)) return response.items
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams
