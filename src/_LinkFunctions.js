// Functions for the link
import db from "./db";
export function linkCloseFn() {
  this.setState({
    displayLinkCtxMenu: false,
    currentURL: "",
    currentURLText: ""
  });
}

export function saveLinkFn() {
  let { currentURL, currentURLText, tempTask } = this.state,
    tasks = this.state.tasks.concat();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].task === tempTask) {
      tasks[i].url = currentURL;
      tasks[i].urlText = currentURLText;
      break;
    }
  }
  db.tasks
    .where("task")
    .equalsIgnoreCase(tempTask)
    .first(item => {
      let firstMatch = item;
      db.tasks.put({
        userName: this.props.userName,
        task: tempTask,
        endTime: firstMatch.endTime,
        url: currentURL,
        urlText: currentURLText,
        id: firstMatch.id
      });
    });
  this.setState({
    displayLinkCtxMenu: false,
    tasks: tasks,
    currentURL: "",
    currentURLText: ""
  });
}

export function changeURLTextFn(ev) {
  this.setState({
    currentURLText: ev.target.value
  });
}

export function changeURLFn(ev) {
  this.setState({
    currentURL: ev.target.value
  });
}
