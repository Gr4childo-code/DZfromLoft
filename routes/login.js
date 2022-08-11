import { Router } from 'express';
import Jwt from 'jsonwebtoken';
import fs from 'fs';
import accessTokenSecret from '../app.js';
const LoginRouter = Router();

LoginRouter.get('/', (req, res, next) => {
	res.render('pages/login', { title: 'SigIn page' });
});

LoginRouter.post('/', (req, res, next) => {
	const { email, password } = req.body;
	let dataObj;
	const jsonFile = 'data.json';
	fs.readFile(jsonFile, 'utf8', (err, data) => {
		if (err) console.log(err);
		dataObj = JSON.parse(data);
		const user = dataObj.users.find((u) => {
			return u.email === email && u.password === password;
		});
		if (user) {
			const accessToken = Jwt.sign({ email: user.email, role: user.role }, accessTokenSecret);
			res.cookie('auth', `${accessToken}`);
			res.redirect('/admin');
		} else {
			res.send('Username of password incorrect');
		}
	});
});

export default LoginRouter;
