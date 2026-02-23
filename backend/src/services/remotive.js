import axios from "axios";

export const fetchRemotiveJobs = async (cargo) => {
    try {
        const url = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(cargo)}`;
        const response = await axios.get(url);

        const jobs = response.data.jobs || [];

        return jobs.map((job) => ({
            termoBusca: cargo.toLowerCase(),
            titulo: job.title,
            empresa: job.company_name,
            local: "Remoto",
            link: job.url,
            logo: job.company_logo,
            fonte: "Remotive",
        }));
    } catch (error) {
        console.error("Erro na Remotive API:", error.message);
        return [];
    }
};

export default { fetchRemotiveJobs };