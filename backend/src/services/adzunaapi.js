import axios from "axios";

export const fetchAdzunaJobs = async (cargo) => {
    const APP_ID = process.env.APP_ID;
    const APP_KEY = process.env.APP_KEY;
    
    try {
        // A Adzuna exige a página na URL antes dos parâmetros de busca
        const url = `https://api.adzuna.com/v1/api/jobs/br/search/1`;
        
        const response = await axios.get(url, {
            params: {
                app_id: APP_ID,
                app_key: APP_KEY,
                what: cargo,
                content_type: "application/json"
            }
        });

        // Na Adzuna, os dados vêm em 'results'
        const jobs = response.data.results || [];

        return jobs.map((job) => ({
            termoBusca: cargo.toLowerCase(),
            titulo: job.title.replace(/<\/?[^>]+(>|$)/g, ""), // Limpa tags HTML que a Adzuna envia
            empresa: job.company.display_name,
            local: job.location.display_name,
            link: job.redirect_url,
            logo: null, // A Adzuna raramente fornece logo diretamente
            fonte: "Adzuna",
        }));
    } catch (error) {
        console.error("Erro na Adzuna API:", error.message);
        return [];
    }
};

export default { fetchAdzunaJobs };