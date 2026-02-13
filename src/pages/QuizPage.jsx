import { useState, useEffect } from 'react';
import { getPreguntas } from '../services/ImportPreguntas';

export default function Quiz() {
  const [preguntas, setPreguntas] = useState([]); 
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [cargando, setCargando] = useState(true); 

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getPreguntas();
        setPreguntas(data);
      } catch (error) {
        console.error("Error en el componente:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  
  if (cargando) {
    return <div className="container">Cargando cuestionario...</div>;
  }


  if (!preguntas || preguntas.length === 0) {
    return <div className="container">No se han podido cargar las preguntas. Revisa la consola.</div>;
  }

  const preguntaActual = preguntas[indice];

  const manejarRespuesta = (esCorrecta) => {
    if (esCorrecta) setPuntos(puntos + 1);
    const siguiente = indice + 1;
    if (siguiente < preguntas.length) {
      setIndice(siguiente);
    } else {
      setFinalizado(true);
    }
  };

  return (
    <div className="container">
      <div className="quiz-box">
        {!finalizado ? (
          <>
            <div className="quiz-header">
              <h3>Pregunta {indice + 1} de {preguntas.length}</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((indice + 1) / preguntas.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className="quiz-question">{preguntaActual.pregunta}</p>
            
            <div className="options-grid">
              {preguntaActual.opciones?.map((opcion, i) => (
                <button 
                  key={i} 
                  className="answer-btn"
                  onClick={() => manejarRespuesta(i === preguntaActual.correcta)}
                >
                  {opcion}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="quiz-result">
            <h2>¡Quiz Finalizado!</h2>
            <p className="score-text">{puntos} / {preguntas.length}</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}