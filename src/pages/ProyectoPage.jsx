import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProyectos } from '../services/ImportProyectos';

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
    <div className="proyectos-wrapper">
      {/* SECCIÓN HERO SHOWCASE */}
      <header className="projects-hero">
        <div className="container">
          <div className="hero-badge">Explora y Aprende</div>
          <h1>Proyectos <span className="text-gradient">Open Source</span></h1>
          <p>Desde aplicaciones CRUD básicas hasta arquitecturas complejas con Laravel.</p>
        </div>
      </header>

      <main className="container projects-main">
        <div className="projects-grid-pro">
          {proyectos.map(p => (
            <div key={p.id} className="project-card-pro">
              {/* Parte superior: Imagen/Icono dinámico */}
              <div className="project-visual">
                <img src={`https://skillicons.dev/icons?i=laravel,php,mysql&perline=3`} alt="Stack" />
                <span className={`difficulty-tag ${p.dificultad.toLowerCase()}`}>
                  {p.dificultad}
                </span>
              </div>

              {/* Contenido */}
              <div className="project-info">
                <h3>{p.nombre}</h3>
                <p className="project-objective">{p.objetivo}</p>
                
                <div className="project-features">
                  <span>⚡ MVC</span>
                  <span>🔒 Auth</span>
                  <span>📊 DB</span>
                </div>

                <div className="project-actions">
                  <Link to={`/proyectos/${p.id}`} className="btn-details">
                    Ficha Técnica <span>→</span>
                  </Link>
                  <a href="#" className="github-icon">
                    <img src="https://skillicons.dev/icons?i=github" alt="repo" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}