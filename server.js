var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    siteRoutes = require('./server/routes/site-routes'),
    signupRoutes = require('./server/routes/signup-routes')

//signupController = require('./client/js/controllers/signup')
    ;

app.use(bodyParser());
//app.use(moethodOverride()); // browsers by default only support get/post, not put/delete, so use this


// serve all asset files from necessary directories
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use("/img", express.static(__dirname + "/public/images"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use('/public', express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/client/views/partials'));
app.use(express.static(__dirname + '/public'));


// any API endpoints
//app.post('/api/v1/auth/login', routes.auth.login);

//app.post('/api/signup/isemailinuse', siteRoutes.isEmailInUse);
//var models = require('./server/models');
//var router = express.Router();
//router.get('/test', function(req, res) {
//    models.Actor.findAll({
//        where: {
//            actor_id: 1
//        }
//    }).then(function(actors){
//        console.log(actors);
//    });
//});
//app.use('/', router);
//app.use('/signup', signupRoutes);
app.use('/signup', signupRoutes);

// Site routes
app.get('/*', siteRoutes.index);
app.get('*', siteRoutes.notFound);


//app.post('/projects/', projectController.createProject);
//app.get('/projects/:id', projectController.getProject);
//app.get('*', function (req, res) {
//    res.sendFile(__dirname + '/client/views/index.html');
//});

//app.post('/api/signups', signupController.create);


// Example of how to access a model
//var models = require('./server/models');
//models.Actor.findAll({
//    where: {
//        actor_id: 1
//    }
//}).then(function (actors) {
//    console.log(actors);
//});

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler, will print stack trace.
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler, no stack traces displayed to user.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on port ' + port);
});

module.exports = app;