export function startDrag(ev) {
  //console.log(ev.clientY);
  var div = document.getElementById("drag_temp"),
    left,
    top;
  if (div) div.style.opacity = "1";
  if (div) {
    left = parseInt(div.style.left);
    top = parseInt(div.style.top);
  }
  if (!isNaN(left)) {
    window.__pastLeft = left;
  }
  if (div && ev.clientX !== 0 && ev.clientY !== 0) {
    if (!window.__pastLeft || Math.abs(window.__pastLeft - ev.clientX) > 2) {
      div.style.left = ev.clientX + 5 + "px";
      div.style.top = ev.clientY + 5 + "px";
    }
  }

  if (this.state.currentDraggingTask === null) {
    var div =
      document.getElementById("drag_temp") || document.createElement("div");
    div.style.opacity = "1";
    div.setAttribute("id", "drag_temp");
    div.innerText = "Move Item";
    let rootDiv = document.getElementById("root");
    rootDiv.appendChild(div);

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
    i, // index of dropped area
    idx = 0, // index of dragging task
    curDragTask = this.state.currentDraggingTask;
  console.log(curDragTask);

  for (idx = 0; idx < tasks.length; idx++) {
    if (tasks[idx] && tasks[idx].task === curDragTask.task) {
      break;
    }
  }
  tasks = tasks.slice(0, idx).concat(tasks.slice(idx + 1, tasks.length));
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].task === task) {
      break;
    }
  }
  let firstHalf = tasks.slice(0, i + 1);
  if (this.state.currentDraggingTask !== null) {
    firstHalf.push({
      task: curDragTask.task,
      end: curDragTask.end,
      url: curDragTask.url,
      urlText: curDragTask.urlText,
      progressPercent: curDragTask.progressPercent,
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

export function onDragEnd() {
  var div = document.getElementById("drag_temp");
  if (div) div.style.opacity = "0";
  if (this.state.currentDraggingTask) {
    this.setState({
      currentDraggingTask: null
    });
  }
}
