import logo from '../assets/logo.svg'

interface PageHeaderProps {
  title: string
  onButtonClick?: () => void
  buttonText?: string
}

function PageHeader({ title, onButtonClick, buttonText }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        <img src={logo} alt="Logo" style={{width: '32px', height: '32px'}} />
        <h1>{title}</h1>
      </div>
      {buttonText && onButtonClick && (
        <button className="btn-primary" onClick={onButtonClick}>{buttonText}</button>
      )}
    </div>
  )
}

export default PageHeader
