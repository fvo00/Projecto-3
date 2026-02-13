import { Link } from 'react-router-dom';

// Tarjeta para la Guía Técnica (8 temas mínimos) [cite: 19]
export function TemaCard({ tema }) {
  return (
    <div className="card">
      <h3>{tema.titulo}</h3>
      <p>{tema.resumen}</p>
      <Link to={`/guia/${tema.id}`} className="btn-primary">Ver detalle</Link>
    </div>
  );
}