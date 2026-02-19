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
    <div className="home-wrapper">
      <header className="hero-modern">
        <div className="container hero-grid">
          <div className="hero-text-side">
            <div className="hero-badge">Next Gen Framework 2026</div>
            <h1>Laravel 11: <br /><span className="text-gradient">Artesanía Digital</span></h1>
            <p className="hero-description">
              La plataforma definitiva para construir aplicaciones modernas. 
              Elegancia en el código, potencia en el despliegue.
            </p>
            <div className="cta-flex">
              <button className="btn-primary" onClick={() => navigate('/guia')}>Empezar Ruta</button>
              <button className="btn-primary" onClick={() => navigate('/proyectos')}>Explorar Galería</button>
            </div>
          </div>
          
          <div className="hero-visual-side">
            <div className="code-mockup">
              <div className="mockup-header">
                <span className="m-dot"></span><span className="m-dot"></span><span className="m-dot"></span>
                <span className="mockup-title">routes/web.php</span>
              </div>
              <div className="mockup-body">
                <code>
                  <span className="c-blue">Route</span>::<span className="c-yellow">get</span>(<span className="c-green">'/'</span>, <span className="c-purple">function</span> () &#123; <br />
                  &nbsp;&nbsp;<span className="c-purple">return</span> <span className="c-yellow">view</span>(<span className="c-green">'welcome'</span>);<br />
                  &#125;);
                </code>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="tech-strip">
        <div className="container strip-flex">
          <span>POWERED BY:</span>
          <img src="https://skillicons.dev/icons?i=php,laravel,mysql,redis,vite,tailwind" alt="Stack" />
        </div>
      </div>

      <section className="container features-modern">
        <div className="section-intro">
          <h2>¿Por qué Laravel?</h2>
          <p>El ecosistema más robusto para desarrolladores PHP.</p>
        </div>

        {loading ? (
          <div className="loader">Iniciando sistema...</div>
        ) : (
          <div className="features-grid-modern">
            {features.map(f => (
              <div key={f.id} className="modern-card">
                <div className="card-icon">{f.icono}</div>
                <h3>{f.titulo}</h3>
                <p>{f.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      
      <section className="container quiz-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2>¿Crees que ya lo sabes todo?</h2>
            <p>Supera el examen técnico y obtén tu puntuación.</p>
          </div>
          <button className="btn-quiz" onClick={() => navigate('/quiz')}>¡Desafío Quiz!</button>
        </div>
      </section>
    </div>
  );
}