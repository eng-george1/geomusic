
async function getPlaylist() {
  let isok = false;
  let result = await fetch(apiurl + "users/playlist", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": 'Bearer '+sessionStorage.getItem("token"),
    },
  }).then((res) => {
    isok = res.ok;
    return res.json();
  });
  let songs = result;
  let placeholder = document.querySelector("#playlistoutput");
  let out = "";
  for (let song of songs) {
    out += `
			<tr>
				
				<td>${song.id}</td>
				<td>${song.title}</td>
				<td>${song.releasedate}</td>
				<td> <button type="submit"  onclick='removefromList(${song.id})'><i class="fa fa-minus"></i></button>&nbsp;&nbsp;&nbsp;<button type="submit"  class="active" onclick='playSong(${song.id})'><i class="fa fa-play"></i></button></td>
			</tr>
		`;
  }

  placeholder.innerHTML = out;
}
async function removefromList(id) {
  console.log(id);
  console.log(id,"add");
  let isok=false;
  let result = await fetch(apiurl + "users/playlist/songs/"+id+"/", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": 'Bearer '+sessionStorage.getItem("token"),
      },
    }).then((res) => {
      isok = res.ok;
      return res.json();
    });
    console.log("g");
    let songs = result;
   getPlaylist();
}

