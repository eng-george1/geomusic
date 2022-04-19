let playlist = [];
let playlistorginal = [];
let currentsongindex = 0;
let currentmode = 1;
async function playSong(songid) {
  // let result = await fetch(apiurl + "songs/play/"+songid+"/", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "Authorization": 'Bearer '+sessionStorage.getItem("token"),
  //     },
  //   }).then((res) =>res.json());
  //   console.log("g");
  //   let song = result;

  
  let isok = false;
  let result = await fetch(apiurl + "users/playlist", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  }).then((res) => {
    isok = res.ok;
    return res.json();
  });
  if(!isok){
    logout();
    return;
  }
  else{
  var audio = document.getElementById("audio");
  var source = document.getElementById("audioSource");
  source.src = "http://localhost:3000/songs/play/" + songid;
  //console.log(song);
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
  let songs = result;
  playlist = songs;
  playlistorginal = [...songs];
  currentsongindex = playlist.findIndex((s) => s.id == songid);
  console.log(playlist, currentsongindex);
  document.getElementById("playsongname").innerHTML =
    playlist[currentsongindex].title;}
}

function playforward() {
  if(currentmode==2)
  playlist =shuffleArray(playlistorginal);
  var audio = document.getElementById("audio");
  var source = document.getElementById("audioSource");
  console.log(playlist, currentsongindex);
  if (currentsongindex == playlist.length - 1) {
    currentsongindex = 0;
  } else {
    currentsongindex = currentsongindex + 1;
  }
  console.log(source.src[source.src.length-1],"->",playlist[currentsongindex].id);
  if(source.src[source.src.length-1].toString()== playlist[currentsongindex].id){
    console.log("rep");
  playlist =shuffleArray(playlistorginal);}
  source.src =
    "http://localhost:3000/songs/play/" + playlist[currentsongindex].id;
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
  document.getElementById("playsongname").innerHTML =
    playlist[currentsongindex].title;
}
function playbackward() {
  if(currentmode==2)
  playlist =shuffleArray(playlistorginal);
  var audio = document.getElementById("audio");
  var source = document.getElementById("audioSource");
  if (currentsongindex == 0) {
    currentsongindex = playlist.length - 1;
  } else {
    currentsongindex = currentsongindex - 1;
  }
  console.log(source.src[source.src.length-1],"->",playlist[currentsongindex].id);
if(source.src[source.src.length-1].toString()== playlist[currentsongindex].id){
  console.log("rep");
playlist =shuffleArray(playlistorginal);}
  source.src =
    "http://localhost:3000/songs/play/" + playlist[currentsongindex].id;
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
  document.getElementById("playsongname").innerHTML =
    playlist[currentsongindex].title;
}
function playmode(mode) {
  console.log(currentmode);
  console.log(mode);
 // if (currentmode == mode) return;
  currentmode = mode;
  console.log(currentmode);
  switch (currentmode) {
    case 1:
      //normal
      playlist = [...playlistorginal];

      break;
    case 2:
      //shuffle
      console.log(playlist);
      // Used like so

      playlist =shuffleArray(playlistorginal);
      console.log(playlist);
      break;
    case 3:
      //normal
      playlist = [...playlistorginal];
      break;
    default:
      break;
  }
  selectmodebutton();
}
function selectmodebutton()
{
  document.getElementById("mode1").style.backgroundColor="#92bf92";
  document.getElementById("mode2").style.backgroundColor="#92bf92";
  document.getElementById("mode3").style.backgroundColor="#92bf92";
  document.getElementById("mode"+currentmode).style.backgroundColor="gray";
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
  
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));
                  
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
      
  return array;
}

