import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import LoginView from './LoginView'

function LoginContainer() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await api.post('/auth/authenticate', { username, password })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'ავტორიზაცია ვერ მოხერხდა')
    }
  }

  return (
    <LoginView
      username={username}
      password={password}
      error={error}
      setUsername={setUsername}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  )
}

export default LoginContainer
