module.exports=function(app){
   var bcrypt=require('bcrypt');
	app.get('/signup',(req,res)=>{
     res.render('signup.ejs');
		
});

app.post('/signup', (req, res) => {
	var item=req.body;

 item.pass=bcrypt.hashSync(item.pass,10);

  db.collection('users').save(item, (err, result) => {
    if (err) return console.log(err)
/*if(bcrypt.compareSync(item.cfpass, item.pass)) {
 console.log("yayyy")
} else {
 console.log("wth")
}*/
    console.log('user added')
    res.redirect('/signup')
  })
})

}