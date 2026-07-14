import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../utils/baseUrl.js'

const endpoint = `${apiBaseUrl}/leaderboard/`

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

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`)
        }
        const data = await response.json()
        setEntries(parseResponseItems(data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div>
      <h2>Leaderboard</h2>
      <p className="mb-3 small text-muted">
        API: <code>{endpoint}</code>
      </p>

      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && entries.length === 0 && <p>No leaderboard entries available.</p>}

      {!loading && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover table-borderless">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id ?? entry.id ?? index}>
                  <td>{entry.rank ?? index + 1}</td>
                  <td>{entry.username ?? entry.user ?? entry.name ?? 'Unknown'}</td>
                  <td>{entry.score ?? entry.points ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
