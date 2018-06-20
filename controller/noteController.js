module.exports = function(app) {

        var bodyParser = require('body-parser');
        var expressSanitizer = require('express-sanitizer');
        const MongoClient = require('mongodb').MongoClient


        app.use(bodyParser.urlencoded({ extended: true }));
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

                        db.collection('notes' + userID).find().toArray(function(err, results) {
                                console.log(results)


                                res.render('notes.ejs', {
                                        notes: results
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


        app.post('/note', (req, res) => {
                req.body.sanitized = req.sanitize(req.body.propertyToSanitize);

                if (req.session.user && userID) {

                        var item = req.body;

                        db.collection('notes' + userID).save(item, (err, result) => {
                                if (err) return console.log(err)

                                console.log('saved to database')
                                res.redirect('/notes')
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