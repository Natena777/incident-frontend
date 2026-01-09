import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface GroupCaseStatusViewProps {
  showModal: boolean
  formData: {
    groupId: number | ''
    statusId: number | ''
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  openCreate: () => void
}

function GroupCaseStatusView({
  showModal,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  openCreate
}: GroupCaseStatusViewProps) {
  return (
    <div>
      <PageHeader 
        title="Group Case Status" 
        buttonText="Add Status to Group"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <p>No list endpoint available for this module.</p>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Status to Group</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Group ID</label>
                <input type="number" value={formData.groupId} onChange={(e) => setFormData({...formData, groupId: parseInt(e.target.value)})} required />
              </div>
              <div className="form-group">
                <label>Status ID</label>
                <input type="number" value={formData.statusId} onChange={(e) => setFormData({...formData, statusId: parseInt(e.target.value)})} required />
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

export default GroupCaseStatusView
