import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import authService from '../Services/authService.js';
const AdminRouter = Router();

AdminRouter.get('/', authService, (req, res, next) => {
	const { role } = req.user;
	if (role !== 'root') {
		res.redirect('/');
	} else {
		res.render('pages/admin', { title: 'Admin page' });
	}
});

AdminRouter.post('/skills', async (req, res, next) => {
	const jsonFile = 'data.json';
	fs.readFile(jsonFile, 'utf8', (err, data) => {
		if (err) console.log(err);
		let dataObj = JSON.parse(data);

		dataObj.skills[0].number = Number(req.body.age);
		dataObj.skills[1].number = Number(req.body.concerts);
		dataObj.skills[2].number = Number(req.body.cities);
		dataObj.skills[3].number = Number(req.body.years);

		console.log(dataObj.skills);
		dataObj = JSON.stringify(dataObj);
		fs.writeFile(jsonFile, dataObj, (err) => {
			if (err) console.log(err);
			console.log('Запись перезаписался');
		});
	});

	res.redirect('/');
});

const fileStorageEngine = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, './public/assets/img/products');
	},
	filename: (req, file, cb) => {
		cb(null, 'Work' + '.jpg');
	},
});

const upload = multer({ storage: fileStorageEngine });

AdminRouter.post('/upload', upload.single('photo'), async (req, res, next) => {
	console.log('file upload');
	console.log(req.file);
	const jsonFile = 'data.json';
	fs.readFile(jsonFile, 'utf8', (err, data) => {
		if (err) console.log(err);
		let dataObj = JSON.parse(data);

		const newObj = {
			src: req.file.path.replace('public', '.'),
			name: req.body.name,
			price: Number(req.body.price),
		};
		console.log(newObj);

		dataObj.products.push(newObj);
		dataObj = JSON.stringify(dataObj);
		fs.writeFile(jsonFile, dataObj, (err) => {
			if (err) console.log(err);
			console.log('Запись перезаписалася');
		});
	});
	res.redirect('/');
});

export default AdminRouter;
