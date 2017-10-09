const SetupRoutes = require('./routes.setup');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();


/* TODO:
 * Review this, pug files are compiled every time they are required
 * it would be better to change them to src folder, then compile ONCE to build
 * (pug files are like java JSPs if they are used in the current way)
 */
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'frontend/build/')));

SetupRoutes(app);

module.exports = app;
