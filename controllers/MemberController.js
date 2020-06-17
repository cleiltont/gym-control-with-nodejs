const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../lib');

const MemberController = {
	index: (req, res) => {

		return res.render('members/index', { members: data.members });
	},
	// Create
	create: (req, res) => {
		const keys = Object.keys(req.body);

		for(key of keys){
			if(req.body[key].trim() === ""){
				return res.send('Preencha todos os campos corretamente');
			}
		}

		birth = Date.parse(req.body.birth);

		let id = 1;
		
		const lastMember = data.members[data.members.length - 1];

		if(lastMember){
			id = lastMember.id + 1;
		}

		data.members.push({
			id,
			...req.body,
			birth,
		});

		fs.writeFile('data.json', JSON.stringify(data, null, 1), err => {
			if(err) return res.send('Erro na escrita!');

			return res.redirect(`/members/${id}`);
		});
	},
	// Detail
	detail: (req, res) => {
		const { id } = req.params;

		const foundMember = 
			data.members.find(member => id == member.id );
		
		if(!foundMember) return res.send('Membro não encontrado');

		const member = {
			...foundMember,
			age: age(foundMember.birth),
		};

		return res.render('members/detail', { member });
	},
	// Edit
	edit: (req, res) => {
		const { id } = req.body;

		const foundMember = data.members.find(member => 
			id == member.id);
		
			if(!foundMember) return res.send('Membro não encontrado');
		
		const member = {
			...foundMember,
			...req.body,
			birth: Date.parse(req.body.birth),
		}

		data.members[id - 1] = member;

		fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
			if(err) return res.send('Erro de escrita');

			return res.redirect(`members/${id}`);
		});
	},
	// Delete
	delete: (req, res) => {
	const { id } = req.body;

	const filteredMember = data.members.filter( member => 
			member.id != id
		);
	
	data.members = filteredMember;

	fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
		if(err) return res.send('Erro na escrita');

		return res.redirect('/members');
	});
	}
}

module.exports = MemberController;