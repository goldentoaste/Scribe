


const signupButton = document.getElementById("signup-button");

if (signupButton){
    signupButton.addEventListener("click",e => {
        console.log("testing");
        window.location.replace("signup.html");
    });
    
}