const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.POSTGRES_USER || "devops",
  password: process.env.POSTGRES_PASSWORD || "devops123",
  database: process.env.POSTGRES_DB || "tasksdb"
});

async function initDb() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            done BOOLEAN DEFAULT FALSE
        );
    `);
}

// Initialiser la DB avant d'exporter l'app
initDb().catch((error) => {
    console.error("Erreur de connexion à PostgreSQL :", error);
    process.exit(1);
});

app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "API en bonne santé" });
});

app.get("/version", (req, res) => {
    res.json({ version: "1.0.0" });
});

app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la lecture des tâches" });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;
        const result = await pool.query(
            "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
            [title, false]
        );
        res.status(201).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la tâche" });
    }
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`API démarrée sur http://localhost:${port}`);
    });
}

module.exports = app;