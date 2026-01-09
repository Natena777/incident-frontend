import { useState } from 'react'
import api from '../../services/api'
import RegistrationView from './RegistrationView'

function RegistrationContainer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await api.post('/auth/register', formData)
      setSuccess('რეგისტრაცია წარმატებით დასრულდა')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', password: '' })
    } catch (err: any) {
      setError(err.response?.data?.message || 'რეგისტრაცია ვერ მოხერხდა')
    }
  }

  return (
    <RegistrationView
      formData={formData}
      error={error}
      success={success}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  )
}

export default RegistrationContainer
