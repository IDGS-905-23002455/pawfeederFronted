export function PanelAlerta({ tipo = 'ok', children }) {
  return <div className={`admin-alert ${tipo === 'ok' ? 'alert-ok' : 'alert-error'}`}>{children}</div>
}
