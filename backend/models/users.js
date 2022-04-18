const jwt = require("jsonwebtoken");
const users = [];
let counter = 0;
const config = process.env;
module.exports = class user {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static loadData() {
    users.push(new user(1, "user1", "111"));
    users.push(new user(2, "user2", "222"));
    users.push(new user(3, "user3", "333"));
    users.push(new user(4, "user4", "444"));
    users.push(new user(5, "user5", "555"));
    counter = users.length;
  }
  static generatetoken(user) {
    console.log("token");
    const token = jwt.sign(
      { user_id: user.id },
      process.env.TOKEN_KEY || "geoMusic",
      {
        expiresIn: process.env.TOKEN_EXPIRE || "2s",
      }
    );
    // save user token
    user.token = token;
  }
  static login(username, password) {
    let user = users.find(
      (u) => u.username == username && u.password == password
    );
    if (user) {
      //const token = Math.random().toString();
      this.generatetoken(user);
      user.creationdate = Date.now();
      users.splice(
        users.lastIndexOf((u) => u.id == user.id),
        1,
        user
      );
      return { token: user.token };
    } else {
      return { message: "error : invalid username or password" };
    }
  }

  static isValidToken(token) {
    const decoded = jwt.verify(token, config.TOKEN_KEY || "geoMusic");
    console.log(decoded);
    return decoded;
    const index = users.findIndex(
      (u) => u.token == token && u.creationdate >= Date.now() - 1
    );
    if (index < 0) {
      return false;
    }
    return true;
  }
};
