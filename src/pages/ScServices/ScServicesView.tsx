import '../Common.css'
import PageHeader from '../../components/PageHeader'

interface ScService {
  id: number
  name: string
  subCategoryId: number
}

interface ScServicesViewProps {
  services: ScService[]
  showModal: boolean
  editService: ScService | null
  formData: {
    name: string
    subCategoryId: number | ''
  }
  setFormData: (data: any) => void
  setShowModal: (value: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: number) => void
  openCreate: () => void
  openEdit: (service: ScService) => void
}

function ScServicesView({
  services,
  showModal,
  editService,
  formData,
  setFormData,
  setShowModal,
  handleSubmit,
  handleDelete,
  openCreate,
  openEdit
}: ScServicesViewProps) {
  return (
    <div>
      <PageHeader 
        title="SC Services" 
        buttonText="Create Service"
        onButtonClick={openCreate}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SubCategory ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.subCategoryId}</td>
                <td>
                  <button className="btn-edit" onClick={() => openEdit(service)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editService ? 'Edit Service' : 'Create Service'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Service Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>SubCategory ID</label>
                <input type="number" value={formData.subCategoryId} onChange={(e) => setFormData({...formData, subCategoryId: parseInt(e.target.value)})} required />
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

export default ScServicesView
