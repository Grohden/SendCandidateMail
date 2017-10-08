const SetupServer = require('./express.setup');
const express = require('express');
const index = require('./routes/index');
const mail = require('./routes/mail');
const app = express();

//Main app file

app.use('/', index);
app.use('/mail', mail);

SetupServer(app);

module.exports = app;
