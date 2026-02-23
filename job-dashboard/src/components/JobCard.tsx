import type { Job } from '../types/Job.ts';

interface JobCardProps {
    job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
    return (
        <div className="job-card">
            <div className="job-main-container">
                {/* Coluna Esquerda: Logo, Local e Fonte */}
                <div className="job-left-column">
                    {job.logo && (
                        <img src={job.logo} alt={job.empresa} className="company-logo" />
                    )}
                    <div className="job-meta-info">
                        <span className="location">📍 {job.local}</span>
                        <span className="source-tag">{job.fonte}</span>
                    </div>
                </div>

                {/* Coluna Direita: Conteúdo e Link/Botão */}
                <div className="job-right-column">
                    <div className="job-title-group">
                        <h3>{job.titulo}</h3>
                        <p className="company-name">{job.empresa}</p>
                    </div>
                    
                    {/* Tag <a> estilizada como botão */}
                    <a 
                        href={job.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="apply-button-link"
                    >
                        Ver vaga
                    </a>
                </div>
            </div>
        </div>
    );
};