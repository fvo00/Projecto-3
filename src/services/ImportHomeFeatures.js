export const getHomeFeatures = async () => {
  try {
    const response = await fetch('/data/HomFeatures.json');
    if (!response.ok) {
      throw new Error('No se pudieron cargar las características de la Home');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en homeService:", error);
    return [];
  }
};