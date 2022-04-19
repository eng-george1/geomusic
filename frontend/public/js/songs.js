function fillUserData() {
    document.getElementById("intersted").style.display = "block";
    document.getElementById("playlist").style.display = "block";
  getSongs();
  getPlaylist();
}
async function getSongs() {
  let isok = false;
  let result = await fetch(apiurl + "songs/", {
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
  let placeholder = document.querySelector("#data-output");
  let out = "";
  for (let song of songs) {
    out += `
			<tr>
				
				<td>${song.id}</td>
				<td>${song.title}</td>
				<td>${song.releasedate}</td>
				<td> <button type="submit" class="active" onclick='addtoList(${song.id})'><i class="fa fa-plus"></i></td>
			</tr>
		`;
  }

  placeholder.innerHTML = out;
}
async function addtoList(id) {
    console.log(id);
    console.log(id,"add");
    let isok=false;
    let result = await fetch(apiurl + "users/playlist/songs/"+id+"/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": 'Bearer '+sessionStorage.getItem("token"),
        },
      }).then((res) =>res.json());
      console.log("g");
      let songs = result;
      getPlaylist();
}
