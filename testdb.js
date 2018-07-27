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

