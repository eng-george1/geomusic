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

exports.isValidToken = (token) => {
  try {
    res.status(200).json(users.isValidToken(token));
  } catch (error) {
    res
      .status(20103)
      .json({ message: "Invalid token or expired please login again" });
  }
};
