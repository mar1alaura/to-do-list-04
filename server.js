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
