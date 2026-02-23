import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import routes from './routes.js'; // Lembre-se do .js no final!

const app = express();

// Middlewares
app.use(cors()); // Importante para o seu frontend job-dashboard conseguir acessar
app.use(express.json());

console.log("Variável carregada:", process.env.MONGODB_URI);
// Conexão MongoDB com opções de tolerância a DNS
mongoose.connect(process.env.MONGODB_URI, {
    family: 4, // Força o Node a usar IPv4 (resolve muitos erros de conexão em redes domésticas)
})
    .then(() => console.log("🍃 MongoDB conectado com sucesso!"))
    .catch(err => {
        console.error("❌ Erro ao conectar MongoDB:");
        console.error(err.message);
    });
// Rotas
app.use('/', routes); // Seus endpoints começarão com /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});