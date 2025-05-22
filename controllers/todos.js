const { pool } = require('../config/db');

exports.getTodos = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM todos 
      ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch todos',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task || typeof task !== 'string') {
      return res.status(400).json({ error: 'Invalid task' });
    }

    const { rows } = await pool.query(
      `INSERT INTO todos (task) 
       VALUES ($1) 
       RETURNING *`,
      [task.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to add todo',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      'DELETE FROM todos WHERE id = $1', 
      [id]
    );
    
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to delete todo',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};