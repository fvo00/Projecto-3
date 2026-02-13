import { useState, useEffect } from 'react';
import { TemaCard } from '../components/TemaCard';
import { getTemas } from '../services/ImportTemas'; // import del servicio

export default function Guia() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    const fetchTemas = async () => {
      const data = await getTemas();
      setTemas(data);
    };
    fetchTemas();
  }, []);

  return (
    <div className="container">
      <h2 className="section-title">Guía Técnica Laravel</h2>
      <div className="grid">
        {temas.map(t => (
          <TemaCard key={t.id} tema={t} />
        ))}
      </div>
    </div>
  );
}
