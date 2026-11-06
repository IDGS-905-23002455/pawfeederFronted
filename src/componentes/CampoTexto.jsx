import { ErrorCampo } from './ErrorCampo.jsx'

export function CampoTexto({
  id,
  label,
  tipo = 'text',
  valor,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
  wrapperClassName = 'mb-3',
  ...props
}) {
  return (
    <div className={wrapperClassName}>
      <label
        className="form-label fw-semibold small text-uppercase"
        style={{ letterSpacing: '0.06em' }}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={tipo}
        className={`form-control pf-input${error ? ' is-invalid' : ''}`}
        placeholder={placeholder}
        value={valor}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        {...props}
      />
      <ErrorCampo>{error}</ErrorCampo>
    </div>
  )
}
