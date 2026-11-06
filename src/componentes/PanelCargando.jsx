export function PanelCargando({ texto = 'Cargando...' }) {
  return (
    <div className="pf-loading-box">
      <span className="pf-loading-ring"></span>
      <span>{texto}</span>
    </div>
  )
}
