const apiurl = "http://localhost:3000/";
window.onload = function () {
  document.getElementById("login-btn").onclick = function (event) {
    event.preventDefault();
    login();
    console.log("onclick");
  };
  document.getElementById("logoutform").style.display = "none";
  document.getElementById("logout-btn").onclick = function (event) {
    event.preventDefault();
    logout();
    console.log("onclick");
  };
  fillifToken();
};
async function login() {
  console.log("login");
  let isok = false;
  let result = await fetch(apiurl + "users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
  }).then((res) => {
    isok = res.ok;
    return res.json();
  });
  console.log(result);
  //result=result.json();
  console.log(isok);
  if (isok) {
    //save token
    // Save data to sessionStorage .json()
    sessionStorage.setItem("token", result.token);
    sessionStorage.setItem("userid", result.userid);
    fillifToken();
    // Get saved data from sessionStorage
    //let data = sessionStorage.getItem('key');
  } else {
    errorlabel(result.message, true);
    console.log(result);
  }
  //  document.getElementById('product-form').reset();
  //renderBook(result);
}
async function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.clear();
  document.getElementById("loginform").style.display = "block";
  document.getElementById("logoutform").style.display = "none";
  document.getElementById("intersted").style.display = "none";
  document.getElementById("playlist").style.display = "none";
}
function errorlabel(message = "", isdisplay) {
  let errorlabel = document.getElementById("errorlabel");
  errorlabel.innerHTML = message;
  if (isdisplay) errorlabel.style.display = "block";
  else errorlabel.style.display = "none";
  console.log("err");
}
async function fillifToken() {
  let token = sessionStorage.getItem("token");
  console.log("klj", token);
  errorlabel(null, false);
  if (!token) {
    logout();
    return;
  } else {
    //check token
    let isok = false;
    let result = await fetch(apiurl + "users/refreshtoken", {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((res) => {
      isok = res.ok;
      return res.json();
    });
    console.log(result);
    //result=result.json();
    console.log(isok);
    if (isok) {
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("userid",result.userid);
      document.getElementById("loginform").style.display = "none";
      console.log("hide");
      document.getElementById("logoutform").style.display = "block";
      document.getElementById("welcomeuser").innerHTML =
        "Welcome " + result.username;
      fillUserData();
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      document.getElementById("intersted").style.display = "none";
    }
  }
}
