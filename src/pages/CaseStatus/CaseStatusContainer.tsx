import { useState, useEffect } from 'react'
import api from '../../services/api'
import CaseStatusView from './CaseStatusView'

interface CaseStatus {
  id: number
  name: string
  isFinal: boolean
  isPaused: boolean
}

function CaseStatusContainer() {
  const [statuses, setStatuses] = useState<CaseStatus[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    isFinal: false,
    isPaused: false
  })

  useEffect(() => {
    fetchStatuses()
  }, [])

  const fetchStatuses = async () => {
    try {
      const response = await api.get('/status')
      setStatuses(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete status?')) {
      try {
        await api.delete(`/status/${id}`)
        fetchStatuses()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/status/create', formData)
      setShowModal(false)
      fetchStatuses()
      setFormData({ name: '', isFinal: false, isPaused: false })
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ name: '', isFinal: false, isPaused: false })
    setShowModal(true)
  }

  return (
    <CaseStatusView
      statuses={statuses}
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

export default CaseStatusContainer
