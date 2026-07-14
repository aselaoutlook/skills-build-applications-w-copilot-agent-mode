import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../utils/baseUrl.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${apiBaseUrl}/users/`

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

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`)
        }
        const data = await response.json()
        setUsers(parseResponseItems(data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <p className="mb-3 small text-muted">
        API: <code>{endpoint}</code>
      </p>

      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && users.length === 0 && <p>No users were returned from the API.</p>}

      {!loading && users.length > 0 && (
        <div className="list-group">
          {users.map((user, index) => (
            <div key={user._id ?? user.id ?? index} className="list-group-item">
              <strong>{user.name ?? user.username ?? 'Unnamed user'}</strong>
              <div className="text-muted">{user.email ?? user.emailAddress ?? 'No email available'}</div>
              {user.fitnessGoal && <small className="text-muted">Goal: {user.fitnessGoal}</small>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
