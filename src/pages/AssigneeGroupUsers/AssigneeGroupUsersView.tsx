import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface AssigneeGroupUser {
  id: number
  groupId: number
  userId: number
}

interface AssigneeGroupUsersViewProps {
  groupUsers: AssigneeGroupUser[]
  showModal: boolean
  formData: {
    groupId: number | ''
    userIds: string
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
}

function AssigneeGroupUsersView({
  groupUsers,
  showModal,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate
}: AssigneeGroupUsersViewProps) {
  return (
    <div>
      <PageHeader 
        title="Assignee Group Users" 
        buttonText="Add Users"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Group ID</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupUsers.map(gu => (
              <tr key={gu.id}>
                <td>{gu.id}</td>
                <td>{gu.groupId}</td>
                <td>{gu.userId}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(gu.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Users to Group</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Group ID</label>
                <input type="number" value={formData.groupId} onChange={(e) => setFormData({...formData, groupId: parseInt(e.target.value)})} required />
              </div>
              <div className="form-group">
                <label>User IDs (comma separated)</label>
                <input value={formData.userIds} onChange={(e) => setFormData({...formData, userIds: e.target.value})} required placeholder="1,2,3" />
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

export default AssigneeGroupUsersView
