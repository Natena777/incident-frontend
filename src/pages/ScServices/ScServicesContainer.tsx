import { useState, useEffect } from 'react'
import api from '../../services/api'
import ScServicesView from './ScServicesView'

interface ScService {
  id: number
  name: string
  subCategoryId: number
}

function ScServicesContainer() {
  const [services, setServices] = useState<ScService[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editService, setEditService] = useState<ScService | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    subCategoryId: '' as number | ''
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await api.get('/scServices')
      setServices(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete service?')) {
      try {
        await api.delete(`/scServices/${id}`)
        fetchServices()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editService) {
        await api.patch(`/scServices/${editService.id}`, formData)
      } else {
        await api.post('/scServices/create', formData)
      }
      setShowModal(false)
      fetchServices()
      setFormData({ name: '', subCategoryId: '' })
      setEditService(null)
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ name: '', subCategoryId: '' })
    setEditService(null)
    setShowModal(true)
  }

  const openEdit = (service: ScService) => {
    setEditService(service)
    setFormData({ name: service.name, subCategoryId: service.subCategoryId })
    setShowModal(true)
  }

  return (
    <ScServicesView
      services={services}
      showModal={showModal}
      editService={editService}
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

export default ScServicesContainer
