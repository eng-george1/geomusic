let playlist = [];
let currentsongindex = 0;
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
  currentsongindex = playlist.findIndex((s) => s.id == songid);
  console.log(playlist, currentsongindex);
  document.getElementById("playsongname").innerHTML=playlist[currentsongindex].title;
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
  source.src = "http://localhost:3000/songs/play/" + playlist[currentsongindex].id;
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
  document.getElementById("playsongname").innerHTML=playlist[currentsongindex].title;
}
function playbackward() {
  var audio = document.getElementById("audio");
  var source = document.getElementById("audioSource");
  if (currentsongindex == 0) {
    currentsongindex = playlist.length - 1;
  } else {
    currentsongindex = currentsongindex - 1;
  }

  source.src = "http://localhost:3000/songs/play/" + playlist[currentsongindex].id;
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
  document.getElementById("playsongname").innerHTML=playlist[currentsongindex].title;
}
