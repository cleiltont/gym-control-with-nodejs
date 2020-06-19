const { age, date } = require('../../lib');
const connection = require('../database/connection');

const InstructorController = {
	index: (req, res) => {

		connection.query('SELECT * FROM instructors', async (err, results) => {
			if(err) return await res.send('Erro no banco de dados');

			return await res.render('instructors/index', { instructors: results.rows });
		});
	},
	create: (req, res) => {
		const keys = Object.keys(req.body);

		for(key of keys){
			if(req.body[key].trim() === ""){
				return res.send('Preencha todos os campos corretamente');
			}
		}

		let { avatar_url, name, birth, gender, services} = req.body;

		const query = `
			INSERT INTO instructors (
				avatar_url,
				name,
				birth,
				gender,
				services,
				created_at
			) VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id
		`;

		const values = [
			avatar_url,
			name,
			date(birth).iso,
			gender,
			services,
			date(Date.now()).iso
		];

		connection.query(query, values, (err, results) => {
			if(err) return res.alerta('Erro no banco de dados');

			return res.redirect(`instructors/${results.rows[0].id}`);
		});
		return;
	},
	// Detail
	detail: (req, res) => {
		const { id } = req.params;

		connection.query(`
			SELECT * FROM instructors WHERE id = $1`, 
			[id],
			(err, results) => {
				if(err) return res.send('Erro no banco de dados');

				const instructor = {
					...results.rows[0],
					age: age(results.rows[0].birth),
					created_at: date(results.rows[0].created_at).iso,
					services: results.rows[0].services.split(',')
				}

				return res.render('instructors/detail', { instructor });
			}
		);
	},
	// Edit
	edit: (req, res) => {
		const { id } = req.body;
		const keys = Object.keys(req.body);

		for(key of keys){
			if(req.body[key].trim() === ""){
				return res.send('Preencha todos os campos corretamente');
			}
		}

		const values = [
			keys.avatar_url,
			keys.name,
			keys.birth,
			keys.gender,
			keys.services,
			id,
		];

		connection.query(`
			UPDATE instructors SET
			avatar_url=($1),
			name=($2),
			birth=($3),
			gender=($4),
			services=($5)
			WHERW id = $6
		`);

	},
	// Delete
	delete: (req, res) => {
	const { id } = req.body;

	return
	}
}

module.exports = InstructorController;