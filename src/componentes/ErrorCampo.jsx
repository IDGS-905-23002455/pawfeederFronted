export function ErrorCampo({ children }) {
  if (!children) return null
  return <div className="pf-field-error">{children}</div>
}
