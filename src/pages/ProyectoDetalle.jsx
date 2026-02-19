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
        const encontrado = proyectos.find(p => String(p.id) === String(id));
        setProyecto(encontrado);
      } catch (error) {
        console.error("Error cargando el detalle:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProyecto();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="loading-screen">Analizando arquitectura...</div>;
  if (!proyecto) return (
    <div className="container error-box">
      <h2>⚠️ Proyecto no disponible</h2>
      <Link to="/proyectos" className="btn-primary">Volver al Showcase</Link>
    </div>
  );

  return (
    <div className="project-detail-wrapper">
      <header className="project-hero-detail">
        <div className="container">
          <Link to="/proyectos" className="back-link-modern">← Volver al Showcase</Link>
          <div className="hero-split">
            <div className="hero-text">
              <span className={`diff-pill ${proyecto.dificultad?.toLowerCase()}`}>
                Nivel {proyecto.dificultad}
              </span>
              <h1>{proyecto.nombre}</h1>
              <p>{proyecto.objetivo}</p>
            </div>
            <div className="hero-stack-visual">
               <img src={`https://skillicons.dev/icons?i=${proyecto.stack?.toLowerCase().replace(/ /g, '')}`} alt="Stack" />
            </div>
          </div>
        </div>
      </header>

      <div className="container project-grid-layout">
        <main className="project-main-info">
          
          <section className="info-section-card">
            <h3>🚀 Módulos Core de Laravel</h3>
            <p>Este proyecto se centra en la implementación profunda de las siguientes características del framework:</p>
            <div className="modules-grid">
              {proyecto.modulos?.map(m => (
                <div key={m} className="module-item">
                  <span className="dot-check">✓</span> {m}
                </div>
              ))}
            </div>
          </section>

          <section className="info-section-card">
            <h3>🛠️ Proceso de Desarrollo</h3>
            <div className="roadmap-list">
              <div className="roadmap-step">
                <div className="step-circle">1</div>
                <div className="step-text"><strong>Modelado de Datos:</strong> Diseño de migraciones y relaciones en Eloquent.</div>
              </div>
              <div className="roadmap-step">
                <div className="step-circle">2</div>
                <div className="step-text"><strong>Lógica de Negocio:</strong> Implementación de Controllers, Services y Validation.</div>
              </div>
              <div className="roadmap-step">
                <div className="step-circle">3</div>
                <div className="step-text"><strong>Seguridad:</strong> Configuración de Policies y Middlewares de acceso.</div>
              </div>
            </div>
          </section>
        </main>

        <aside className="project-sidebar-detail">
          <div className="sidebar-widget-pro">
            <h4>Especificaciones</h4>
            <ul className="spec-list">
              <li><strong>Stack:</strong> {proyecto.stack}</li>
              <li><strong>Base de Datos:</strong> MySQL / PostgreSQL</li>
              <li><strong>Entorno:</strong> Laravel 11 + Vite</li>
              <li><strong>Status:</strong> <span className="status-live">Production Ready</span></li>
            </ul>
            <hr />
            <button className="btn-github-full" onClick={() => window.open('https://github.com', '_blank')}>
               Ver Código Fuente
            </button>
          </div>

          <div className="sidebar-widget-pro dark-widget">
            <h4>¿Quieres replicarlo?</h4>
            <p>Clona el repositorio y sigue el README para configurar las variables de entorno.</p>
            <code>cp .env.example .env</code>
          </div>
        </aside>
      </div>
    </div>
  );
}