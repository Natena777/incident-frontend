import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface Role {
  name: string
}

interface RolesViewProps {
  roles: Role[]
  showModal: boolean
  formData: { name: string }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (name: string) => void
  openCreate: () => void
}

function RolesView({
  roles,
  showModal,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate
}: RolesViewProps) {
  return (
    <div>
      <PageHeader 
        title="Roles" 
        buttonText="Create Role"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.name}>
                <td>{role.name}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(role.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Role</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Role Name</label>
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

export default RolesView
