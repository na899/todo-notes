module.exports = function(app) {
        var bcrypt = require('bcrypt');



        var bodyParser = require('body-parser');

        const MongoClient = require('mongodb').MongoClient


        app.use(bodyParser.urlencoded({extended: true  }));
        app.use(bodyParser.json());


        //'/login' is login page
        app.get('/login', (req, res) => {

                res.render('login.ejs');

        });

        // '/'is the todo page
        app.post('/', (req, res) => {
                var item = req.body;
                var check = 0;
                db.collection("users").find({
                        username: item.username
                }).toArray(function(err, result) {
                        if (err) throw err;
                        check = result[0];


                        if (check != 0) {
                                if (bcrypt.compareSync(item.password, check.pass)) {
                                        userID = item.username;
                                        console.log(userID);
                                        req.session.user = userID;
                                        console.log(req.session.user);
                                        db.collection('todos' + userID).find().toArray(function(err, results) {

                                                res.render('todo.ejs', {
                                                        todos: results
                                                })
                                        })
                                }
                                else {
                                        res.send("Wrong Credentials!")
                                        // Passwords don't match
                                }
                        }

                });

        })

}