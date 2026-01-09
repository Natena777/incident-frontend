import { useState, useEffect } from 'react'
import api from '../../services/api'
import UsersView from './UsersView'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  active: boolean
}

function UsersContainer() {
  const [users, setUsers] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete user?')) {
      try {
        await api.delete(`/users/${id}`)
        fetchUsers()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editUser) {
        await api.patch(`/users/${editUser.id}`, formData)
      }
      setShowModal(false)
      fetchUsers()
      setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', password: '' })
      setEditUser(null)
    } catch (err) {
      console.error(err)
    }
  }

  const openEdit = (user: User) => {
    setEditUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      password: ''
    })
    setShowModal(true)
  }

  return (
    <UsersView
      users={users}
      showModal={showModal}
      editUser={editUser}
      formData={formData}
      setFormData={setFormData}
      setShowModal={setShowModal}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      openEdit={openEdit}
    />
  )
}

export default UsersContainer
