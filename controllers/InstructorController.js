const fs = require('fs');
const data = require('../data.json');

const InstructorController = {
	index: (req, res) => {
		if(req.method === 'POST'){
			const keys = Object.keys(req.body);
	
			for(key of keys){
				if(req.body[key].trim() === ""){
					return res.send('Preencha todos os campos corretamente');
				}
			}

			req.body.birth = Date.parse(req.body.birth);
			req.body.created_at = Date.now();
			req.body.id = Number(data.instructors.length + 1);

			data.instructors.push(req.body);

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
}

module.exports = InstructorController;