var mongoose = require('mongoose');
var cred = require('./credentials');
mongoose.connect(cred.connectionString, { useNewUrlParser: true });

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

var mySchema = mongoose.Schema({
 albumtitle: { type: String, required: true },
 artist:{ type: String, required: true},
 price: Number,
 qty: Number,
}); 

module.exports = mongoose.model('Album', mySchema);


