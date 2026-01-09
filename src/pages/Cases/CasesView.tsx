import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface CaseItem {
  id: number
  caseNumber: string
  title: string
  description: string
  statusId: number
  createdBy: number
  assignedTo: number
}

interface CasesViewProps {
  cases: CaseItem[]
  showModal: boolean
  editCase: CaseItem | null
  formData: {
    title: string
    description: string
    statusId: number | ''
    assignedTo: number | ''
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
  openEdit: (caseItem: CaseItem) => void
}

function CasesView({
  cases,
  showModal,
  editCase,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate,
  openEdit
}: CasesViewProps) {
  return (
    <div>
      <PageHeader 
        title="Cases" 
        buttonText="Create Case"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Case Number</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status ID</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map(caseItem => (
              <tr key={caseItem.id}>
                <td>{caseItem.id}</td>
                <td>{caseItem.caseNumber}</td>
                <td>{caseItem.title}</td>
                <td>{caseItem.description}</td>
                <td>{caseItem.statusId}</td>
                <td>{caseItem.assignedTo}</td>
                <td>
                  <button className="btn-edit" onClick={() => openEdit(caseItem)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(caseItem.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editCase ? 'Edit Case' : 'Create Case'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  required
                  rows={4}
                  style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px'}}
                />
              </div>
              <div className="form-group">
                <label>Status ID</label>
                <input type="number" value={formData.statusId} onChange={(e) => setFormData({...formData, statusId: parseInt(e.target.value)})} required />
              </div>
              <div className="form-group">
                <label>Assigned To (User ID)</label>
                <input type="number" value={formData.assignedTo} onChange={(e) => setFormData({...formData, assignedTo: parseInt(e.target.value)})} required />
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

export default CasesView
