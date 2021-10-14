//Require Express/other 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexRouter = require('./controllers/index');
const recipesRouter = require('./controllers/recipes')
const methodOverride = require('method-override');

//Applying and requiring express and dot env variables
const app = express();
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

//MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('connected', () => console.log('Connected to Mongo'));
db.on('error', () => console.log('Mongo Down'));

//Activating Morgan and URLE
app.set("view engine", "ejs")
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(express.static('public'));
//ROUTES || I N D U C E S 
app.use('/', indexRouter);
app.use('/', recipesRouter);
app.use('/new', recipesRouter);
app.use('/:id', recipesRouter);
app.use('/:id/edit', recipesRouter);


//PORT CONNECTION
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
});