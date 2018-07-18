'use strict'
const music = require('./lib/albums.js');
const express = require("express");
const app = express();
let handlebars = require("express-handlebars");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(require("body-parser").urlencoded({extended:true}));

app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
});

app.get('/about', (req, res) => {
 res.type('text/html');
res.sendFile(__dirname + '/public/about.html');
});


/*
 send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});
*/

//send content of home view
app.get('/', (req, res) => {
    res.render('home', {music: music.getAll()});
});

app.get('/get', (req,res) => {
   let result = music.get(req.query.albumTitle.toLowerCase());
   res.render('details', {albumTitle: req.query.albumTitle, result:result});
});


app.get('/delete', (req,res)=> {
 console.log(req.query.albumTitle);

 let dresult = music.delete(req.query.albumTitle.toLowerCase());
console.log(dresult);
 res.render('delete', {albumTitle: req.query.albumTitle, result:dresult});
});

//handle post
app.post('/get', function(req,res){
  console.log(req.body);
  var found = music.get(req.body.title);
  res.render("details",{albumTitle: req.body.title, result:found});
  // display parsed form submission
});


app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
}); 

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

