import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let db;

export async function connectMongo() {
    try {
        client = new MongoClient(uri);
        await client.connect();

        db = client.db(); // pega o banco da URI
        console.log("🍃 MongoDB conectado com MongoClient");

        return db;
    } catch (error) {
        console.error("❌ Erro ao conectar MongoDB:", error.message);
        process.exit(1);
    }
}

export function getDb() {
    if (!db) {
        throw new Error("MongoDB não conectado");
    }
    return db;
}
