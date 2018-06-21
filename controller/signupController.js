module.exports = function(app) {
        var bcrypt = require('bcrypt');
        var expressSanitizer = require('express-sanitizer');


        app.use(expressSanitizer());
        app.get('/signup', (req, res) => {
                res.render('signup.ejs');

        });

        app.post('/signup', (req, res) => {
                req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
                var exist = 1;
                var item = req.body;

                db.collection("users").find({
                        username: item.username
                }).toArray(function(err, result) {
                        if (err) throw err;
                        if(result[0])
                            exist=0;
                       


                 })

                
                setTimeout(function(){if (exist == 0)
                                res.send('Username taken...Try a different name or Log in if you have an account');
                        else {
                                console.log(exist);

                                item.pass = bcrypt.hashSync(item.pass, 10);

                                db.collection('users').save(item, (err, result) => {
                                        if (err) return console.log(err)

                                        console.log('user added')
                                        res.redirect('/login')
                                })

                        }
                    }, 1000);

                

                


        })

}