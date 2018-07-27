var Album = require("./album");

exports.getAll = () => {
  return Album.find({}, (err, result) => {
    if (err) {
      return err;
    } 
    return result;
  });
};

exports.get = (albumTitle) => {
  return Album.find({albumTitle}, (err, result) => {
    if (err) {
      return err;
    }
  return result;
  });
};

exports.delete =(albumTitle) => {
    return Album.remove({'albumTitle': albumTitle}, (err, result) => {
      if (err) {
        return err;
      }
    return result;
      });
};
