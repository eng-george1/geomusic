const { json } = require("express");
const Songs = require("../models/songs");
const users = require("../models/users");
const fs = require("fs");

Songs.loadData();
exports.getSongs = (req, res, next) => {
  if (users.isValidRequest(req)) res.status(200).json(Songs.fetchAll());
  else
    res
      .status(401)
      .json({ message: "Invalid token or expired please login again" });
};

exports.getSongById = (songId) => {
  res.status(200).json(Songs.getById(songId));
};

exports.playSong = (req, res, next) => {
  if (users.isValidRequest(req)||true) {
    let path = Songs.getSongFile(req.params.songId);
    console.log(path);
    fs.createReadStream(path).pipe(res);
    res.status(200);
  } else
    res
      .status(401)
      .json({ message: "Invalid token or expired please login again" });
};

exports.searchSongs= (req, res, next) => {
  if (users.isValidRequest(req)) {
    res.status(200).json(Songs.search( req.body.searchKey));
     } else
    res
      .status(401)
      .json({ message: "Invalid token or expired please login again" });
};
