module.exports = function(app) {

        var bodyParser = require('body-parser');
        var session = require('express-session');
        const MongoClient = require('mongodb').MongoClient
        var expressSanitizer = require('express-sanitizer');

        app.use(bodyParser.urlencoded({ extended: true }));
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
                req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
                if (req.session.user) {

                        req.session.user = undefined;

                        return res.redirect('/login');

                }
        })




        app.get('/', (req, res) => {


                if (req.session.user && userID) {
                        req.body.sanitized = req.sanitize(req.body.propertyToSanitize);

                        console.log('get request');
                        console.log(req.body);
                        db.collection('todos' + userID).find().toArray(function(err, results) {
                                console.log(results)
                                res.render('todo.ejs', {
                                        todos: results
                                });
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
                        req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
                        var item = req.body;
                        item.flag = 0;
                        db.collection('todos' + userID).save(item, (err, result) => {
                                if (err) return console.log(err)

                                console.log('saved to database')
                                res.redirect('/')
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

                        req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
                        console.log('heyyy')
                        console.log(req.body.todo);
                        db.collection("todos" + userID).updateOne({
                                todo: req.body.todo
                        }, {
                                $set: {
                                        flag: req.body.flag
                                }
                        }, function(err, result) {
                                if (err) console.log('shitt');
                                console.log("1 document updated");
                                res.send(result)
                        });


                }
                else {
                        var err = new Error('You must be logged in to view this page.');
                        err.status = 401;
                        console.log(":/");
                        res.redirect('/login');
                }


        })





};