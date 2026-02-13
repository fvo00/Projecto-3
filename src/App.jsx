import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar';
import Home from './pages/HomePage';
import Guia from './pages/GuiaPage';
import Recetas from './pages/RecetasPage';
import Proyectos from './pages/ProyectoPage';
import GuiaDetalle from './pages/GuiaDetallePage';
import ProyectoDetalle from './pages/ProyectoDetalle';
import { Footer } from './components/Footer';
import Quiz from './pages/QuizPage';

function App() {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/guia' element={<Guia/>}/>
         <Route path='/guia/:id' element={<GuiaDetalle/>}/>
        <Route path='/recetas' element={<Recetas/>}/>
        <Route path='/proyectos' element={<Proyectos/>}/>
        <Route path='/proyectos/:id' element={<ProyectoDetalle/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
      </Routes>
      <Footer/>

    </Router>


  )

}

export default App
