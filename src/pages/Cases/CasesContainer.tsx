import { useState, useEffect } from 'react'
import api from '../../services/api'
import CasesView from './CasesView'

interface CaseItem {
  id: number
  caseNumber: string
  title: string
  description: string
  statusId: number
  createdBy: number
  assignedTo: number
}

function CasesContainer() {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editCase, setEditCase] = useState<CaseItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    statusId: '' as number | '',
    assignedTo: '' as number | ''
  })

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    try {
      const response = await api.get('/cases')
      setCases(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete case?')) {
      try {
        await api.delete(`/cases/${id}`)
        fetchCases()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editCase) {
        await api.patch(`/cases/${editCase.id}`, formData)
      } else {
        await api.post('/cases/create', formData)
      }
      setShowModal(false)
      fetchCases()
      setFormData({ title: '', description: '', statusId: '', assignedTo: '' })
      setEditCase(null)
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ title: '', description: '', statusId: '', assignedTo: '' })
    setEditCase(null)
    setShowModal(true)
  }

  const openEdit = (caseItem: CaseItem) => {
    setEditCase(caseItem)
    setFormData({
      title: caseItem.title,
      description: caseItem.description,
      statusId: caseItem.statusId,
      assignedTo: caseItem.assignedTo
    })
    setShowModal(true)
  }

  return (
    <CasesView
      cases={cases}
      showModal={showModal}
      editCase={editCase}
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

export default CasesContainer
