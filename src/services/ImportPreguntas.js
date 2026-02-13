export const getPreguntas = async () => {
  try {
    const response = await fetch('/data/preguntas.json');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
   
    return Array.isArray(data) ? data : [];
    
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    return [];
  }
};