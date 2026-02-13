import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProyectos } from '../services/ImportProyectos'

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      const data = await getProyectos();
      setProyectos(data);
    };
    fetchProyectos();
  }, []);

  return (
    <div className="container">
      <h2 className="section-title">Showcase de Proyectos Laravel</h2>
      <div className="grid">
        {proyectos.map(p => (
          <div key={p.id} className="card">
            <h3>{p.nombre}</h3>
            <p><strong>Dificultad:</strong> {p.dificultad}</p>
            <p>{p.objetivo}</p>
            <Link to={`/proyectos/${p.id}`} className="btn-primary">Ver Ficha Técnica</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
