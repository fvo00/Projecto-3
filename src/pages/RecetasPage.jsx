import { useState, useEffect } from 'react';
import { getRecetas } from '../services/ImportRecetas';

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [tagFiltro, setTagFiltro] = useState("");

  useEffect(() => {
    const fetchRecetas = async () => {
      const data = await getRecetas();
      setRecetas(data);
    };
    fetchRecetas();
  }, []);

  const tagsDisponibles = ["api", "auth", "eloquent", "validation", "blade"];

  const recetasFiltradas = recetas.filter(receta => {
    const coincideBusqueda = receta.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTag = tagFiltro === "" || receta.tags.includes(tagFiltro);
    return coincideBusqueda && coincideTag;
  });

  return (
    <div className="cookbook-wrapper">
      {/* HEADER ESTILO COOKBOOK */}
      <header className="cookbook-header">
        <div className="container">
          <span className="chef-icon">🍳</span>
          <h1>Laravel <span className="text-highlight">Cookbook</span></h1>
          <p>Soluciones rápidas y snippets de código listos para copiar y pegar.</p>
          
          <div className="filters-row">
            <div className="search-box-modern">
              <input 
                type="text" 
                placeholder="Buscar solución rápida..." 
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="tag-filters">
              <button 
                className={`tag-btn ${tagFiltro === "" ? 'active' : ''}`}
                onClick={() => setTagFiltro("")}
              >
                Todos
              </button>
              {tagsDisponibles.map(tag => (
                <button 
                  key={tag}
                  className={`tag-btn ${tagFiltro === tag ? 'active' : ''}`}
                  onClick={() => setTagFiltro(tag)}
                >
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* GRID DE RECETAS */}
      <main className="container recipes-grid">
        {recetasFiltradas.map(receta => (
          <article key={receta.id} className="recipe-card">
            <div className="recipe-badge">Snippet</div>
            <div className="recipe-content">
              <div className="recipe-tags">
                {receta.tags.map(tag => <span key={tag} className={`mini-tag ${tag}`}>{tag}</span>)}
              </div>
              <h3>{receta.titulo}</h3>
              <p className="recipe-steps">{receta.pasos}</p>
              
              <div className="code-window-mini">
                <div className="code-lang-label">php</div>
                <pre>
                  <code>{receta.codigo}</code>
                </pre>
              </div>
            </div>
            <div className="recipe-footer">
              <button className="copy-recipe-btn" onClick={() => navigator.clipboard.writeText(receta.codigo)}>
                Copiar Código 📋
              </button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}