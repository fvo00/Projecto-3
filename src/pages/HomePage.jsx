import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomeFeatures } from '../services/ImportHomeFeatures';

export default function Home() {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getHomeFeatures();
      setFeatures(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-badge">Versión 2026</div>
        <h1>Laravel: El Framework para <span className="text-gradient">Artesanos de la Web</span></h1>
        <p className="hero-subtitle">
          Potencia, elegancia y escalabilidad. Explora el ecosistema líder de PHP.
        </p>
        
        <div className="cta-group">
          <button className="btn-primary" onClick={() => navigate('/guia')}>Explorar Guía</button>
          <button className="btn-primary" onClick={() => navigate('/recetas')}>Ver Recetas</button>
        </div>
      </header>

      <section className="container features-section">
        <h2 className="section-title">Pilares de Laravel</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>Cargando pilares...</p>
        ) : (
          <div className="features-grid">
            {features.map(f => (
              <div key={f.id} className="feature-card">
                <span className="feature-icon">{f.icono}</span>
                <h3>{f.titulo}</h3>
                <p>{f.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container info-highlight">
        <div className="info-box-modern">
          <div className="info-text">
            <h2>¿Listo para empezar?</h2>
            <p>Pon a prueba tus conocimientos con nuestro test interactivo.</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/quiz')}>Ir al Quiz</button>
        </div>
      </section>
    </div>
  );
}