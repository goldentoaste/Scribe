

var provider = new firebase.auth.GoogleAuthProvider();

//sign up




const signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", e => {

    //get info 
    const pass = document.getElementById("signup-password").value;
    const email = document.getElementById("signup-email").value;
    const name = document.getElementById("signup-name").value;

    //sign up user
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
        cred.user.updateProfile({displayName:name});
        //redir to main page
        window.location.href ="app.html";
    }).catch(err =>{
            window.alert(`${err.message}"`);
    });
});


