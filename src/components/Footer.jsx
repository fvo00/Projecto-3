import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h4 className="footer-logo">Laravel<span>Hub</span></h4>
          <p>Recursos técnicos y guía de aprendizaje para desarrolladores PHP/Laravel en ASIX.</p>
        </div>

        <div className="footer-section">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/guia">Guía Técnica</Link></li>
            <li><Link to="/recetas">Cookbook</Link></li>
            <li><Link to="/quiz">Prueba de Nivel</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Autor</h4>
          <p>Desarrollado por <strong>Fernando Villanueva Ortiz</strong></p>
          <p>IAW - 2º ASIX - 2026</p>
          <div className="social-links">
             <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
             <a href="https://laravel.com" target="_blank" rel="noreferrer">Laravel Docs</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Proyecto Final Laravel. Entorno de Aplicaciones Web.</p>
      </div>
    </footer>
  );
}