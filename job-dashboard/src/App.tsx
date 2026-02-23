import { useState, useEffect } from 'react';
import { getVagas } from './services/api';
import type { Job } from './types/Job';
import { JobCard } from './components/JobCard';
import './App.css';

const TERMOS_PADRAO = ['React', 'Nodejs', 'Frontend', 'Remote'];

export function App() {
  const [busca, setBusca] = useState('');
  const [vagas, setVagas] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarVagasIniciais = async () => {
    setLoading(true);
    try {
      const promessas = TERMOS_PADRAO.map(termo => getVagas(termo));
      const resultados = await Promise.all(promessas);
      const todasVagas = resultados.flatMap(res => res.data);
      const vagasUnicas = todasVagas.filter((vaga, index, self) =>
        index === self.findIndex((v) => v.link === vaga.link)
      );
      setVagas(vagasUnicas);
    } catch (error) {
      console.error("Erro na carga inicial:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVagasIniciais();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!busca) return;
    setLoading(true);
    try {
      const response = await getVagas(busca);
      setVagas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="Pesquisar outro cargo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)} 
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <div className="loader">Carregando vagas...</div>}

      <div className="jobs-grid">
        {!loading && vagas.map((vaga, index) => (
          <JobCard key={vaga._id || index} job={vaga} />
        ))}
      </div>
    </div>
  );
}

export default App;