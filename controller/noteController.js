module.exports = function(app) {

        var bodyParser = require('body-parser');
        var expressSanitizer = require('express-sanitizer');
        const MongoClient = require('mongodb').MongoClient


        app.use(bodyParser.urlencoded({
                extended: true
        }));
        app.use(bodyParser.json());
        app.use(expressSanitizer());


        //when logged out redirects to login page
        app.get('/logout', (req, res) => {

                if (req.session.user) {

                        req.session.user = undefined;

                        return res.redirect('/login');

                }
        })

        //'/notes' notes page
        app.get('/notes', (req, res) => {

                if (req.session.user && userID) {


                        console.log('get request');


                        db.collection('users').find({
                                username: userID
                        }).forEach(function(doc) {
                                if (doc.notes == undefined)
                                        doc.notes = [];

                                res.render('notes.ejs', {
                                        notes: doc.notes
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


        app.post('/note', (req, res) => {
                req.body.sanitized = req.sanitize(JSON.stringify(req.body));

                if (req.session.user && userID) {

                        var item = req.body;


                        db.collection('users').find({
                                username: userID
                        }).forEach(function(doc) {
                                var a;
                                if (doc.notes == undefined)
                                        doc.notes = [];


                                console.log(doc);


                                a = doc.notes.length;
                                //console.log(doc.todos[a]);
                                if (doc.notes[a] == undefined)
                                        doc.notes[a] = item;
                                db.collection('users').save(doc);
                                res.redirect('/notes');
                        })




                }
                else {
                        var err = new Error('You must be logged in to view this page.');
                        err.status = 401;
                        console.log(err);
                        res.redirect('/login');
                }


        })




}