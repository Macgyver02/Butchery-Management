// server.js
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'butchery',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware
app.use(express.json());

// Routes
// Get all products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, description, price, stock } = req.body;
  const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, description, price, stock], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, name, description, price, stock });
  });
});

// Get a specific product
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(results[0]);
  });
});

// Update a product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?';
  connection.query(query, [name, description, price, stock, id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ id, name, description, price, stock });
  });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.sendStatus(204);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});