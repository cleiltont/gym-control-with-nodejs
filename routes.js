const express = require('express');
const routes = express.Router();

const InstructorController = require('./controllers/InstructorController');
const MemberController = require('./controllers/MemberController');

const data = require('./data.json');
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

	const foundMember = 
		data.members.find(member => id == member.id );
	
	if(!foundMember) return res.send('Instrutor não encontrado');

	const member = {
		...foundMember,
		birth: date(foundMember.birth)
	};

	return res.render('members/edit', { member });
});
routes.put('/members', MemberController.edit);
// Delete
routes.delete('/members', MemberController.delete);


module.exports = routes;