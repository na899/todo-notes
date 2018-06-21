module.exports = function(app) {
        var bcrypt = require('bcrypt');


        var expressSanitizer = require('express-sanitizer');
        var bodyParser = require('body-parser');

        const MongoClient = require('mongodb').MongoClient


        app.use(bodyParser.urlencoded({
                extended: true
        }));
        app.use(bodyParser.json());
        app.use(expressSanitizer());

        //'/login' is login page
        app.get('/login', (req, res) => {
                 if(req.session.user!=undefined)
                res.redirect('/');
                else
                res.render('login.ejs');

        });

        // '/'is the todo page
        app.post('/', (req, res) => {

                req.body.sanitized = req.sanitize(JSON.stringify(req.body));
                var item = req.body;
                var check = 0;
                db.collection("users").find({
                        username: item.username
                }).toArray(function(err, result) {
                        if (err) throw err;
                        check = result[0];



                        if (bcrypt.compareSync(item.password, check.pass)) {
                                userID = item.username;
                                console.log(userID);
                                req.session.user = userID;
                                console.log(req.session.user);

                                db.collection('users').findOne({
                                        username: userID
                                },function(err,doc) {
                                        if (err) throw err;
                                        if (doc.todos == undefined)
                                                doc.todos = [];
                                        res.render('todo.ejs', {
                                                todos: doc.todos
                                        })
                                })


                        }
                        else {
                                res.send("Wrong Credentials!")

                                // Passwords don't match
                        }


                });

        })

}