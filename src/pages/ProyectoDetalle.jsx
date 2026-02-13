import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProyectos } from '../services/ImportProyectos';

export default function ProyectoDetalle() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const proyectos = await getProyectos();
        const encontrado = proyectos.find(p => p.id.toString() === id);
        setProyecto(encontrado);
      } catch (error) {
        console.error("Error cargando el detalle:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProyecto();
  }, [id]);

  if (loading) return <div className="container loading">Cargando detalles del proyecto...</div>;
  
  if (!proyecto) return (
    <div className="container error-box">
      <h2>Proyecto no encontrado</h2>
      <Link to="/proyectos" className="btn-primary">Volver al listado</Link>
    </div>
  );

  return (
    <div className="container project-detail-page">
      {/* Cabecera con navegación */}
      <nav className="breadcrumb">
        <Link to="/proyectos">Proyectos</Link> / <span>{proyecto.nombre}</span>
      </nav>

      <header className="project-header">
        <div className="header-content">
          <span className="badge-dificultad">{proyecto.dificultad || 'Nivel Pro'}</span>
          <h1>{proyecto.nombre}</h1>
          <p className="project-tagline">{proyecto.objetivo}</p>
        </div>
      </header>

      <div className="project-grid">
        {/* Columna Principal: Info Técnica */}
        <div className="project-main">
          <section className="detail-card">
            <h3>Descripción del Stack</h3>
            <p>{proyecto.stack}</p>
          </section>

          <section className="detail-card">
            <h3>Módulos de Laravel Implicados</h3>
            <div className="modules-tags">
              {proyecto.modulos?.map(m => (
                <span key={m} className="module-tag">{m}</span>
              ))}
            </div>
          </section>
        </div>

        {/* Barra lateral: Quick Info */}
        <aside className="project-sidebar">
          <div className="sidebar-box">
            <h4>Ficha Técnica</h4>
            <ul>
              <li><strong>Categoría:</strong> Backend</li>
              <li><strong>Framework:</strong> Laravel 11.x</li>
              <li><strong>Database:</strong> Relacional</li>
            </ul>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-outline full-width">
              Ver Repositorio
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}