import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("leads.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    interest TEXT,
    price TEXT,
    urgency TEXT DEFAULT 'BAIXA',
    status TEXT DEFAULT 'PENDENTE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    details TEXT
  )
`);

// Simple migration check for new columns
const tableInfo = db.prepare("PRAGMA table_info(leads)").all() as any[];
const columns = tableInfo.map(c => c.name);
if (!columns.includes('phone')) db.exec("ALTER TABLE leads ADD COLUMN phone TEXT");
if (!columns.includes('price')) db.exec("ALTER TABLE leads ADD COLUMN price TEXT");
if (!columns.includes('urgency')) db.exec("ALTER TABLE leads ADD COLUMN urgency TEXT DEFAULT 'BAIXA'");
if (!columns.includes('details')) db.exec("ALTER TABLE leads ADD COLUMN details TEXT");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/leads", (req, res) => {
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.post("/api/leads", (req, res) => {
    const { name, phone, interest, price, urgency, details, status } = req.body;
    try {
      const info = db.prepare(`
        INSERT INTO leads (name, phone, interest, price, urgency, details, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        name || 'Paciente Anônimo', 
        phone || 'Não informado', 
        interest || 'Consulta Geral', 
        price || 'Sob consulta', 
        urgency || 'BAIXA', 
        details || '',
        status || 'PENDENTE'
      );
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.patch("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM leads WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
