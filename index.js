var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



const app = express();

var Item = require('./models/Item');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27020/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(function(){
    console.log('MongoDB Connected')
  })
  .catch( function(err){
    console.log(err)
  });



app.get('/', function(req, res){
  Item.find()
  .then(function(items){
    res.render('index', { items })
  })
  .catch(function(err){
    res.status(404).json({ msg: 'No items found' });
  });

 
});

app.post('item/add', function(req, res){
  var newItem = new Item();
  newItem.name = req.body.name

  newItem.save(function(err){
    if(err){
      console.log(err);
      console.log('error occured')
    }else{
      console.log('success the item has been to the database')
    }
  })
})
/*
app.post('/item/add', function(req, res){
  var newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(function(item){
    res.redirect('/');
   
});
*/
var port = 3000;


app.listen(port, function(err){
  if(err){
    console.log(err, "error occured cant connect to port : 3000");
  }else{
    console.log("server is up and running");
  }
});