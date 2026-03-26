import axios from 'axios';

export const fetchJobicyJobs = async (cargo) => {
    try {
        const url = `https://jobicy.com/api/v2/remote-jobs`;
        
        const response = await axios.get(url, {
            params: {
                count: 20,
                geo: "brazil" // focar em vagas que aceitam candidatos do Brasil
            }
        });

        const allJobs = response.data.jobs || [];

        // filtrar o array que retorna para bater com o 'cargo'
        return allJobs
            .filter(job => job.jobTitle.toLowerCase().includes(cargo.toLowerCase()))
            .map((job) => ({
                termoBusca: cargo.toLowerCase(),
                titulo: job.jobTitle,
                empresa: job.companyName,
                local: job.jobGeo || "Remote",
                link: job.url,
                logo: job.companyLogo,
                fonte: "Jobicy",
            }));
    } catch (error) {
        console.error("Erro na Jobicy API:", error.message);
        return [];
    }
};

export default { fetchJobicyJobs };