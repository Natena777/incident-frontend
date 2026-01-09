import { Link } from 'react-router-dom'
import './Login.css'

interface LoginViewProps {
  username: string
  password: string
  error: string
  setUsername: (value: string) => void
  setPassword: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
}

function LoginView({ username, password, error, setUsername, setPassword, handleSubmit }: LoginViewProps) {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>ავტორიზაცია</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>მომხმარებლის სახელი</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>პაროლი</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn">შესვლა</button>
        </form>
        <div className="auth-link">
          არ ხართ რეგისტრირებული? <Link to="/registration">რეგისტრაცია</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginView
