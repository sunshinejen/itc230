var Album = require("./album");

exports.getAll = () => {
  return Album.find({}, (err, result) => {
    if (err) {
      return err;
    } 
    return result;
  });
};