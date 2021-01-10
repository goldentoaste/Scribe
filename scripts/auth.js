





const signupButton = document.getElementById("signup-button");

if (signupButton != null){
    signupButton.addEventListener("click", e => {

        //get info 
        const pass = document.getElementById("signup-password").value;
        const email = document.getElementById("signup-email").value;
        const name = document.getElementById("signup-name").value;
    
        //sign up user
        auth.createUserWithEmailAndPassword(email, pass).then(cred => {
            cred.user.updateProfile({displayName:name});
            //redir to main page
            window.location.href ="project.html";
        }).catch(err =>{
                window.alert(`${err.message}"`);
        });
    });
    
}

const loginButton = document.getElementById('login-button');
if (loginButton != null){
    loginButton.addEventListener("click", e => {
        const pass = document.getElementById("login-password").value;
        const email = document.getElementById("login-email").value;
        console.log('entered event');
        auth.signInWithEmailAndPassword(email, pass).then(cred =>{
            console.log(cred.user);
            window.location.href ="graphTestings.html";
        }).catch(err=>{
                console.log(err.message)
            });
    })
    
}

const test = document.getElementById('test-button');

if (test != null){
    test.addEventListener("click", e=>{
        console.log(auth.currentUser);
    });
}
