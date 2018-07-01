var http = require("http"); 
var fs = require("fs");

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
 
 
 