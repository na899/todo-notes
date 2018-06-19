module.exports=function(app){
var bcrypt=require('bcrypt');



var bodyParser= require('body-parser');

const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

	app.get('/login',(req,res)=>{

     res.render('login.ejs');
	
});


	app.post('/', (req, res) => {
	var item=req.body;
    var check=0;
    db.collection("users").find({username:item.username}).toArray(function(err, result) {
          if (err) throw err;
          check=result[0];
          console.log(req.session);
         if(check!=0)
     {
     if(bcrypt.compareSync(item.password, check.pass)) {
     	userID=item.username;
     	console.log(userID)
         db.collection('todos'+userID).find().toArray(function(err, results) {

         res.render('todo.ejs',{todos:results})
    })    
} else {
	res.send("Wrong Credentials!")
 // Passwords don't match
}
    }
    
  });

})

}
