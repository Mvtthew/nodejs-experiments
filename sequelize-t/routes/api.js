// Routes for `/api/` endpoint

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');

validateToken = (req, res, next) => {
	
	const header = req.headers['authorization'];
	
	if(typeof(header) !== "undefined") {
		
		const bearer = header.split(' ');
		
		req.token = bearer[1];
		next();
		
	} else {
		
		res.json({
			status: 403
		});
		
	}
	
}

// Get all todos
router.get('/todos', validateToken, (req, res) => {
	
	jwt.verify(req.token, 'secret', (err, authData) => {
		if (err) {
			res.json({
				status: 403
			});
		} else {
			
			Todo.findAll()
			.then(todos => res.json(authData))
			.catch(err => console.error('Error:', err));
			
		}
	});
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