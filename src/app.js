const express = require('express');
const path = require('path');


const indexRouter = require('./routes/index');
const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const dbConnectionTest = require('./utils/dbConnectionTest')
const app = express();
const methodOverride = require('method-override');

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.resolve(__dirname, '../public')));
dbConnectionTest()
//para visualizar req.body 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', indexRouter);
app.use('/movies',moviesRoutes);
app.use('/genres',genresRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
