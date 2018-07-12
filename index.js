var http = require("http"); 
var fs = require("fs");
var music = require('./lib/albums');
var querystring = require('querystring');

http.createServer(function(req,res) {
  var path = req.url.toLowerCase();
  
  switch(path) {
    case '/': 
        fs.readFile('home.html', function (err, data) {
            
           
           if (err) return console.error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data.toString());
       
        });
        break;
    case '/about.html':
        fs.readFile('about.html', function (data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data.toString());
        });
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);
 
 case '/get':
     var result = music.get(music);
     
     if(result) {
         res.writeHead(200, {'Content-Type: 'text/plain'});
         res.end(result));
     }else {
             res.writeHead(200, {'Content-Type' : 'text/plain'});
             res.end('Item not found');
         };
     // code
     break;
     
     
     case 'delete':
         var deleteAlbum = music.splice(get(albumTitle));
         var deleteResult= music.delete(deleteAlbum);
         
         if(deleteResult) {
             res.writeHead(200, {'Content-Type' : 'text/plain'});
             res.end('Album'+'deleteAlbum'+'has been removed');
         } else {
             res.writeHead(200, {'Content-Type' : 'text/plain'});
             res.end('Album'+'deleteAlbum'+'not found');
         }
         break;
     
 
 

console.log(music.getAll());

console.log(music.findAlbumTitle());