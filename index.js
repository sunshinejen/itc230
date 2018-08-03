'use strict'
//const music = require('./lib/albums.js');
const express = require("express");
const app = express();
let handlebars = require("express-handlebars");
var Album =  require("./models/album");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(require("body-parser").urlencoded({extended:true}));
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/about', (req, res) => {
 res.type('text/html');
res.sendFile(__dirname + '/public/about.html');
});


app.get('/', (req,res,next) => {
 Album.find((err, albums) => {
  if (err) return next(err);
  res.render('home', {albums:albums});
 
 });
 
});


app.post('/get', (req,res, next) => {
 console.log(req.body);
 Album.findOne({albumtitle:req.query.albumtitle }, (err, albumtitle) => {
  if (err) return next(err);
  res.type('text/html');
  res.render('details', {result:albumtitle});
 });
 
});
  

app.get('/delete', (req,res, next)=> {
 console.log(req.query.albumtitle);
 Album.remove({albumtitle:req.query.albumtitle }, (err, result) => {
  if (err) return next(err);
  let deleted = result.result.n !==0 //n will be 0 if no docs are deleted
 Album.count((err, total) => {
     res.type('text/html');
     res.render('delete', {albumtitle:req.query.albumtitle, deleted: result.result.n !== 0, total: total});
 });
  
 });
});

//api's

/*
app.get('/api/v1/ablum/:albumtitle', (req, res, next) => {
 let title = req.params.title;
 console.log(title);
 Album.findOne({title:title}, (err, result) => {
  if (err || !result) return next(err);
  res.json(result);
 });
});


app.get('/api/v1/albums', (req, res, next) =>{
 Album.find((err, results) => {
  if (err || !results) return next(err);
  res.json(results);
 });
});

app.get('/api/v1/delete/:albumtitle', (req, res, next) =>{
 Album.remove({"albumtitle":req.params.albumtitle}, (err, result) =>{
      if (err) return next(err);
      res.json({"deleted": result.result.n});
 });
});

app.post('/api/v1/add', (req,res, next) => {

    Album.update({ albumtitle:  req.body.albumtitle}, req.body, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

*/
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
}); 

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

