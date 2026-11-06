export function Estrellas({ calificacion }) {
  return (
    <div className="mb-2 text-warning fs-6">
      {Array.from({ length: calificacion }, (_, i) => (
        <span key={`llena-${i}`}>★</span>
      ))}
      {Array.from({ length: 5 - calificacion }, (_, i) => (
        <span key={`vacia-${i}`} className="text-black-50 opacity-25">
          ★
        </span>
      ))}
    </div>
  )
}
