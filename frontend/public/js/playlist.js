
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
  console.log(songs);
  let placeholder = document.querySelector("#playlistoutput");
  let out = "";
  if(songs.length==0){
  
  out += `
  <tr>    
  <td style="text-align: center" colspan="4">No songs in your list</td>
  </tr>
`;
placeholder.innerHTML = out;
  }
  for (let song of songs) {
    out += `
			<tr>
				
				<td style="text-align: center">${song.id}</td>
				<td>${song.title}</td>
				<td style="text-align: center">${song.releasedate}</td>
				<td class="trButton"> <button type="submit"  onclick='removefromList(${song.id})'><i class="fa fa-minus fa-3x"></i></button>&nbsp;&nbsp;&nbsp;<button type="submit"  class="active" onclick='playSong(${song.id})'><i class="fa fa-play fa-3x"></i></button></td>
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

