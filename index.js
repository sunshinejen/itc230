'use strict'
//const music = require('./lib/albums.js');
const express = require("express");
const app = express();
let handlebars = require("express-handlebars");
var albumMethods = require("./models/albumMethods");
var album =  require("./models/album");

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

//send content of home view
app.get('/get', (req,res, next) => {
   albumMethods.get( req.query.albumTitle.toLowerCase()).then((item) => {
       res.render('details', {result:item});
  }).catch((err) =>{
    return next(err);
  });
});

app.get('/delete', (req,res, next)=> {
 console.log(req.query.albumTitle);
 const dresult = req.query.albumTitle;
 console.log(dresult);
 albumMethods.delete(dresult).then((result) => {
  album.count((err,count) => {
   if (err) return next(err);
  res.render('delete', {result: result.n, items:count, dresult:dresult});
  });
}).catch((err) => {
 return next(err);
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

