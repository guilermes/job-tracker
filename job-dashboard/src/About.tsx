import "./index.css";

export function About() {
    return (
        <div className="sobre">
            <header>
                <h1>Sobre o projeto:</h1>
            </header>
            <p>&nbsp;&nbsp;Sou desenvolvedor Full Stack e aluno de Desenvolvimento de Software Multiplataforma na FATEC Votorantim.
                Este projeto é um estudo prático para aprofundar meus conhecimentos no ecossistema JavaScript.
                <p>&nbsp;&nbsp;O foco principal foi o desenvolvimento de uma aplicação end-to-end, abrangendo:</p>
                <ul>
                    <li><strong>Backend</strong>: Construção de uma API robusta em Node.js e integração com banco de dados.</li>
                    <li><strong>Frontend</strong>: Interface dinâmica e responsiva utilizando React.</li>
                    <li><strong>Integração</strong>: Consumo eficiente de dados e gerenciamento de estado entre cliente e servidor.</li>
                </ul>
            </p>
        </div>
    );
};

export default About;