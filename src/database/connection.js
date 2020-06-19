const { Pool } = require('pg');

const connection = new Pool({
	user: 'postgres',
	password: '071627',
	host: 'localhost',
	port: 5432,
	database: 'gymmanager'
});

module.exports = connection;