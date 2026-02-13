export const getRecetas = async () => {
  try {
    const response = await fetch('/data/recetas.json');
    if (!response.ok) {
      throw new Error('Error al cargar las recetas');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
