import db from "./db";
// Function to show the context menu
export function showDeadlineContextMenu(ev) {
  this.setState({
    displayAllContextMenus: true,
    displayCurtain: window.screen.width < 500 ? false : true, // hack for mobile TODO: fix later
    tempTask: ev.currentTarget.value,
    tempPosition: [ev.clientX, ev.clientY]
  });
}

export function deadlineChangeFn(time) {
  this.setState({
    curDeadline: time
  });
}

export function endTimeCloseFn() {
  let tasks = this.state.tasks.concat();
  let curTask = this.state.tempTask;
  this.setState({
    displayTaskCtxMenu: false
  });
  if (this.state.curDeadline) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === curTask) {
        tasks[i].end = this.state.curDeadline;
        break;
      }
    }
    this.setState({
      tasks: tasks
    });

    let firstMatch;
    db.tasks
      .where("task")
      .equalsIgnoreCase(curTask)
      .first(item => {
        //if (Number.isInteger(end)) {
        firstMatch = item;
        //let endTime = Moment().add(end, "hour");
        if (firstMatch) {
          db.tasks.put({
            userName: this.props.userName,
            task: curTask,
            richText: firstMatch.richText,
            endTime: this.state.curDeadline,
            id: firstMatch.id,
            label: firstMatch.label,
            selectedLabelIdx: firstMatch.selectedLabelIdx
          });
        }
        //  }
      });
  }
  this.setState({
    tempTask: ""
    //curDeadline: ""
  });
}
