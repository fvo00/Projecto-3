import { useState, useEffect } from 'react';
import { TemaCard } from '../components/TemaCard';
import { getTemas } from '../services/ImportTemas';

export default function Guia() {
  const [temas, setTemas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchTemas = async () => {
      const data = await getTemas();
      setTemas(data);
    };
    fetchTemas();
  }, []);

  // Filtrado en tiempo real
  const temasFiltrados = temas.filter(t => 
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="guia-container">
      {/* SECCIÓN HERO */}
      <header className="guia-hero-header">
        <div className="container header-flex">
          <div className="header-content">
            <span className="subtitle">Knowledge Base</span>
            <h1>Aprende Laravel 11 <span className="text-red">paso a paso</span></h1>
            <p>Explora nuestra documentación interactiva y domina el framework PHP más popular del mundo.</p>
            
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="¿Qué quieres aprender hoy? (Ej: Routing, Middleware...)" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-num">{temas.length}</span>
              <span className="stat-label">Módulos</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">v11</span>
              <span className="stat-label">Versión</span>
            </div>
          </div>
        </div>
      </header>

      {/* SECCIÓN DE CARDS */}
      <main className="container section-padding">
        <div className="list-header">
          <h3>Explorar Módulos ({temasFiltrados.length})</h3>
          <div className="filter-tags">
            <span className="tag active">Todos</span>
            <span className="tag">Backend</span>
            <span className="tag">Seguridad</span>
          </div>
        </div>

        {temasFiltrados.length > 0 ? (
          <div className="guia-grid-pro">
            {temasFiltrados.map(t => (
              <TemaCard key={t.id} tema={t} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No se encontraron temas que coincidan con "{busqueda}"</p>
          </div>
        )}
      </main>
    </div>
  );
}