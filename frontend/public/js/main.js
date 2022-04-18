const apiurl = "http://localhost:3000/";
window.onload = function () {
  document.getElementById("login-btn").onclick = function (event) {
    event.preventDefault();
    login();
    console.log("onclick");
  };
  //document.getElementById("formlogin").action = apiurl + "users/login/";
  //console.log(document.getElementById('formlogin').action);
};
async function login() {
  console.log("login");
  let result = await fetch(apiurl + "users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
}).then(res => res.json());
  console.log(result);
//let resultjson=result.then(res => res.json());
  if (result.ok) {
    //save token
    // Save data to sessionStorage
    sessionStorage.setItem("token", result.token);
    errorlabel(null,false);
    // Get saved data from sessionStorage
    //let data = sessionStorage.getItem('key');
  } else {
    errorlabel(result.message,true);
     console.log(result);
  }
  //  document.getElementById('product-form').reset();
  //renderBook(result);
}
function errorlabel(message="",isdisplay){
    let errorlabel = document.getElementById("errorlabel");
        errorlabel.innerHTML = message;
    if(isdisplay)
    errorlabel.style.display = 'block';
    else
    errorlabel.style.display = 'none';

}
