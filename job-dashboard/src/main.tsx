import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App' // Sua página de vagas
import About from "./About.tsx"
import { NavBar } from "./components/NavBar.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar /> {/* NavBar agora está SEGURO dentro do BrowserRouter */}
      <main className="content">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>
)