


const signupButton = document.getElementById("signup-button");

if (signupButton){
    signupButton.addEventListener("click",e => {
        console.log("testing");
        window.location.href = "signup.html";
    });
    
}

const loginButton = document.getElementById("login-button");

if (loginButton){
    loginButton.addEventListener("click",e => {
        window.location.href = "login.html";
    })
}