module.exports = function(app) {
        var bcrypt = require('bcrypt');
        app.get('/signup', (req, res) => {
                res.render('signup.ejs');

        });

        app.post('/signup', (req, res) => {
                var item = req.body;

                item.pass = bcrypt.hashSync(item.pass, 10);

                db.collection('users').save(item, (err, result) => {
                        if (err) return console.log(err)
                        
                        console.log('user added')
                        res.redirect('/signup')
                })
        })

}