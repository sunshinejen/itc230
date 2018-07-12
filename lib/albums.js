var albums = [
    {albumTitle:'Red', price: 19.99, artist:'Taylor Swift'},
    {albumTitle:'1989', price: 19.99, artist:'Taylor Swift'},
    {albumTitle:'Speak Now', price: 19.99, artist:'ED Sheran'},
    {albumTitle:'Remote', price: 19.99, artist:'The Kooks'}   
    ];
    
exports.getAll = () => {
    return albums;
};



exports.get = (albumTitle) => {
    return albums.find((music) => {
        return music.albumTitle == albumTitle;
    });
};


exports.delete = (albumTitle) =>{
    index = albums.findIndex((music) => {
        return music.albumTitle == albumTitle
    });
    if (index !=-1) {
        return albums.splice(index,1);
    }else{
        return undefined;
    }
};
