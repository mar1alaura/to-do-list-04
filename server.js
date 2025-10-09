import sqlite3 from "sqlite3";
import { open } from "sqlite"
import express from "express"

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.static('public/'));

let db;

async function initDB() {
    db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });

    await db.run(`CREATE TABLE IF NOT EXIST tasks(
        id INTERGER PRIMARY KEY AUTOINCREMENT
        description TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )`);
    
}

app.get('/tasks', async(req, res) => {
const tasks = await db.all()
res.json(tasks)
});

app.post('/tasks', async(req, res) => {
    const  {description} = req.body;
    const stmt = await db.prepare(`INSERT INTO tasks (description) VALUE (?)`);
    await stmt.finalize();
    res.status(201).json({message: 'Task added'})
});

app.delete('/tasks', async(req, res) => {
    const { id } = req.params;
    await db.get(`SELECT * FROM tasks WHERE id = ?` , id);
    res.status(204).send();

})