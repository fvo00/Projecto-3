export const getTemas = async () => {
  try {
    const response = await fetch('/data/temas.json');
    if (!response.ok) {
      throw new Error('Error al cargar los temas');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
