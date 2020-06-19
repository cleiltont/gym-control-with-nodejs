const express = require('express');
const routes = express.Router();

const InstructorController = require('./src/controllers/InstructorController');
const MemberController = require('./src/controllers/MemberController');

const { age, date } = require('./lib');

/* -----	INSTRUCTORES	----- */
routes.get('/instructors', InstructorController.index);
routes.get('/instructors/create', (req, res) => {
	return res.render('instructors/create');
});
routes.post('/instructors', InstructorController.create);
routes.get('/instructors/:id', InstructorController.detail);
routes.get('/instructors/:id/edit', (req, res) => {
	const { id } = req.params;

	return res.render('instructors/edit', { instructor: 'nops' });
});
routes.put('/instructors', InstructorController.edit);
routes.delete('/instructors', InstructorController.delete);


/* -----	MEMBERS	----- */
routes.get('/members', MemberController.index);
routes.get('/members/create', (req, res) => {
	return res.render('members/create');
});
routes.post('/members', MemberController.create);
routes.get('/members/:id', MemberController.detail);
routes.get('/members/:id/edit', (req, res) => {
	const { id } = req.params;

	return res.render('members/edit', { member: 'nops' });
});
routes.put('/members', MemberController.edit);
// Delete
routes.delete('/members', MemberController.delete);


module.exports = routes;