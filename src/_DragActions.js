export function startDrag(ev) {
  if (this.state.currentDraggingTask === null) {
    let title = ev.currentTarget.getAttribute("value"),
      tasks = this.state.tasks,
      deletedTask = null,
      i;
    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].task === title) {
        deletedTask = tasks[i];
        break;
      }
    }
    this.setState({
      tasks: tasks,
      currentDraggingTask: deletedTask
    });
  }
}

export function stopDrag(task) {
  let tasks = this.state.tasks,
    i,
    idx = 0,
    curDragTask = this.state.currentDraggingTask;
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].task === task) {
      break;
    }
  }
  for (idx = 0; idx < tasks.length; idx++) {
    if (tasks[idx].task === curDragTask.task) {
      break;
    }
  }
  tasks = tasks.slice(0, idx).concat(tasks.slice(idx + 1, tasks.length));
  let firstHalf = tasks.slice(0, i + 1);
  if (this.state.currentDraggingTask !== null) {
    firstHalf.push({
      task: curDragTask.task,
      end: curDragTask.end,
      url: curDragTask.url,
      urlText: curDragTask.urlText,
      progressState: curDragTask.progressState,
      label: curDragTask.label,
      selectedLabelIdx: curDragTask.selectedLabelIdx
    });
    tasks = firstHalf.concat(tasks.slice(i + 1, tasks.length));
    this.setState({
      tasks: tasks,
      currentDraggingTask: null
    });
  }
}

export function onDragEnd() {}
