// Routes for `/api/` endpoint

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/todos', (req, res) => {
	Todo.findAll()
	.then(todos => res.json(todos))
	.catch(err => console.error('Error:', err));
});

// Create new todo
router.post('/todo', (req, res) => {
	
	const content = req.body.content;
	
	if (typeof(content) !== "undefined") {
		
		Todo.create({
			content
		}).then(created => res.json(created));
		
	} else {
		
		// Content value not sent
		res.json({
			message: 'content field is required, sir'
		});
		
	}
	
});

// Deleting todo
router.delete('/todo/:id', (req, res) => {
	
	Todo.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		res.json({
			message: 'todo destroyed'
		})
	});

});

module.exports = router;