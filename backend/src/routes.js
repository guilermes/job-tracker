import { Router } from 'express';
const router = Router();
import Vaga from './models/Vaga.js';
import { fetchSerpJobs } from './services/serp.js';
import { fetchRemotiveJobs } from './services/remotive.js';
import { fetchAdzunaJobs } from './services/adzunaapi.js';
import { fetchJobicyJobs } from './services/jobicyapi.js';

router.get('/vagas', async (req, res) => { // Removi o /api prefixo se o server já usa app.use('/api', routes)
    const { cargo } = req.query;

    if (!cargo) {
        return res.status(400).json({ error: "O parâmetro 'cargo' é obrigatório." });
    }

    const termo = cargo.toLowerCase();

    try {
        // 1. Check Banco de Dados (Cache)
        const cacheVagas = await Vaga.find({ termoBusca: termo });

        if (cacheVagas.length > 0) {
            console.log(`📦 Servindo "${termo}" via Cache`);
            return res.json({ source: 'cache', data: cacheVagas });
        }

        console.log(`🔍 Buscando "${termo}" nas APIs externas...`);

        // 2. Busca em todas as APIs simultaneamente
        const resultados = await Promise.allSettled([
            fetchSerpJobs(cargo),
            fetchRemotiveJobs(cargo),
            fetchAdzunaJobs(cargo),
            fetchJobicyJobs(cargo)
        ]);
        
        // 3. Extrai apenas os valores das promessas que foram resolvidas (fulfilled)
        // O .flat() serve para juntar os arrays de cada API em um único arrayzão
        const todasVagasRaw = resultados
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value)
            .flat();

        // 4. Mapear e garantir que o termoBusca esteja correto
        const todasVagas = todasVagasRaw.map(vaga => ({
            ...vaga,
            termoBusca: termo 
        }));

        // 5. Salva no banco (apenas se houver resultados)
        if (todasVagas.length > 0) {
            try {
                // ordered: false é ótimo aqui para não travar se houver duplicata de ID (se você usar um)
                await Vaga.insertMany(todasVagas, { ordered: false }); 
                console.log(`✅ ${todasVagas.length} vagas salvas no banco.`);
            } catch (insertError) {
                // O MongoDB lança erro se houver duplicatas com 'unique: true', mas o ordered: false salva o resto
                console.warn("⚠️ Aviso: Algumas vagas já existiam no banco ou houve erro parcial na inserção.");
            }
        }

        res.json({ source: 'api', data: todasVagas });
    } catch (error) {
        console.error("❌ Erro na rota /vagas:", error);
        res.status(500).json({ error: "Erro interno no servidor", details: error.message });
    }
});

export default router;