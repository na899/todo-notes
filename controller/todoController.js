module.exports = function(app) {

        var bodyParser = require('body-parser');
        var session = require('express-session');
        const MongoClient = require('mongodb').MongoClient
        var expressSanitizer = require('express-sanitizer');

        app.use(bodyParser.urlencoded({
                extended: true
        }));
        app.use(bodyParser.json());
        app.use(expressSanitizer());
        MongoClient.connect('mongodb://naveena:nav123@ds163850.mlab.com:63850/todolist', (err, client) => {
                if (err) return console.log(err)
                db = client.db('todolist')
                app.listen(3000, () => {
                        console.log('listening on 3000')
                })
        })

        app.get('/logout', (req, res) => {
               
                if (req.session.user) {

                        req.session.user = undefined;

                        return res.redirect('/login');

                }
        })




        app.get('/', (req, res) => {


                if (req.session.user && userID) {
                        console.log('get request');
                        console.log(req.body);

                        db.collection('users').findOne({
                                username: userID
                        },function(err,doc) {
                                if(err)throw err;

                                if (doc.todos == undefined)
                                        doc.todos = [];
                                res.render('todo.ejs', {
                                        todos: doc.todos
                                })
                        

                          })


                }

                else {
                        var err = new Error('You must be logged in to view this page.');
                        err.status = 401;
                        console.log(err);
                        res.redirect('/login');
                }




        });



        app.post('/todo', (req, res) => {


                if (req.session.user && userID) {
                        req.body.sanitized = req.sanitize(JSON.stringify(req.body));
                        var item = req.body;
                        item.flag = 0;

                        db.collection('users').findOne({
                                username: userID
                        },function(err,doc) {
                                if(err)throw err;
                                var a;
                                if (doc.todos == undefined)
                                        doc.todos = [];

                                for (var i in doc.todos) {
                                        console.log(doc.todos[i].todo);
                                        a = i;
                                }
                                console.log(doc);


                                a = doc.todos.length;
                                //console.log(doc.todos[a]);
                                if (doc.todos[a] == undefined)
                                        doc.todos[a] = item;
                                db.collection('users').save(doc);
                                res.redirect('/');
                        })
                }
                else {
                        var err = new Error('You must be logged in to view this page.');
                        err.status = 401;
                        console.log(err);
                        res.redirect('/login');
                }



        })


        app.put('/todo', (req, res) => {
                if (userID) {

                        req.body.sanitized = req.sanitize(JSON.stringify(req.body));
                        
                        console.log(req.body.todos);


                        db.collection('users').find({
                                username: userID
                        },function(err,doc) {
                                if (err) throw err
                                var a;
                                if (doc.todos == undefined)
                                        doc.todos = [];

                                for (var i in doc.todos) {
                                        if (doc.todos[i].todo == req.body.todo)
                                                a = i;

                                        doc.todos[a] = req.body;
                                        db.collection('users').save(doc);
                                        res.redirect('/');
                                }
                                console.log(doc);

                        })






                }

                else {
                        var err = new Error('You must be logged in to view this page.');
                        err.status = 401;
                        console.log(":/");
                        res.redirect('/login');
                }


        })



};