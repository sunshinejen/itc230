let albums = [
    {albumTitle:'Red', price: 19.99, artist:'Taylor Swift', qty: 12},
    {albumTitle:'1989', price: 19.99, artist:'Taylor Swift', qty: 4},
    {albumTitle:'Speak Now', price: 19.99, artist:'ED Sheran', qty: 5},
    {albumTitle:'Remote', price: 19.99, artist:'The Kooks', qty: 2}   
    ];
    
exports.getAll = () => {
    return albums;
};



exports.get = (albumTitle) => {
    return albums.find((music) => {
        return music.albumTitle.toLowerCase() == albumTitle;
    });
};


exports.delete = (albumTitle) => {
 var index = albums.findIndex((music) => {
        return music.albumTitle.toLowerCase() == albumTitle
    });
    
    if (index !=-1) {
        return albums.splice(index,1)[0];
    }else{
        return undefined;
    }
};
