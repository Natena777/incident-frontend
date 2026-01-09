import { useState, useEffect } from 'react'
import api from '../../services/api'
import AssigneeGroupsView from './AssigneeGroupsView'

interface AssigneeGroup {
  id: number
  name: string
}

function AssigneeGroupsContainer() {
  const [groups, setGroups] = useState<AssigneeGroup[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '' })

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      const response = await api.get('/assigneeGroup')
      setGroups(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete group?')) {
      try {
        await api.delete(`/assigneeGroup/${id}`)
        fetchGroups()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/assigneeGroup/create', formData)
      setShowModal(false)
      fetchGroups()
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
    <AssigneeGroupsView
      groups={groups}
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

export default AssigneeGroupsContainer
