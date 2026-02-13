export function ProyectoCard({ proyecto }) {
  return (
    <div className="card">
      <span className="tag">{proyecto.dificultad}</span>
      <h3>{proyecto.nombre}</h3>
      <p>{proyecto.objetivo}</p>
      <Link to={`/proyectos/${proyecto.id}`} className="btn-primary">Ficha técnica</Link>
    </div>
  );
}