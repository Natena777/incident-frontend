import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface CaseStatus {
  id: number
  name: string
  isFinal: boolean
  isPaused: boolean
}

interface CaseStatusViewProps {
  statuses: CaseStatus[]
  showModal: boolean
  formData: {
    name: string
    isFinal: boolean
    isPaused: boolean
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
}

function CaseStatusView({
  statuses,
  showModal,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate
}: CaseStatusViewProps) {
  return (
    <div>
      <PageHeader 
        title="Case Status" 
        buttonText="Create Status"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Is Final</th>
              <th>Is Paused</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map(status => (
              <tr key={status.id}>
                <td>{status.id}</td>
                <td>{status.name}</td>
                <td>{status.isFinal ? 'Yes' : 'No'}</td>
                <td>{status.isPaused ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(status.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Case Status</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Status Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  checked={formData.isFinal} 
                  onChange={(e) => setFormData({...formData, isFinal: e.target.checked})} 
                  id="isFinal"
                />
                <label htmlFor="isFinal">Is Final</label>
              </div>
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  checked={formData.isPaused} 
                  onChange={(e) => setFormData({...formData, isPaused: e.target.checked})} 
                  id="isPaused"
                />
                <label htmlFor="isPaused">Is Paused</label>
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

export default CaseStatusView
