import { useState, useEffect } from 'react'
import api from '../../services/api'
import RolesView from './RolesView'

interface Role {
  name: string
}

function RolesContainer() {
  const [roles, setRoles] = useState<Role[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '' })

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await api.get('/role')
      setRoles(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (name: string) => {
    if (confirm('Delete role?')) {
      try {
        await api.delete(`/role/delete/${name}`)
        fetchRoles()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/role/create', formData)
      setShowModal(false)
      fetchRoles()
      setFormData({ name: '' })
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ name: '' })
    setShowModal(true)
  }

  return (
    <RolesView
      roles={roles}
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

export default RolesContainer
