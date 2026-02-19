import { Link } from 'react-router-dom';


export function TemaCard({ tema }) {
  return (
    <div className="card">
      <h3>{tema.titulo}</h3>
      <p>{tema.resumen}</p>
      <Link to={`/guia/${tema.id}`} className="btn-primary">Ver detalle</Link>
    </div>
  );
}