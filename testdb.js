var album = require("./models/album");

// return all records
album.find({}, (err, items) => {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});

// return all records that match a condition
album.find({'artist':'Ed Sheeran'}, (err, items) => {
 if (err) return next(err);
 console.log(items.length);
 // other code here
});

// return a single record
album.findOne({'artist':'Taylor Swift'}, (err, item) => {
  if (err) return next(err);
  console.log(item);
  // other code here
}); 

// insert or update a single record
var newAlbum = {'albumtitle':'1989', 'artist':'Taylor Swift', 'price': '11.99', 'qty':'3' }
album.update({'albumtitle':'1989'}, newAlbum, {upsert:true}, (err, result) => {
  if (err) return next(err);
  console.log(result);
  // other code here
}); 