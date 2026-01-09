import { useState, useEffect } from 'react'
import api from '../../services/api'
import ScCategoryView from './ScCategoryView'

interface ScCategory {
  id: number
  name: string
  departmentId: number
}

function ScCategoryContainer() {
  const [categories, setCategories] = useState<ScCategory[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editCategory, setEditCategory] = useState<ScCategory | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    departmentId: '' as number | ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/scCategory')
      setCategories(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete category?')) {
      try {
        await api.delete(`/scCategory/${id}`)
        fetchCategories()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editCategory) {
        await api.patch(`/scCategory/${editCategory.id}`, formData)
      } else {
        await api.post('/scCategory/create', formData)
      }
      setShowModal(false)
      fetchCategories()
      setFormData({ name: '', departmentId: '' })
      setEditCategory(null)
    } catch (err) {
      console.error(err)
    }
  }

  const openCreate = () => {
    setFormData({ name: '', departmentId: '' })
    setEditCategory(null)
    setShowModal(true)
  }

  const openEdit = (cat: ScCategory) => {
    setEditCategory(cat)
    setFormData({ name: cat.name, departmentId: cat.departmentId })
    setShowModal(true)
  }

  return (
    <ScCategoryView
      categories={categories}
      showModal={showModal}
      editCategory={editCategory}
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

export default ScCategoryContainer
