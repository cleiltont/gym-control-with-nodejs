const { age, date } = require('../../lib');

const MemberController = {
	index: (req, res) => {

		return ;
	},
	// Create
	create: (req, res) => {
		const keys = Object.keys(req.body);

		for(key of keys){
			if(req.body[key].trim() === ""){
				return res.send('Preencha todos os campos corretamente');
			}
		}
		return ;
	},
	// Detail
	detail: (req, res) => {
		const { id } = req.params;

		return ;
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

		return ;
	},
	// Delete
	delete: (req, res) => {
	const { id } = req.body;

	return res.redirect('/members');
	}
}

module.exports = MemberController;