import { Link } from "react-router-dom";
import "../index.css";

export const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>Job Tracker</h1>
            <ul>
                <li><Link to="/">Ver vagas</Link></li>
                <li>|</li>
                <li><Link to="/about">Sobre</Link></li>
            </ul>
        </nav>
    );
};