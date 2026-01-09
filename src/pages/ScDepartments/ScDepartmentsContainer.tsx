import { useState, useEffect } from 'react'
import api from '../../services/api'
import ScDepartmentsView from './ScDepartmentsView'

interface ScDepartment {
  id: number
  name: string
}

function ScDepartmentsContainer() {
  const [departments, setDepartments] = useState<ScDepartment[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editDepartment, setEditDepartment] = useState<ScDepartment | null>(null)
  const [formData, setFormData] = useState({ name: '' })

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/scDepartment')
      setDepartments(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete department?')) {
      try {
        await api.delete(`/scDepartment/${id}`)
        fetchDepartments()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editDepartment) {
        await api.patch(`/scDepartment/${editDepartment.id}`, formData)
      } else {
        await api.post('/scDepartment/create', formData)
      }
      setShowModal(false)
      fetchDepartments()
      setFormData({ name: '' })
      setEditDepartment(null)
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ name: '' })
    setEditDepartment(null)
    setShowModal(true)
  }

  const openEdit = (dept: ScDepartment) => {
    setEditDepartment(dept)
    setFormData({ name: dept.name })
    setShowModal(true)
  }

  return (
    <ScDepartmentsView
      departments={departments}
      showModal={showModal}
      editDepartment={editDepartment}
      formData={formData}
      setFormData={setFormData}
      setShowModal={setShowModal}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      openCreate={openCreate}
      openEdit={openEdit}
    />
  )
}

export default ScDepartmentsContainer
