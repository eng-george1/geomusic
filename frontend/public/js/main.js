document.getElementById('login-btn').onclick = function(event) {
    event.preventDefault();
   login();
}
async function login() {
    let result = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        })
    }).then(res => res.json());
    if(res.ok)
    {
        //save token
    }else{
        alert("Wrong username or passowrd");
    }
  //  document.getElementById('product-form').reset();
    //renderBook(result);
}