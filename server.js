var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    Sequelize = require("sequelize"),
    dbConfig = require('./server/config')
//signupController = require('./client/js/controllers/signup')
    ;

app.use(bodyParser());
//app.use(moethodOverride()); // browsers by default only support get/post, not put/delete, so use this

// Database
var sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig.options
);

// http://docs.sequelizejs.com/en/latest/docs/models-definition/#configuration
var Actor = sequelize.define('Actor', {
    actor_id: {type: Sequelize.INTEGER, primaryKey: true},
    first_name: {type: Sequelize.STRING, allowNull: true},
    last_name: {type: Sequelize.STRING, allowNull: true},
    last_update: {type: Sequelize.DATE, allowNull: true}
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'actor',
    getterMethods: {
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        }
    },
    setterMethods: {
        fullName: function (value) {
            var name = value.split(' ');
            this.setDataValue('firstName', names.slice(0, -1).join(' '));
            this.setDataValue('lastName', names.slice(-1).join(' '));
        }
    },
    instanceMethods: {

        testMe: function(id){
            return "tested with " + id;
        },
        findById: function (id, onSuccess, onError) {
            Actor.find({where: {id: id}}, {raw: true})
                .success(onSuccess).error(onError);
        }
    }
});

//Actor.testMe(123);
//Actor.findById(1).then(function (actor) {
//    console.log(actor);
//}, function (err) {
//    console.log(err);
//});
Actor.findAll({
    where: {
        actor_id: 1
    }
}).then(function (actors) {
    console.log(actors);
});

Actor.find({
    where: {
        actor_id: 2
    }
}).then(function (actor) {
    console.log(actors);
});
//Actor.findById(1).then(function (actor) {
//    console.log(actor);
//})
//Session.find({
//    where: {
//        user_id: someNumber,
//        token: someString,
//        expires: {
//            $gt: (new Date())
//        }
//    }
//}).on('success', function (s) { /* things and stuff */ });

// serve all asset files from necessary directories
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/content', express.static(__dirname + '/content'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use("/img", express.static(__dirname + "/content/images"));
app.use("/content/img", express.static(__dirname + "/content/images"));
app.use("/content/img/partners", express.static(__dirname + "/content/images"));
app.use("/css", express.static(__dirname + "/content/css"));
app.use("/content/css", express.static(__dirname + "/content/css"));
app.use(express.static(__dirname + '/client/views/partials'));
app.use(favicon(__dirname + '/content/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));


// any API endpoints
//app.post('/api/v1/auth/login', routes.auth.login);


// Start page
//app.get('/', function(req, res) {
//    res.sendfile(__dirname + '/client/views/index.html');
//});

// Specific API paths to get server data
app.get('/user/:username', function (req, res) {
    res.send("test " + req.params.username + " profile");
});

//app.get('/*', function(req, res){
//    console.log("express: send index.html to client");
//    res.sendFile(__dirname + '/client/views/index.html');
//});

// Default home
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/client/views/index.html');
});

// All others, show 404
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/client/views/404.html');
});

//app.post('/projects/', projectController.createProject);
//app.get('/projects/:id', projectController.getProject);
//app.get('*', function (req, res) {
//    res.sendFile(__dirname + '/client/views/index.html');
//});


// define routes
// make sure to coordinate client side and server side routes
//app.get('/home', function(req, res) {
//    //res.render('client/views/partials/' + req.params.partialPath);
//    res.sendfile(__dirname + '/client/views/index.html');
//});

//app.post('/api/signups', signupController.create);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on port ' + port);
})