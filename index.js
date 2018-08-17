'use strict';
//const music = require('./lib/albums.js');
const express = require("express");
const app = express();
let handlebars = require("express-handlebars");
let bodyParser = require("body-parser");
var Album =  require("./models/album");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(require("body-parser").urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
app.use((err, req, res, next) => {
  console.log(err);
});


app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/about', (req, res) => {
 res.type('text/html');
res.sendFile(__dirname + '/public/about.html');
});


app.get('/', (req,res,next) => {
 Album.find((err, albums) => {
  console.log(albums);
  if (err) return next(err);
  res.render('home', {albums:JSON.stringify(albums)});
 
 });
 
});

app.post('/get', (req,res, next) => {
 Album.findOne({ title:req.query.title }, (err, albums) => {
  if (err) return next(err);
  res.type('text/html');
  res.render('details', {result:albums});
 });
 
});
  

//api's

app.get('/api/albums', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Album.find((err, results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});


app.get('/api/ablum/:title', (req, res, next) => {
 let title = req.params.title;
 Album.findOne({title:title}, (err, result) => {
  if (err || !result) return next(err);
  res.json(result);
 });
});


app.get('/api/delete/:id', (req, res, next) =>{
 Album.remove({"_id":req.params.id}, (err, result) =>{
      if (err) return next(err);
      res.json({"deleted": result.result.n});
 });
});


app.post('/api/add', (req,res, next) => {

    Album.update({title:  req.body.title}, req.body, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.get('/api/add/:title/:artist/:price/:quantity', (req, res, next) => {
    let title = req.params.title;
    Album.update({title: title}, {title:title, artist: req.params.artist, price: req.params.price, quantity:req.params.quantity}, {upsert: true}, (err, result) => {
        if (err) return next(err);
        res.json({updated: result.n});
    });
}); 

app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
}); 

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

