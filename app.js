import createError from 'http-errors';
import express from 'express';
import mainRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
const accessTokenSecret = 'youraccesstonkensecret';
export default accessTokenSecret;

const app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use((req, __, next) => {
	next(createError(404, `Ой, извините, но по пути ${req.url} ничего не найдено!`));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(3000, () => {
	console.log(`Server is started on port - 3000`);
});
