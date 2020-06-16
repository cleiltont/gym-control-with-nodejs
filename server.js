// Configurando servidor
const express = require('express');
const server = express();

const methodOverride = require('method-override');

server.use(methodOverride('_method'));

// Importando rotas
const routes = require('./routes');

// Configurando servidor para aprensentar aqruivos extras
server.use(express.static('public'));

// Habilitando body do formulario
server.use(express.urlencoded( { extended: true } ));

// Configurando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('views', { express: server, noCache: true, });

server.set('view engine', 'html');

// Configurando apresentação da pagina
server.use(routes);

// Ligando o servidor e permitindo acesso a porta 3000
server.listen(3333);