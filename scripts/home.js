$(document).ready(function () {
  showName();
});

function showName() {
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementsByClassName("user-name").innerHTML =
      auth.currentUser.displayName;
  });
}
