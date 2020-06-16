const express = require('express');
const routes = express.Router();

const InstructorController = require('./controllers/InstructorController');
const MemberController = require('./controllers/MemberController');

// Layout
routes.get('/', (req, res) => res.render('layout'));

// Index
routes.get('/instructors', InstructorController.index);

// Create
routes.get('/instructors/create', InstructorController.create);
routes.post('/instructors/create', InstructorController.index);

// Detail
routes.get('/instructors/:id', InstructorController.detail);

// Edit
routes.get('/instructors/:id/edit', InstructorController.edit);



// Page members
routes.get('/members', (req, res) => {
	return res.render('members/index.html');
});

module.exports = routes;