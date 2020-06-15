const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
	return res.redirect('/instructors');
});

routes.get('/instructors', (req, res) => {
	return res.render('instructors/index.html', { title: 'Ola' });
});

routes.get('/members', (req, res) => {
	return res.render('members/index.html', { title: 'Ola' });
});

module.exports = routes;