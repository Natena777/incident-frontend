import { useState, useEffect } from 'react'
import api from '../../services/api'
import AssigneeGroupUsersView from './AssigneeGroupUsersView'

interface AssigneeGroupUser {
  id: number
  groupId: number
  userId: number
}

function AssigneeGroupUsersContainer() {
  const [groupUsers, setGroupUsers] = useState<AssigneeGroupUser[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    groupId: '' as number | '',
    userIds: ''
  })

  useEffect(() => {
    fetchGroupUsers()
  }, [])

  const fetchGroupUsers = async () => {
    try {
      const response = await api.get('/assigneeGroupusers')
      setGroupUsers(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Remove user from group?')) {
      try {
        await api.delete(`/assigneeGroupusers/${id}`)
        fetchGroupUsers()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userIdsArray = formData.userIds.split(',').map(id => parseInt(id.trim()))
      await api.post('/assigneeGroupusers/addUsers', {
        groupId: formData.groupId,
        userIds: userIdsArray
      })
      setShowModal(false)
      fetchGroupUsers()
      setFormData({ groupId: '', userIds: '' })
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ groupId: '', userIds: '' })
    setShowModal(true)
  }

  return (
    <AssigneeGroupUsersView
      groupUsers={groupUsers}
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

export default AssigneeGroupUsersContainer
