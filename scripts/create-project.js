if (localStorage.getItem("title") != null) {
  $("#title").val(localStorage.getItem("title"));
}

if (localStorage.getItem("goal") != null) {
  $("#goal").val(localStorage.getItem("goal"));
}

if (localStorage.getItem("days") != null) {
  $("#days").val(localStorage.getItem("days"));
}

if (localStorage.getItem("date") != null) {
  $("#date").val(localStorage.getItem("date"));
}

$("#create-button").click(function () {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes();

  let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;

  let promise = db.collection("projects").add({
    title: localStorage.getItem("title"),
    goal: localStorage.getItem("goal"),
    days: localStorage.getItem("days"),
    authorid: user.uid,
    studentname: user.displayName,
    time: d,
    date: date,
  });

  promise.then(function () {
    localStorage.removeItem("title");
    localStorage.removeItem("goal");
    localStorage.removeItem("days");
    localStorage.removeItem("date");
    window.location.href = "/home";
  });
});
