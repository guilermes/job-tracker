import { Schema, model } from 'mongoose';

export const VagaSchema = new Schema({
    termoBusca: { type: String, index: true, required: true },
    titulo: { type: String, required: true },
    empresa: String,
    local: String,
    link: { type: String, required: true },
    logo: String,
    fonte: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // O MongoDB deletará o registro automaticamente após 24h
    }
});

export default model('Vaga', VagaSchema);