import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  active: boolean
}

interface UsersViewProps {
  users: User[]
  showModal: boolean
  editUser: User | null
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    password: string
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openEdit: (user: User) => void
}

function UsersView({
  users,
  showModal,
  editUser,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openEdit
}: UsersViewProps) {
  return (
    <div>
      <PageHeader title="Users" />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.active ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn-edit" onClick={() => openEdit(user)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editUser ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
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

export default UsersView
