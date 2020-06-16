const fs = require('fs');
const data = require('../data.json');
const { age } = require('../lib');

const InstructorController = {
	index: (req, res) => {
		if(req.method === 'POST'){
			const keys = Object.keys(req.body);
	
			for(key of keys){
				if(req.body[key].trim() === ""){
					return res.send('Preencha todos os campos corretamente');
				}
			}

			let { avatar_url, birth, name, services, gender } = req.body;


			birth = Date.parse(req.body.birth);
			const created_at = Date.now();
			const id = Number(data.instructors.length + 1);


			data.instructors.push({
				id,
				avatar_url,
				name,
				birth,
				gender,
				services,
				created_at
			});

			fs.writeFile('data.json', JSON.stringify(data, null, 1), err => {
				if(err) return res.send('Erro na escrita!');

				return res.redirect('/instructors');
			});
		}
		return res.render('instructors/index');
	},
	create: (req, res) => {
		return res.render('instructors/create');
	},
	detail: (req, res) => {
		const { id } = req.params;

		const foundInstructor = 
			data.instructors.find(instructor => id == instructor.id );
		
		if(!foundInstructor) return res.send('Instrutor não encontrado');

		const instructor = {
			...foundInstructor,
			age: age(foundInstructor.birth),
			services: foundInstructor.services.split(','),
			created_at: Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
		};

		return res.render('instructors/detail', { instructor });
	},
	edit: (req, res) => {
		return res.render('instructors/edit');
	}
}

module.exports = InstructorController;