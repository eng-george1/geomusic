const { json } = require("express");
const users = require("../models/users");

users.loadData();
exports.login = (req, res, next) => {
  let result = users.login(req.body.username, req.body.password);
  console.log(result);
  if (result.token) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
  res.end();
};

exports.refreshToken = (req, res, next) => {
  try {
    //console.log(req);
    let result = users.refreshToken(req);
    console.log(result);
    if (result.token) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
    res.end();
  } catch (error) {
    res.status(103).end();
  }
};

exports.isValidToken = (token) => {
  try {
    res.status(200).json(users.isValidToken(token));
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid token or expired please login again" });
  }
};

exports.getPlaylist = (req, res, next) => {
  console.log("....");
  if (users.isValidRequest(req))
    res.status(200).json(users.fetchAllPlaylist(req));
  else
    res
      .status(401)
      .json({ message: "Invalid token or expired please login again" });
};
exports.addSong = (req, res, next) => {
  console.log("....");
  if (users.isValidRequest(req))
    res.status(200).json(users.addSongtoPlaylist(req, req.params.songId));
  else res.status(401).json({ message: "error" });
};

exports.removeSong = (req, res, next) => {
  console.log("....");
  if (users.isValidRequest(req))
    res.status(200).json(users.removeSongfromPlaylist(req, req.params.songId));
  else res.status(401).json({ message: "error" });
};
