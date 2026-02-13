import { Link } from "react-router-dom";


function Navbar(){


    return(
        <nav className="navbar">
      <div className="logo">Laravel Learning Hub</div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/guia">Guía Técnica</Link></li>
        <li><Link to="/recetas">Cookbook</Link></li>
        <li><Link to="/proyectos">Proyectos</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
      </ul>
    </nav>
    );

   

}

export default Navbar;