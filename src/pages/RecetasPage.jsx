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

  const recetasFiltradas = recetas.filter(receta => {
    const coincideBusqueda = receta.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTag = tagFiltro === "" || receta.tags.includes(tagFiltro);
    return coincideBusqueda && coincideTag;
  });

  return (
    <div className="container">
      <h2 className="section-title">Laravel Cookbook</h2>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Buscar receta..." 
          className="search-input"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select className="filter-select" onChange={(e) => setTagFiltro(e.target.value)}>
          <option value="">Todos los tags</option>
          <option value="api">API</option>
          <option value="auth">Auth</option>
          <option value="eloquent">Eloquent</option>
          <option value="validation">Validation</option>
        </select>
      </div>

      <div className="grid">
        {recetasFiltradas.map(receta => (
          <div key={receta.id} className="card">
            <div className="tag-group">
              {receta.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
            <h3>{receta.titulo}</h3>
            <p>{receta.pasos}</p>
            <pre className="code-block">
              <code>{receta.codigo}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
