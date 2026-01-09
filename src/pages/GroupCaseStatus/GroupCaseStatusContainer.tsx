import { useState } from 'react'
import api from '../../services/api'
import GroupCaseStatusView from './GroupCaseStatusView'

function GroupCaseStatusContainer() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    groupId: '' as number | '',
    statusId: '' as number | ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/groupCaseStatus/addStatus', formData)
      setShowModal(false)
      setFormData({ groupId: '', statusId: '' })
      alert('Status added to group successfully')
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ groupId: '', statusId: '' })
    setShowModal(true)
  }

  return (
    <GroupCaseStatusView
      showModal={showModal}
      formData={formData}
      setFormData={setFormData}
      setShowModal={setShowModal}
      handleSubmit={handleSubmit}
      openCreate={openCreate}
    />
  )
}

export default GroupCaseStatusContainer
