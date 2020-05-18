export function randomize() {
  console.log("Randomize");
  var divs = document.getElementsByClassName("task-title");
  var divList = Array.prototype.slice.call(divs);
  window.tasks = JSON.stringify(this.state.tasks);
  let newTasks = this.state.tasks;
  var string =
    "Upstream delivers practical solutions for preventing problems rather than reacting to them. How many problems in our lives and in society are we tolerating simply because we’ve forgotten that we can fix them?";
  newTasks.forEach(task => {
    let startIdx = Math.floor(Math.random() * string.length);
    task.task =
      ".." +
      string.slice(startIdx, Math.min(startIdx + 40, string.length)) +
      "...";
  });
  this.setState({
    tasks: newTasks
  });
}
export function deRandomize() {
  let oldtasks = JSON.parse(window.tasks);
  delete window.tasks;
  this.setState({
    tasks: oldtasks
  });
}
