const express = require('express');
const server = express();

server.use(express.static('public'));

const nunjuscks = require('nunjucks');

server.use(express.urlencoded( { extended: true } ));

nunjuscks.configure('./', {
	express: server,
	noCache: true
});

server.get('/', (req, res) => {
	const nome = 'Nenzim';
	return res.render('index.html', { nome });
});

server.listen(3333);