var express = require('express');
var bcrypt=require('bcrypt');
var bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var session=require('express-session');

var db;
var userID;

/*MongoClient.connect('mongodb://naveena:nav123@ds163850.mlab.com:63850/todolist', (err, client) => {
  if (err) return console.log(err)
  db = client.db('todolist') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})*/

var signupController=require('./controller/signupController');
var todoController=require('./controller/todoController');
var loginController=require('./controller/loginController');
var noteController=require('./controller/noteController');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'spider',
  resave: true,
  saveUninitialized: false
}));var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var session = require('express-session');

var db;
var userID;

/*MongoClient.connect('mongodb://naveena:nav123@ds163850.mlab.com:63850/todolist', (err, client) => {
  if (err) return console.log(err)
  db = client.db('todolist') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})*/

var signupController = require('./controller/signupController');
var todoController = require('./controller/todoController');
var loginController = require('./controller/loginController');
var noteController = require('./controller/noteController');

var app = express();
app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(session({
        secret: 'spider',
        resave: true,
        saveUninitialized: false
}));



app.use(express.static('./files'));
signupController(app);
loginController(app);
todoController(app);
noteController(app);



app.use(express.static('./files'));
signupController(app);
loginController(app);
todoController(app);
noteController(app);

