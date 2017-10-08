import SetupServer from './express.setup';

const express = require('express');
const index = require('./routes/index');
const mail = require('./routes/mail');
const app = express();

//Main app file


SetupServer(app);

app.use('/', index);
app.use('/mail', mail);

module.exports = app;
