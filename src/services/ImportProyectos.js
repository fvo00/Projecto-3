export const getProyectos = async () => {
  try {
    const response = await fetch('/data/proyectos.json');
    if (!response.ok) {
      throw new Error('Error al cargar los proyectos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
