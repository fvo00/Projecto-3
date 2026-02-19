import { useParams, Link,  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTemas } from '../services/ImportTemas';

export default function GuiaDetalle() {
  const { id } = useParams();
  const [tema, setTema] = useState(null);
  const [totalTemas, setTotalTemas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTema = async () => {
      try {
        const temas = await getTemas();
        if (temas && temas.length > 0) {
          setTotalTemas(temas.length);
          const encontrado = temas.find(t => String(t.id) === String(id));
          setTema(encontrado);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTema();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="loading-screen">Cargando Masterclass...</div>;
  if (!tema) return <div className="container">Tema no encontrado.</div>;

  const idNum = parseInt(id);
  const porcentaje = totalTemas > 0 ? (idNum / totalTemas) * 100 : 0;

  return (
    <div className="guide-wrapper">
      <div className="hero-banner" style={{ 
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80')` 
      }}>
        <div className="container">
          <Link to="/guia" className="back-pill">← Volver al HUB</Link>
          <div className="hero-tags">
            <span className="tag-red">Módulo {tema.id}</span>
            <span className="tag-blur">Laravel 11</span>
          </div>
          <h1>{tema.titulo}</h1>
        </div>
      </div>

      <div className="container main-layout">
        <div className="content-side">
          <div className="alert-card">
            <div className="alert-icon">🚀</div>
            <div className="alert-text">
              <h4>Objetivo de aprendizaje</h4>
              <p>Al finalizar esta lectura, dominarás la implementación de {tema.titulo} en entornos reales.</p>
            </div>
          </div>

          <article className="rich-content">
            <section className="section-block">
              <div className="section-header">
                <span className="step-num">01</span>
                <h2>Fundamentos Técnicos</h2>
              </div>
              <p className="big-text">{tema.contenido}</p>
            </section>

            <div className="mid-page-image">
               <img src="https://skillicons.dev/icons?i=laravel,php,mysql,nginx&perline=4" alt="Tech Stack" />
               <p className="image-caption">Ecosistema tecnológico involucrado en este módulo.</p>
            </div>

            {tema.ejemplo_codigo && (
              <section className="section-block">
                <div className="section-header">
                  <span className="step-num">02</span>
                  <h2>Implementación</h2>
                </div>
                <div className="code-window">
                  <div className="window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <pre>
                    <code>{tema.ejemplo_codigo}</code>
                  </pre>
                </div>
              </section>
            )}
          </article>

        </div>

        <aside className="sticky-sidebar">
          <div className="side-box progress-box">
            <h4>Tu Progreso</h4>
            <div className="radial-progress">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray={`${porcentaje}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="percentage">{Math.round(porcentaje)}%</div>
            </div>
          </div>

          <div className="side-box info-list">
             <h4>Recursos Extra</h4>
             <a href="#" className="resource-link">📂 Descargar Cheat Sheet</a>
             <a href="#" className="resource-link">📺 Ver Video Tutorial</a>
          </div>
        </aside>
      </div>
    </div>
  );
}