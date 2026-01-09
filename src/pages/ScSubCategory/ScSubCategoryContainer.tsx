import { useState, useEffect } from 'react'
import api from '../../services/api'
import ScSubCategoryView from './ScSubCategoryView'

interface ScSubCategory {
  id: number
  name: string
  categoryId: number
}

function ScSubCategoryContainer() {
  const [subCategories, setSubCategories] = useState<ScSubCategory[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editSubCategory, setEditSubCategory] = useState<ScSubCategory | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '' as number | ''
  })

  useEffect(() => {
    fetchSubCategories()
  }, [])

  const fetchSubCategories = async () => {
    try {
      const response = await api.get('/scSubCategory')
      setSubCategories(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete subcategory?')) {
      try {
        await api.delete(`/scSubCategory/${id}`)
        fetchSubCategories()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editSubCategory) {
        await api.patch(`/scSubCategory/${editSubCategory.id}`, formData)
      } else {
        await api.post('/scSubCategory/create', formData)
      }
      setShowModal(false)
      fetchSubCategories()
      setFormData({ name: '', categoryId: '' })
      setEditSubCategory(null)
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ name: '', categoryId: '' })
    setEditSubCategory(null)
    setShowModal(true)
  }

  const openEdit = (sub: ScSubCategory) => {
    setEditSubCategory(sub)
    setFormData({ name: sub.name, categoryId: sub.categoryId })
    setShowModal(true)
  }

  return (
    <ScSubCategoryView
      subCategories={subCategories}
      showModal={showModal}
      editSubCategory={editSubCategory}
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

export default ScSubCategoryContainer
