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

  var audio = document.getElementById("audio");

  var source = document.getElementById("audioSource");
  source.src = "http://localhost:3000/songs/play/" + songid;
  //console.log(song);
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
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
  let songs = result;
  playlist = songs;
  playlistorginal = [...songs];
  currentsongindex = playlist.findIndex((s) => s.id == songid);
  console.log(playlist, currentsongindex);
  document.getElementById("playsongname").innerHTML =
    playlist[currentsongindex].title;
}

function playforward() {
  var audio = document.getElementById("audio");
  var source = document.getElementById("audioSource");
  console.log(playlist, currentsongindex);
  if (currentsongindex == playlist.length - 1) {
    currentsongindex = 0;
  } else {
    currentsongindex = currentsongindex + 1;
  }
  source.src =
    "http://localhost:3000/songs/play/" + playlist[currentsongindex].id;
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
  document.getElementById("playsongname").innerHTML =
    playlist[currentsongindex].title;
}
function playbackward() {
  var audio = document.getElementById("audio");
  var source = document.getElementById("audioSource");
  if (currentsongindex == 0) {
    currentsongindex = playlist.length - 1;
  } else {
    currentsongindex = currentsongindex - 1;
  }

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
  if (currentmode == mode) return;
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
      playlist = playlist.sort(() => Math.random() - 0.5);
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
