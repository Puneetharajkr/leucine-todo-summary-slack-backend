const express = require('express');
const router = express.Router();

const {
  getTodos,
  addTodo,
  deleteTodo
} = require('../controllers/todos'); // only todo controllers

const { summarizeTodos } = require('../controllers/summary'); // separate summary controller

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.post('/summarize', summarizeTodos);

module.exports = router;
