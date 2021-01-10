

var provider = new firebase.auth.GoogleAuthProvider();

//sign up




const signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", e => {

    //get info 
    const pass = document.getElementById("signup-password").value;
    const email = document.getElementById("signup-email").value;

    //sign up user
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
        console.log(cred.user);
        
        //redir to main page
        window.location.replace("app.html");
    }).catch(err =>{
            window.alert(`${err.message}"`);
    });
});


