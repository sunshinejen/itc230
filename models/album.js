var mongoose = require('mongoose');
var cred = require('./credentials');
mongoose.connect(cred.connectionString, { useNewUrlParser: true });

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 artist:{ type: String, required: true},
 price: String,
 quantity: String,
}); 

module.exports = mongoose.model('Album', mySchema);
