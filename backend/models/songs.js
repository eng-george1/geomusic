const jwt = require("jsonwebtoken");
const path=require("path");
const songs = [];
let counter = 0;
const config = process.env;
module.exports = class song {
  constructor(id, title, releasedate) {
    this.id = id;
    this.title = title;
    this.releasedate = releasedate;
  }

  static loadData() {
    songs.push(new song(1, "Bas-Eyes-On-You", "2020-01-01"));
    songs.push(new song(2, "Cascada_Another_You", "2020-01-01"));
    songs.push(new song(3, "Dame_Shirley_Bassey_Diamonds_Are_F", "2020-01-01"));
    songs.push(new song(4, "Polo-G-Young-N-Dumb", "2020-01-01"));
    songs.push(new song(5, "Sad_Slow_Songs_Eva_Cassidy", "2020-01-01"));
    songs.push(new song(6, "Soulja-Boy-Blue-Cheese", "2020-01-01"));
    songs.push(new song(7, "YESTERDAY_WHEN_I_WAS_YOUNG", "2020-01-01"));
    counter = songs.length;
  }
  static fetchAll(){    
    return songs;
  }
  static getById(id){
    return songs.find(s=>s.id===id);
  }
  static search(keywords)
  {
    return songs.filter(s=>s.title.toString().toLowerCase().includes(keywords.toString().toLowerCase()));
  }
  static fetchAlliList(list){    
    // return songs.filter(s=>list.includes(s.id));
    return list.map(e=>songs.find(s=>s.id==e));
  }
 static getSongFile(songId){
   return path.join(__dirname,"..","songs",songs.find(s=>s.id==songId).title+".mp3") 
  }

};