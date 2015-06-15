var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    siteRoutes = require('./server/routes/site-routes'),
    signupRoutes = require('./server/routes/signup-routes'),
//passport = require('passport'),
    passport = require('./auth'),
//LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    SessionStore = require('express-mysql-session')
    ;

app.use(session({secret: 'sdsecretsessionkey'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use(bodyParser());
//app.use(moethodOverride()); // browsers by default only suort get/post, not put/delete, so use this
app.use(cookieParser());


//var path = require('path');

//var env = process.env.NODE_ENV || 'development';
//var dbConfig = require(path.join(__dirname, './config/database.json'))[env];
//
//var mysql = require('mysql');
//var options = {
//    host: dbConfig.options.host,
//    port: 3306,
//    user: dbConfig.username,
//    password: dbConfig.password,
//    database: dbConfig.database
//};
//
//var connection = mysql.createConnection(options);
////var sessionStore = new SessionStore({}/* session store options */, connection)
//var sessionStore = new SessionStore({}, connection);
//
//var session_cookie_name = 'signingday.sid';
//var session_cookie_secret = 'signing_day_secret';
//app.set('session_cookie_name', session_cookie_name);
//app.set('session_cookie_secret', session_cookie_secret);
//app.use(session({
//    key: session_cookie_name,
//    secret: session_cookie_secret,
//    store: sessionStore,
//    resave: true,
//    saveUninitialized: true
//}));


//app.use(require('express-session')({
//    secret: 'keyboard cat',
//    resave: false,
//    saveUninitialized: false
//}));
//app.use(passport.initialize());
//app.use(passport.session());


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



//var models = require('./server/models');
//models.createAdminUser("admin2", "admin@signingday.com", "password");

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
app.use('/signup', signupRoutes);
//var path = require('path');

//var auth = function (req, res, next) {
//    if (!req.isAuthenticated()) {
//        // res.send(401);
//        //res.sendFile(path.join(__dirname, './client/views/login.html'));
//        res.redirect('/login');
//    } else {
//        next();
//    }
//};
//app.use('/signup', auth, signupRoutes);

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = siteRoutes.getSecretToken();

// We are going to protect /api routes with JWT
//app.use('/admin', expressJwt({secret: secret}));
//app.use('/admin',
//    expressJwt({secret: secret}),
//    function(req, res) {
//        if (!req.user.admin) return res.send(401);
//        res.send(200);
//});
//app.get('/admin', siteRoutes.admin);
app.get('/admin', expressJwt({secret: secret}), siteRoutes.admin);

//app.use(express.json());
//app.use(bodyParser.urlencoded());





app.post('/isauth', siteRoutes.isauth);
//app.get('/admin', siteRoutes.admin);
app.get('/login', siteRoutes.loginGet);
//app.post('/login', siteRoutes.loginPost);
app.post('/login', passport.authenticate('local'), siteRoutes.loginPost);
//app.post('/login', siteRoutes.loginJwt);


// Site routes
app.get('/*', siteRoutes.index);
app.get('*', siteRoutes.notFound);


// passport config
//var Account = require('./models/account');
//passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());


// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler, will print stack trace.
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler, no stack traces displayed to user.
app.use(function (err, req, res, next) {
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