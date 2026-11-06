import { ErrorCampo } from './ErrorCampo.jsx'
import { OjoPassword } from './OjoPassword.jsx'

export function CampoPassword({
  id,
  label,
  valor,
  onChange,
  onBlur,
  error,
  placeholder,
  visible,
  onAlternar,
  autoComplete,
  wrapperClassName = 'mb-3',
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
      <div className="pf-pass-wrapper">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`form-control pf-input${error ? ' is-invalid' : ''}`}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
        />
        <OjoPassword visible={visible} onAlternar={onAlternar} />
      </div>
      <ErrorCampo>{error}</ErrorCampo>
    </div>
  )
}
