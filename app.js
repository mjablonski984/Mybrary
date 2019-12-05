// if not in production mode load variabless from .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// string for url in env variables
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose')); // runs once when open db first time

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server has started...');
});
