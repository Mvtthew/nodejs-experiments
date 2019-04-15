// Routes for `/api/` endpoint

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/todos', (req, res) => {
	Todo.findAll()
	.then(todos => res.json(todos))
	.catch(err => console.error('Error:', err));
});

router.post('/todo', (req, res) => {

	const content = req.body.content;

	Todo.create({
		content
	}).then(created => res.json(created));

});

module.exports = router;