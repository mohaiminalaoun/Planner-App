import db from "./db";

export function responseFacebook(res) {
  let tasks = [],
    labels = new Set(); // we're going to use a Set to store the labels
  window.localStorage.setItem("todousername", res.name);
  db.tasks
    .where("userName")
    .equalsIgnoreCase(res.name)
    .each(rec => {
      if (rec.label) {
        labels.add(rec.label);
      }
      tasks.push({
        task: rec.task,
        end: rec.endTime,
        url: rec.url,
        urlText: rec.urlText,
        progressPercent: rec.progressPercent,
        label: rec.label,
        selectedLabelIdx: rec.selectedLabelIdx
      });
    })
    .then(() => {
      this.props.facebookLoginDispatch({
        loggedin: true,
        userName: res.name || "Hello"
      });
      if (tasks.length === 0) {
        tasks.push({
          task: "Add a task like this!",
          end: new Date(),
          url: "www.google.com",
          urlText: "Add a link like this",
          progressPercent: 10,
          label: "Label",
          selectedLabelIdx: 1
        });
      }
      this.setState({
        tasks: tasks,
        labels: labels
      });
    });
}

export function logOutFacebook() {
  window.localStorage.removeItem("todousername");
  window.FB.logout();
  this.props.facebookLoginDispatch({
    loggedin: false,
    userName: "User"
  });
}
