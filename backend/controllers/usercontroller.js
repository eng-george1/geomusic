const users = require('../models/users')

users.loadData();
exports.login = (req,res,next) => {
    console.log(req.body);
    console.log(users.login(req.body.username , req.body.password) );
    res.status(200).json(users.login(req.body.username , req.body.password )); 
    res.end();
};

exports.isValidToken = (token) => {
    res.status(200).json(users.isValidToken(token)); 
} ;
