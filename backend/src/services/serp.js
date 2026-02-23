import { getJson } from "serpapi";
import { serpApiDefaults } from "../config/filters.js";

export const fetchSerpJobs = async (cargo) => {
    try {
        const response = await getJson({
            ...serpApiDefaults,
            q: cargo,
            api_key: process.env.SERPAPI_KEY,
        });

        const jobs = response.jobs_results || [];

        return jobs.map((job) => ({
            termoBusca: cargo.toLowerCase(),
            titulo: job.title,
            empresa: job.company_name,
            local: job.location || "Não especificado",
            link: job.related_links?.[0]?.link || "#",
            logo: job.thumbnail,
            fonte: "SerpApi (Google)",
        }));
    } catch (error) {
        console.error("Erro na SerpApi:", error.message);
        return [];
    }
};

export default { fetchSerpJobs };