
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
				<td> <button type="submit" class="active" onclick='addtoList(${song.id})'><i class="fa fa-plus"></i></td>
			</tr>
		`;
  }

  placeholder.innerHTML = out;
}
function addtoList(id) {
    console.log("add");
}
