const { json } = require("express");
const Songs = require("../models/songs");
const users=require("../models/users");

Songs.loadData();
exports.getSongs = (req, res, next) => {
 if( users.isValidRequest(req))
  res.status(200).json(Songs.fetchAll());
  else
  res.status(401)
  .json({ message: "Invalid token or expired please login again" });
}

exports.getSongById = (songId) => {
  res.status(200).json(Songs.getById(songId)); 
}
