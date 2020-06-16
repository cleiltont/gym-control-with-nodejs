const express = require('express');
const routes = express.Router();

const InstructorController = require('./controllers/InstructorController');
const MemberController = require('./controllers/MemberController');

// Home page
routes.get('/', (req, res) => res.render('layout'));

// Page instructor
routes.get('/instructors', InstructorController.index);
routes.post('/instructors', InstructorController.index);
routes.get('/instructors/create', InstructorController.create);
routes.get('/instructors/:id', InstructorController.detail);

// Page members
routes.get('/members', (req, res) => {
	return res.render('members/index.html');
});

module.exports = routes;