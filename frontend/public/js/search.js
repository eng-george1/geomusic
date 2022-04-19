async function searchsongs() {
  event.preventDefault();
 // console.log(document.getElementById("searchinput").value);
  if (document.getElementById("searchinput").value == "") {
    //alert("Please complete the missing search key");
   // return;
   getSongs();
   return;
  }
  
  let result = await fetch(apiurl + "songs/search", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": 'Bearer '+sessionStorage.getItem("token"),
    },
    body: JSON.stringify({
      searchKey: document.getElementById("searchinput").value,
    }),
  }).then((res) => {
    isok = res.ok;
    return res.json();
  });
  console.log(result);
  //result=result.json();
  console.log(isok);
  if (isok) {
    let songs = result;
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let song of songs) {
      out += `
              <tr>
                  
                  <td style="text-align: center">${song.id}</td>
                  <td>${song.title}</td>
                  <td style="text-align: center">${song.releasedate}</td>
                  <td class="trButton"> <button type="submit" class="active" onclick='addtoList(${song.id})'><i class="fa fa-plus fa-3x"></i></td>
              </tr>
          `;
    }

    placeholder.innerHTML = out;
  }
}
