import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface AssigneeGroup {
  id: number
  name: string
}

interface AssigneeGroupsViewProps {
  groups: AssigneeGroup[]
  showModal: boolean
  formData: { name: string }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
}

function AssigneeGroupsView({
  groups,
  showModal,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate
}: AssigneeGroupsViewProps) {
  return (
    <div>
      <PageHeader 
        title="Assignee Groups" 
        buttonText="Create Group"
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
            {groups.map(group => (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(group.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Assignee Group</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Group Name</label>
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

export default AssigneeGroupsView
