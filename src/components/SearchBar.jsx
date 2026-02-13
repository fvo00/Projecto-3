export function SearchBar({ onSearch, onFilter }) {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Buscar receta..." 
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select className="filter-select" onChange={(e) => onFilter(e.target.value)}>
        <option value="">Todos los tags</option>
        <option value="eloquent">Eloquent</option>
        <option value="auth">Auth</option>
        <option value="api">API</option>
      </select>
    </div>
  );
}