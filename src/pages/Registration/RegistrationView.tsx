import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import '../Login/Login.css'

interface RegistrationViewProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    password: string
  }
  error: string
  success: string
  setFormData: (data: any) => void
  handleSubmit: (e: React.FormEvent) => void
}

function RegistrationView({ formData, error, success, setFormData, handleSubmit }: RegistrationViewProps) {
  return (
      <div className="auth-container">
        <div className="auth-box">
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <img src={logo} alt="Logo" style={{width: '80px', height: '80px'}} />
          </div>
          <h2>რეგისტრაცია</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>სახელი</label>
              <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
              />
            </div>
            <div className="form-group">
              <label>გვარი</label>
              <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
              />
            </div>
            <div className="form-group">
              <label>ელ-ფოსტა</label>
              <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
              />
            </div>
            <div className="form-group">
              <label>ტელეფონი</label>
              <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>მისამართი</label>
              <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>პაროლი</label>
              <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
              />
            </div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <button type="submit" className="btn">რეგისტრაცია</button>
          </form>
          <div className="auth-link">
            უკვე რეგისტრირებული ხართ? <Link to="/login">შესვლა</Link>
          </div>
        </div>
      </div>
  )
}

export default RegistrationView