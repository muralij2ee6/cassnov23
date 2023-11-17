const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// const pool = new Pool({
//     user: 'vin_kumarakulasinkam',
//     host: '54.149.232.176',
//     database: 'vin_kumarakulasinkam',
//     password: 'Gcqc7bSQgbwp6ubE',
//     port: 5432,
// });

// new linegfd

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/', function (req, res) {
    res.send('{ "response": "default page" }');
});

app.get('/hello', function (req, res) {
    res.send('{ "response": "Hello World" }');
});

app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});

app.get('/tablenames', async (req, res) => {
    try {
        // Connect to the database and execute a query
        const result = await pool.query('SELECT table_name FROM information_schema.tables');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred: ', err);
    }
});

app.post('/add-automobile', async (req, res) => {
  const { color, make, model, vin, model_year } = req.body;

  try {
      const insertDataQuery = `
          INSERT INTO automobiles (color, make, model, vin, model_year)
          VALUES ($1, $2, $3, $4, $5)
      `;

      // Inserting data into the PostgreSQL database
      await pool.query(insertDataQuery, [color, make, model, vin, model_year]);
      res.status(201).send('Automobile added successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error while adding automobile');
  }
});

app.get('/autos', async (req, res) => {
    try {
        // Connect to the database and execute a query
        const result = await pool.query('SELECT * FROM automobiles');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred: ', err);
    }
});

app.post('/start', async (req, res) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS automobiles (
        id SERIAL PRIMARY KEY,
        color VARCHAR(255),
        make VARCHAR(255),
        model VARCHAR(255),
        owner_name VARCHAR(255),
        purchase_date TIMESTAMP,
        vin VARCHAR(255),
        model_year INT
      );
    `;

    const insertDataQuery = `
      INSERT INTO automobiles (color, make, model, vin, model_year)
      VALUES
      ('Blue','Nissan','Rogue','AA325B2018',2018),
      ('Silver','Honda','Accord','HH256B2010',2010),
      ('Gold','Chevrolet','S10','CH123G2001',2001),
      ('Gold','Ford','Windstar','FO123G1990',1990),
      ('Blue','Ford','Mustang','FO20236B1967',1967);
    `;

    try {
      await pool.query(createTableQuery);
      await pool.query(insertDataQuery);
      res.send('Table created and data inserted successfully.');
    } catch (error) {
      res.status(500).send('Error in database operation: ' + error.message);
    }
  });

app.listen(process.env.PORT || 8080);
module.exports = app;