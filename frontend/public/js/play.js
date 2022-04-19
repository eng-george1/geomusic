 function playSong(songid) {
  
    // let result = await fetch(apiurl + "songs/play/"+songid+"/", {
    //     method: "GET",
    //     headers: {
    //       "Content-type": "application/json",
    //       "Authorization": 'Bearer '+sessionStorage.getItem("token"),
    //     },
    //   }).then((res) =>res.json());
    //   console.log("g");
    //   let song = result;
    
    var audio = document.getElementById('audio');
  
    var source = document.getElementById('audioSource');
    source.src = "http://localhost:3000/songs/play/"+songid;
  //console.log(song);
    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away
  };