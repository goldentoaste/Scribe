

auth.onAuthStateChanged(user => {
  console.log(user);
  if (user){
    showName();
  }
})

function showName() {
  document.getElementById("title-name").innerHTML = auth.currentUser.displayName;
 
  console.log("woah");
}
