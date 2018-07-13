'use strict'
const music = require('./lib/albums.js');
const express = require("express");
const app = express();
let handlebars = require("express-handlebars");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 

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

// define 404 handler


app.post('/get', (req, res) => {
  console.log(req.body); // display parsed form submission
});


//send content of home view
app.get('/', (req, res) => {
    res.render('home', {music: music.getAll()});
});

app.get('/get', (req,res) => {
   let result = music.get(req.query.title.toLowerCase());
   res.render('details', {albumTitle: req.query.title, result:result})
});

app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
}); 

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

