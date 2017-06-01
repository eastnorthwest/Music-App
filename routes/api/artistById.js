var express = require('express'), router = express.Router(), errors = require('../../lib/errors');

module.exports = function (artist) {
  var a = new artist();

  router.get(['/:id', '/id/:id'], function(req, res) {
    a.getArtistById(req.params.id).then(function(data) {
      console.log("getArtistById", data);
      if (!data) {
        res.send(errors.toJson("getArtistById - No artist found with id " + req.params.id))
      }
      res.json(data);
    }).catch(function(err){
      res.send(errors.toJson(err));
      console.log("getArtistById - error", err);
    })
  });

  return router;
};