module.exports = function(app) {

        var bodyParser = require('body-parser');

        const MongoClient = require('mongodb').MongoClient


        app.use(bodyParser.urlencoded({
                extended: true
        }));
        app.use(bodyParser.json());

        MongoClient.connect('mongodb://naveena:nav123@ds163850.mlab.com:63850/todolist', (err, client) => {
                if (err) return console.log(err)
                db = client.db('todolist')
                app.listen(3000, () => {
                        console.log('listening on 3000')
                })
        })

        app.get('/logout', (req, res) => {

                if (req.session) {
                        // delete session object
                        req.session.destroy(function(err) {
                                if (err) {
                                        console.log(err);
                                }
                                else {
                                        return res.redirect('/login');
                                }
                        });
                }
        })




        app.get('/', (req, res) => {
                console.log('get request');
                console.log(req.body);
                db.collection('todos' + userID).find().toArray(function(err, results) {
                        console.log(results)
                        res.render('todo.ejs', {
                                todos: results
                        });
                })

        });


        app.post('/todo', (req, res) => {
                var item = req.body;
                item.flag = 0;
                db.collection('todos' + userID).save(item, (err, result) => {
                        if (err) return console.log(err)

                        console.log('saved to database')
                        res.redirect('/')
                })
        })


        app.put('/todo', (req, res) => {
                console.log(req.body.flag);
                db.collection('todos' + userID).updateOne({
                        todo: req.body.todo
                }, {


                        $set: {
                                flag: req.body.flag
                        }
                }, (err, result) => {

                        if (err) return res.send(err)
                        res.send(result)

                })

        })




};