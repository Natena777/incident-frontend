import { useState, useEffect } from 'react'
import api from '../../services/api'
import UserRolesView from './UserRolesView'

interface UserRole {
  id: number
  userId: number
  roleName: string
}

function UserRolesContainer() {
  const [userRoles, setUserRoles] = useState<UserRole[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    userId: '' as number | '',
    roleName: ''
  })

  useEffect(() => {
    fetchUserRoles()
  }, [])

  const fetchUserRoles = async () => {
    try {
      const response = await api.get('/userRole')
      setUserRoles(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete user role?')) {
      try {
        await api.delete(`/userRole/${id}`)
        fetchUserRoles()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/userRole/create', formData)
      setShowModal(false)
      fetchUserRoles()
      setFormData({ userId: '', roleName: '' })
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ userId: '', roleName: '' })
    setShowModal(true)
  }

  return (
    <UserRolesView
      userRoles={userRoles}
      showModal={showModal}
      formData={formData}
      setFormData={setFormData}
      setShowModal={setShowModal}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      openCreate={openCreate}
    />
  )
}

export default UserRolesContainer
