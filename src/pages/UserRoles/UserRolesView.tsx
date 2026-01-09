import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface UserRole {
  id: number
  userId: number
  roleName: string
}

interface UserRolesViewProps {
  userRoles: UserRole[]
  showModal: boolean
  formData: {
    userId: number | ''
    roleName: string
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
}

function UserRolesView({
  userRoles,
  showModal,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate
}: UserRolesViewProps) {
  return (
    <div>
      <PageHeader 
        title="User Roles" 
        buttonText="Assign Role"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userRoles.map(ur => (
              <tr key={ur.id}>
                <td>{ur.id}</td>
                <td>{ur.userId}</td>
                <td>{ur.roleName}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(ur.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Assign Role to User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User ID</label>
                <input type="number" value={formData.userId} onChange={(e) => setFormData({...formData, userId: parseInt(e.target.value)})} required />
              </div>
              <div className="form-group">
                <label>Role Name</label>
                <input value={formData.roleName} onChange={(e) => setFormData({...formData, roleName: e.target.value})} required />
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

export default UserRolesView
