const users = [] ; 
let counter=0;
module.exports = class user{
    constructor(id , username , password){
        this.id = id ;
        this.username = username ;
        this.password = password ;
    }

    static loadData ()
    {
        users.push(new user (1 , "user1","111"));
        users.push(new user (2 , "user2","222"));
        users.push(new user (3 , "user3","333"));
        users.push(new user (4 , "user4","444"));
        users.push(new user (5 , "user5","555"));
        counter=users.length;
    }
    
    static login (username , password){
    let user = users.find(u => u.username == username && u.password == password);
        if(user)
        { 
            const token = Math.random().toString();
            user.token = token ;
            user.creationdate = Date.now();
            users.splice(index,1,user);
            return user.token ;
          
        }else {
             return {message : "error : username not found " } ; 
        }
    }
    static isValidToken(token){
        const index = users.findIndex(u => u.token == token && u.creationdate >= Date.now() - 1 )
        if(index < 0 )
        {
         return false ;
        } 
        return true ;
    }
    static getRandomInt() {
        min = 1;
        max = 100;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}

