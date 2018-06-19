module.exports=function(app){

var bodyParser= require('body-parser');

const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.get('/logout',(req,res)=>{

  if (req.session) {

    userID=0;
    req.logout();
    req.session ={};
        return res.redirect('/login');
      
  }
})


app.get('/notes',(req,res)=>{

if (req.session&&userID) {
    
  console.log("heyyy");
  console.log('get request');
  
db.collection('notes'+userID).find().toArray(function(err, results) {
  console.log(results)
 

  res.render('notes.ejs',{notes:results});
})

  } 
  else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    console.log(err);
  }



	
	
});


app.post('/note', (req, res) => {
	var item=req.body;

  db.collection('notes'+userID).save(item, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/notes')
  })
})






}