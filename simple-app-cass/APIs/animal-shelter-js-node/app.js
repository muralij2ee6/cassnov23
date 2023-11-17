const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

require('dotenv').config();

console.log('database type = ', process.env)

const app = express();
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let animalsData = []; // In-memory data storage

if (process.env.DB_TYPE === 'mysql') {
  // MySQL connection pool
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  animalsData = pool; // Set the MySQL connection pool as the data storage
}

// Swagger definition and other code...

// Animals API routes...

app.get('/animals', async (req, res) => {
  try {
    if (process.env.DB_TYPE === 'mysql') {
      const connection = await animalsData.getConnection();

      const [rows] = await connection.query('SELECT * FROM animals');

      connection.release();

      res.json(rows);
    } else {
      res.json(animalsData);
    }
  } catch (error) {
    console.error('Error retrieving animals:', error);
    res.status(500).json({ error: 'Failed to retrieve animals' });
  }
});

app.post('/animals', async (req, res) => {
  try {
    const { name, type, description, birthdate } = req.body;

    if (process.env.DB_TYPE === 'mysql') {
      const connection = await animalsData.getConnection();

      const [result] = await connection.query(
        'INSERT INTO animals (name, type, description, birthdate) VALUES (?, ?, ?, ?)',
        [name, type, description, birthdate]
      );

      const insertedId = result.insertId;

      const [insertedRow] = await connection.query('SELECT * FROM animals WHERE id = ?', [insertedId]);

      connection.release();

      res.json(insertedRow);
    } else {
      const newAnimal = { name, type, description, birthdate };
      animalsData.push(newAnimal);
      res.json(newAnimal);
    }
  } catch (error) {
    console.error('Error adding animal:', error);
    res.status(500).json({ error: 'Failed to add animal' });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
