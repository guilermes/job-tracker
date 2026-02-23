import { Router } from 'express';
const router = Router();
import Vaga from './models/Vaga.js';
import { fetchSerpJobs } from './services/serp.js';
import { fetchRemotiveJobs } from './services/remotive.js';

router.get('/vagas', async (req, res) => {
    const { cargo } = req.query;

    if (!cargo) {
        return res.status(400).json({ error: "O parâmetro 'cargo' é obrigatório." });
    }

    const termo = cargo.toLowerCase();

    try {
        // 1. Check Banco de Dados
        const cacheVagas = await Vaga.find({ termoBusca: termo });

        if (cacheVagas.length > 0) {
            console.log(`📦 Servindo ${termo} via Cache`);
            return res.json({ source: 'cache', data: cacheVagas });
        }

        // 2. Busca nas APIs
        const resultados = await Promise.allSettled([
            fetchSerpJobs(cargo),
            fetchRemotiveJobs(cargo)
        ]);
        
        const vagasSerp = resultados[0].status === 'fulfilled' ? resultados[0].value : [];
        const vagasRemotive = resultados[1].status === 'fulfilled' ? resultados[1].value : [];

        // 3. Mapear os resultados para incluir o termoBusca antes de salvar
        const todasVagas = [...vagasSerp, ...vagasRemotive].map(vaga => ({
            ...vaga,
            termoBusca: termo // Adiciona o termo para o filtro do find() funcionar na próxima vez
        }));

        // 4. Salva no banco (apenas se houver resultados)
        if (todasVagas.length > 0) {
            try {
                await Vaga.insertMany(todasVagas, { ordered: false }); 
                // ordered: false evita que o erro em uma vaga pare a inserção das outras
            } catch (insertError) {
                console.error("⚠️ Aviso: Algumas vagas já existiam no banco.");
            }
        }

        res.json({ source: 'api', data: todasVagas });
    } catch (error) {
        console.error("❌ Erro na rota /vagas:", error);
        res.status(500).json({ error: "Erro interno no servidor", details: error.message });
    }
});

export default router;