import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface ScDepartment {
  id: number
  name: string
}

interface ScDepartmentsViewProps {
  departments: ScDepartment[]
  showModal: boolean
  editDepartment: ScDepartment | null
  formData: { name: string }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
  openEdit: (dept: ScDepartment) => void
}

function ScDepartmentsView({
  departments,
  showModal,
  editDepartment,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate,
  openEdit
}: ScDepartmentsViewProps) {
  return (
    <div>
      <PageHeader 
        title="SC Departments" 
        buttonText="Create Department"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dept => (
              <tr key={dept.id}>
                <td>{dept.id}</td>
                <td>{dept.name}</td>
                <td>
                  <button className="btn-edit" onClick={() => openEdit(dept)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(dept.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editDepartment ? 'Edit Department' : 'Create Department'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Department Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
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

export default ScDepartmentsView
