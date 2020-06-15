// Configurando servidor
const express = require('express');
const server = express();

// Configurando servidor para aprensentar aqruivos extras
// server.use(express.static('public'));

// Habilitando body do formulario
// server.use(express.urlencoded( { extended: true } ));

// Configurando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', { express: server, noCache: true, });

// Configurando apresentação da pagina
server.get('/', (req, res) => {
	return res.render('index.html');
});

// Ligando o servidor e permitindo acesso a porta 3000
server.listen(3333);