import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface ScSubCategory {
  id: number
  name: string
  categoryId: number
}

interface ScSubCategoryViewProps {
  subCategories: ScSubCategory[]
  showModal: boolean
  editSubCategory: ScSubCategory | null
  formData: {
    name: string
    categoryId: number | ''
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
  openEdit: (sub: ScSubCategory) => void
}

function ScSubCategoryView({
  subCategories,
  showModal,
  editSubCategory,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate,
  openEdit
}: ScSubCategoryViewProps) {
  return (
    <div>
      <PageHeader 
        title="SC SubCategory" 
        buttonText="Create SubCategory"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map(sub => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.name}</td>
                <td>{sub.categoryId}</td>
                <td>
                  <button className="btn-edit" onClick={() => openEdit(sub)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(sub.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editSubCategory ? 'Edit SubCategory' : 'Create SubCategory'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>SubCategory Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Category ID</label>
                <input type="number" value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: parseInt(e.target.value)})} required />
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

export default ScSubCategoryView
