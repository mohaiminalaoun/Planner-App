export function randomize() {
  console.log("Randomize");
  var divs = document.getElementsByClassName("task-title");
  var divList = Array.prototype.slice.call(divs);
  window.tasks = JSON.stringify(this.state.tasks);
  let newTasks = this.state.tasks;
  newTasks.forEach(task => {
    task.task = "Loren ipsum upton park";
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
