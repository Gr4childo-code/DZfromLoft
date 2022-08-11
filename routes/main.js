import { Router } from 'express';
import nodemailer from 'nodemailer';
const RouterMain = Router();
import { readFile } from 'fs/promises';
const { products, skills } = JSON.parse(await readFile(new URL('../data.json', import.meta.url)));

RouterMain.get('/', (req, res, next) => {
	res.render('pages/index', { title: 'Main page', products, skills });
});

RouterMain.post('/', async (req, res, next) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		secure: false,
		port: 587,
		auth: {
			user: 'dariana48@ethereal.email',
			pass: 'PPhFgBnBUSDNzU1fGY',
		},
	});

	const result = await transporter.sendMail({
		from: 'Mailer test <dariana48@ethereal.email>',
		to: 'samohkin.2012@gmail.com',
		subject: `Сообщение от пользователя - ${req.body.email}`,
		text: `${req.body.message}`,
		html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
	});

	res.redirect('/');
});

export default RouterMain;
