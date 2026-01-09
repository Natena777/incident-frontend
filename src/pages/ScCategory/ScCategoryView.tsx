import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface ScCategory {
  id: number
  name: string
  departmentId: number
}

interface ScCategoryViewProps {
  categories: ScCategory[]
  showModal: boolean
  editCategory: ScCategory | null
  formData: {
    name: string
    departmentId: number | ''
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
  openEdit: (cat: ScCategory) => void
}

function ScCategoryView({
  categories,
  showModal,
  editCategory,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate,
  openEdit
}: ScCategoryViewProps) {
  return (
    <div>
      <PageHeader 
        title="SC Category" 
        buttonText="Create Category"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.departmentId}</td>
                <td>
                  <button className="btn-edit" onClick={() => openEdit(cat)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(cat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editCategory ? 'Edit Category' : 'Create Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Department ID</label>
                <input type="number" value={formData.departmentId} onChange={(e) => setFormData({...formData, departmentId: parseInt(e.target.value)})} required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">Save</button>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScCategoryView
