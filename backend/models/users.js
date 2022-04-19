const jwt = require("jsonwebtoken");
const Songs = require("./songs");
const users = [];
let counter = 0;
const config = process.env;
module.exports = class user {
  constructor(id, username, password, playlist = []) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.playlist = playlist;
  }

  static loadData() {
    users.push(new user(1, "user1", "111", [1, 2, 3, 7]));
    users.push(new user(2, "user2", "222"));
    users.push(new user(3, "user3", "333"));
    users.push(new user(4, "user4", "444"));
    users.push(new user(5, "user5", "555"));
    counter = users.length;
  }
  static generatetoken(id, username) {
    console.log("token");
    const token = jwt.sign(
      { userid: id, username: username },
      process.env.TOKEN_KEY || "geoMusic",
      {
        expiresIn: '12000s',/*process.env.TOKEN_EXPIRE.toString() ||*/
      }
    );
    // save user token
    return token;
  }
  static login(username, password) {
    let user = users.find(
      (u) => u.username == username && u.password == password
    );
    if (user) {
      //const token = Math.random().toString();
      user.token = this.generatetoken(user.id, user.username);
      user.creationdate = Date.now();
      users.splice(
        users.lastIndexOf((u) => u.id == user.id),
        1,
        user
      );
      return { token: user.token, userid: user.id, username: user.username };
    } else {
      return { message: "error : invalid username or password" };
    }
  }

  static isValidToken(token) {
    try{
    console.log(token);
    const decoded = jwt.verify(token, config.TOKEN_KEY || "geoMusic");
    console.log("m");
    return decoded;
    }
    catch(error){
      return false;
    }
    // const index = users.findIndex(
    //   (u) => u.token == token && u.creationdate >= Date.now() - 1
    // );
    // if (index < 0) {
    //   return false;
    // }
    // return true;
  }
  static isValidRequest(request) {
    const header = request.headers["authorization"];

    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1];
      console.log(token);
      return this.isValidToken(token);
    } else {
      //If header is undefined return Forbidden (403)
      return false;
    }
  }
  static refreshToken(request) {
    try {
      console.log("j");
      if (this.isValidRequest(request)) {
        const header = request.headers["authorization"];
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.verify(token, config.TOKEN_KEY || "geoMusic");
        console.log(decoded);
        return {
          token: this.generatetoken(decoded.userid, decoded.username),
          userid: decoded.userid,
          username: decoded.username,
        };
      } else {
        return { message: "error : invalid tokden" };
      }
    } catch (error) {
      console.log(error);
      return { message: "error : invalid tokden" };
    }
  }
  static getUserbyRequest(request) {
    const header = request.headers["authorization"];
    const bearer = header.split(" ");
    const token = bearer[1];
    const decoded = jwt.verify(token, config.TOKEN_KEY || "geoMusic");
    console.log(decoded);
    return users.find((u) => u.id == decoded.userid);
  }
  static fetchAllPlaylist(request) {
    console.log(this.getUserbyRequest(request).playlist);
    return Songs.fetchAlliList(this.getUserbyRequest(request).playlist);
  }

  static addSongtoPlaylist(requst, songid) {
    console.log("added");
    let user = this.getUserbyRequest(requst);
    if (user.playlist.findIndex((s) => s == songid) < 0) {
      user.playlist.push(parseInt(songid));
      let index = users.findIndex((u) => u.id == user.id);
      users.splice(index, 1, user);
    }
    return user.playlist;
  }
  static removeSongfromPlaylist(requst, songid) {
    console.log("remove");
    let user = this.getUserbyRequest(requst);
    if (user.playlist.findIndex((s) => s == songid) >-1) {
      let indexsong = user.playlist.findIndex((s) => s == songid);
      user.playlist.splice(indexsong, 1);
      let index = users.findIndex((u) => u.id == user.id);
      users.splice(index, 1, user);
      return user.playlist;
    }
    return user.playlist;
  }
};
