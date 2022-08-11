import Jwt from 'jsonwebtoken';
import accessTokenSecret from '../app.js';

const authService = (req, res, next) => {
	const authHeader = String(req.headers.cookie);
	console.log(authHeader.split('auth=')[1].split('Bearer'));
	if (authHeader) {
		const token = authHeader.split('auth=')[1];
		console.log('Token: ', token);
		Jwt.verify(token, accessTokenSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(403);
	}
};

export default authService;
