const users = require('../models/users')
users.loadData();
console.log("hh");
let token=users.login("user2","222");
console.log(token);
setTimeout(()=> console.log( users.isValidToken(token.token)),1000); 