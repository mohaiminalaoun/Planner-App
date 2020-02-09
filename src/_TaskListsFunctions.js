import db from "./db";

export function addToList(ev) {
  if (this.state.curTask.trim().length >= 1) {
    let curTask = this.state.curTask;
    let tasks = this.state.tasks;
    tasks.push({
      task: curTask
    });
    this.setState({
      tasks: tasks,
      curTask: ""
    });
    db.tasks.put({ userName: this.props.userName, task: curTask });
  }
}

export function deleteTask(tempTask) {
  let tasks = this.state.tasks,
    curTask = tempTask,
    idx;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].task === curTask) {
      idx = i;
      break;
    }
  }
  tasks = tasks.slice(0, idx).concat(tasks.slice(idx + 1, tasks.length));

  this.setState({
    tasks: tasks,
    showDeletedAnimation: true,
    displayDeleteCtxMenu: false,
    displayCurtain: false
  });
  db.tasks
    .where("task")
    .equalsIgnoreCase(curTask)
    .delete();

  setTimeout(() => {
    this.setState({
      showDeletedAnimation: false
    });
  }, 3000);
}

export function handleInputChange(ev) {
  let val = ev.target.value;
  if (val.length < 50) {
    this.setState({
      curTask: ev.target.value
    });
  }
}
