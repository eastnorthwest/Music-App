// /albums

var express = require('express'), router = express.Router();

module.exports = function (artist, album, song) {

  router.get('/', function(req, res) {

    var wait = setInterval(function() {
      if (artist.isLoaded && album.isLoaded && song.isLoaded)
      {
        clearInterval(wait);
        var modAlbums = album.getAlbums().map(function(singleAlbum) {
            var singleArtist = artist.getArtist(singleAlbum.artist_id);
            singleAlbum.artistName = singleArtist.name;
            singleAlbum.songCount = song.getSongCount(singleAlbum.id);
            return singleAlbum;
          });
        res.render('albums', {albums: modAlbums});
      }
    }, 100)

  });
  return router;
}
