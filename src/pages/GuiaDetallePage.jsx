import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTemas } from '../services/ImportTemas';
// Importamos el formateador de código

export default function GuiaDetalle() {
  const { id } = useParams();
  const [tema, setTema] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTema = async () => {
      try {
        const temas = await getTemas();
        const encontrado = temas.find(t => t.id.toString() === id);
        setTema(encontrado);
      } catch (error) {
        console.error("Error cargando el tema:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTema();
  }, [id]);

  if (loading) return <div className="container loading">Consultando documentación...</div>;
  if (!tema) return (
    <div className="container error-box">
      <h2>Tema no encontrado</h2>
      <Link to="/guia" className="btn-primary">Volver a la Guía</Link>
    </div>
  );

  return (
    <div className="container guide-detail-page">
      <nav className="breadcrumb">
        <Link to="/guia">Guía Técnica</Link> / <span>{tema.titulo}</span>
      </nav>

      <header className="guide-header">
        <h1>{tema.titulo}</h1>
        <p className="guide-summary">{tema.resumen || "Conceptos fundamentales del ecosistema Laravel."}</p>
      </header>

      <div className="guide-grid">
        <main className="guide-main">
          <section className="guide-card">
            <h3>📖 Teoría y Conceptos</h3>
            <div className="content-text">
              {tema.contenido}
            </div>
          </section>

          {tema.ejemplo_codigo && (
            <section className="guide-card">
              <h3>💻 Ejemplo Práctico</h3>
              <CodeBlock code={tema.ejemplo_codigo} />
            </section>
          )}
        </main>

        <aside className="guide-sidebar">
          <div className="sidebar-box artisan-box">
            <h4>⌨️ Comandos Artisan</h4>
            <code>{tema.comando || "N/A"}</code>
          </div>

          <div className="sidebar-box concepts-box">
            <h4>📌 Puntos Clave</h4>
            <ul className="concepts-list">
              {tema.puntos_clave?.map((punto, i) => (
                <li key={i}>{punto}</li>
              )) || <li>Concepto base de Laravel</li>}
            </ul>
          </div>

          <div className="sidebar-box links-box">
            <h4>🔗 Enlaces Oficiales</h4>
            <a href="https://laravel.com/docs" target="_blank" rel="noreferrer" className="doc-link">
              Documentación Laravel 11.x →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}