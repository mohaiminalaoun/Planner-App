import db from "./db";

export function saveLabel() {
  let curLabel = this.state.currentLabel,
    curTask = this.state.tempTask,
    stateLabels = this.state.labels;
  stateLabels.add(curLabel);
  db.tasks
    .where("task")
    .equalsIgnoreCase(curTask)
    .first(item => {
      let firstMatch = item;
      db.tasks.put({
        userName: this.props.userName,
        task: curTask,
        endTime: firstMatch.endTime,
        url: firstMatch.url,
        urlText: firstMatch.urlText,
        progressState: firstMatch.progressState,
        id: firstMatch.id,
        label: curLabel,
        selectedLabelIdx: this.state.selectedLabelIdx
      });
    });
  let tasks = this.state.tasks.concat();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].task === curTask) {
      tasks[i].label = curLabel;
      tasks[i].selectedLabelIdx = this.state.selectedLabelIdx;
      break;
    }
  }
  this.setState({
    displayAllContextMenus: false,
    displayLabelCtxMenu: false,
    currentLabel: "",
    tasks: tasks,
    labels: stateLabels
  });
}

export function cancelSaveLabel() {
  this.setState({
    displayAllContextMenus: false,
    displayLabelCtxMenu: false,
    currentLabel: ""
  });
}

export function currentLabelChange(v) {
  this.setState({
    currentLabel: v.currentTarget.value
  });
}

export function selectedLabelIdxChange(v) {
  this.setState({
    selectedLabelIdx: v
  });
}

export function currentLabelChangeByClick(v) {
  this.setState({
    currentLabel: v
  });
}
