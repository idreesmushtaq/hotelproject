const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to the SQLite database (file-based)
const db = new sqlite3.Database('restaurant.db');

// ... Create tables and handle POST requests as before ...
// Example table creation queries
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      message TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating contacts table:', err.message);
        } else {
            console.log('Contacts table created successfully');
        }
    });
});

// Handle GET requests for reservations
app.get('/api/reservations', (req, res) => {
    db.all('SELECT * FROM reservations', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error fetching reservations');
        } else {
            res.json(rows);
        }
    });
});

// Handle GET requests for contact messages
app.get('/api/contacts', (req, res) => {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
        if (err) {
            console.error(err.message); // Log the error message
            res.status(500).send('Error fetching contact messages');
        } else {
            res.json(rows);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});