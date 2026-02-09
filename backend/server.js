const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

// Add sales record
app.post('/api/sales', async (req, res) => {
  const { product, quantity, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO daily_sales(product, quantity, price) VALUES($1, $2, $3) RETURNING *',
      [product, quantity, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sales
app.get('/api/sales', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM daily_sales ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Daily total
app.get('/api/sales/total', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT SUM(quantity * price) AS total_sales FROM daily_sales WHERE date = CURRENT_DATE'
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));