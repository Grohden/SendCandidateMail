//Default routes and other things created by express

const index = require('./routes/index');
const mail = require('./routes/mail');


function SetupRoutes(app){

    //Main app file
    app.use('/', index);
    app.use('/mail', mail);


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

}

module.exports = SetupRoutes;