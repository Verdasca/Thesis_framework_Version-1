// Server file

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

var usersController = require('./server/controllers/users-controller');
var projectsController = require('./server/controllers/projects-controller');
var alternativesController = require('./server/controllers/alternatives-controller');
var criterionsController = require('./server/controllers/criterions-controller');
var categoriesController = require('./server/controllers/categories-controller');
var parametersController = require('./server/controllers/parameters-controller');
var performanceTableController = require('./server/controllers/performanceTable-controller');
var profileTableController = require('./server/controllers/profileTable-controller');

// Function to reset DB and get the correct data + create/delete folders and projects 
//var importData = require('./importData.js');
var createUserProject = require('./createUserProject.js');
var getProjectData = require('./getProjectData.js');

// configuration ===========================================
var node_env = process.env.NODE_ENV;
    
// config files
var db = require('./config/db');
var appConfig = require('./config/app');

// set our port
var port = appConfig.ports[node_env]|| 8080; 

// connect to our mongoDB database 
mongoose.connect(db.url);    

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /client/img will be /img for users
app.use(express.static(__dirname + '/client')); 
//app.use(express.static(__dirname + '/templates/client')); 

//REST API ==================================================================
//User 
app.get('/api/users', usersController.get);
app.get('/api/user/:id', usersController.findById);
app.post('/api/users', usersController.create);
app.delete('/api/user/:id', usersController.delete);
//Project 
app.get('/api/projects', projectsController.get);
app.get('/api/project/:id', projectsController.findById);
app.post('/api/projects', projectsController.create);
app.delete('/api/project/:id', projectsController.delete);
//Alternative 
app.get('/api/alternatives', alternativesController.get);
app.get('/api/alternative/:id', alternativesController.findById);
app.post('/api/alternatives/:id', alternativesController.create);
app.put('/api/alternative/:id', alternativesController.edit);
app.delete('/api/alternative/:id', alternativesController.delete);
//Criterion 
app.get('/api/criterions', criterionsController.get);
app.get('/api/criterion/:id', criterionsController.findById);
app.post('/api/criterions/:id', criterionsController.create);
app.put('/api/criterion/:id', criterionsController.edit);
app.delete('/api/criterion/:id', criterionsController.delete);
//Category 
app.get('/api/categories', categoriesController.get);
app.get('/api/category/:id', categoriesController.findById);
app.post('/api/categories/:id', categoriesController.create);
app.put('/api/category/:id', categoriesController.edit);
app.delete('/api/category/:id', categoriesController.delete);
//Parameter 
app.get('/api/parameters', parametersController.get);
app.get('/api/parameter/:id', parametersController.findById);
app.post('/api/parameters/:id', parametersController.create);
app.put('/api/parameter/:id', parametersController.edit);
app.delete('/api/parameter/:id', parametersController.delete);
//Performance Table 
app.get('/api/performances', performanceTableController.get);
app.get('/api/performance/:id', performanceTableController.findById);
app.post('/api/performances/:id', performanceTableController.create);
app.put('/api/performance/:id', performanceTableController.edit);
app.delete('/api/performance/:id', performanceTableController.delete);
app.delete('/api/performances/:id', performanceTableController.deleteAll);
//app.delete('/api/performances', performanceTableController.destroy);
//Profile Table 
app.get('/api/profiles', profileTableController.get);
app.get('/api/profile/:id', profileTableController.findById);
app.post('/api/profiles/:id', profileTableController.create);
app.put('/api/profile/:id', profileTableController.edit);
app.delete('/api/profile/:id', profileTableController.delete);
app.delete('/api/profiles/:id', profileTableController.deleteAll);
// Import data functions
//app.get('/importData', importData.reset);
//app.get('/createProject', importData.createProject);
app.get('/createUserProject', createUserProject.create);
app.get('/createUserProjectGet', createUserProject.get);
//app.get('/getProjectData/alternatives', getProjectData.getAlternatives);
// app.post('/getProjectData/:id', getProjectData.add);
//app.post('/getProjectData/alternatives', getProjectData.addAlternative);

// frontend routes =========================================================
// route to handle all angular requests
app.get('*', function(req, res) {
	res.sendfile(__dirname + '/client/workspace.html');
	//res.sendfile(__dirname + '/templates/client/workspace.html'); // load our client/workspace.html file
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;  