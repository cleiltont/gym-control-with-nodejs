const express = require('express');
const routes = express.Router();

const InstructorController = require('./controllers/InstructorController');
const MemberController = require('./controllers/MemberController');

const data = require('./data.json');
const { age, date } = require('./lib');

// Index
routes.get('/instructors', InstructorController.index);

// Create
routes.get('/instructors/create', (req, res) => {
	return res.render('instructors/create');
});
routes.post('/instructors', InstructorController.create);

// Detail
routes.get('/instructors/:id', InstructorController.detail);

// Edit
routes.get('/instructors/:id/edit', (req, res) => {
	const { id } = req.params;

	const foundInstructor = 
		data.instructors.find(instructor => id == instructor.id );
	
	if(!foundInstructor) return res.send('Instrutor não encontrado');

	const instructor = {
		...foundInstructor,
		birth: date(foundInstructor.birth)
	};

	return res.render('instructors/edit', { instructor });
});
routes.put('/instructors', InstructorController.edit);

// Delete
routes.delete('/instructors', InstructorController.delete);


// Page members
routes.get('/members', (req, res) => {
	return res.render('members/index.html');
});

module.exports = routes;