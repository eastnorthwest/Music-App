var express = require('express');
var app = express();

// load models and load data
var Artist = require('./model/artist');
var artist = new Artist();
artist.loadAll();

var Album = require('./model/album');
var album = new Album();
album.loadAll();

var Song = require('./model/song');
var song = new Song();
song.loadAll();

console.log(artist)

// set view engine
app.set('view engine', 'ejs');

// Use res.render to load up an ejs view file

// index
/*
app.get('/', function(req, res) {
  res.render('pages/index');
});
*/

// define routes
var about = require('./routes/about');
app.use('/about', about);

var artists = require('./routes/artists')(artist, album, song);
app.use('/', artists);

var albums = require('./routes/albums')(artist, album, song);
app.use('/albums', albums);

var songs = require('./routes/songs')(artist, album, song);
app.use('/songs', songs);

var info = require('./routes/artistInfo')(artist, album, song);
app.use('/artist', info);

var albumInfo = require('./routes/albumInfo')(artist, album, song);
app.use('/album', albumInfo);

// setup static files
app.use(express.static('public'))

app.listen('8080')
console.log('8080 is listen port');