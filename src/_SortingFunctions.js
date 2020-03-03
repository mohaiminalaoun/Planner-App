import Moment from "moment";
export function sortTasksByLabel() {
  let tasks = this.state.tasks;
  tasks.sort(function(a, b) {
    let textA = (a.label && a.label.toUpperCase()) || "Z",
      textB = (b.label && b.label.toUpperCase()) || "Z";
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  this.setState({
    tasks: tasks,
    displaySortingOptionsMenu: false,
    displayCurtain: false
  });
}

export function sortTasksByEndTime() {
  let tasks = this.state.tasks;
  tasks.sort(function(a, b) {
    if (!a.end) {
      a.end = Moment(new Date()).subtract(10, "years");
      a.removeEnd = true;
    }
    if (!b.end) {
      b.end = Moment(new Date()).subtract(10, "years");
      b.removeEnd = true;
    }
    return -1 * Moment(a.end).diff(Moment(b.end));
  });
  tasks.forEach(t => {
    if (t.removeEnd) t.end = undefined;
  });
  this.setState({
    tasks: tasks,
    displaySortingOptionsMenu: false,
    displayCurtain: false
  });
}

export function showSortingOptionsMenu(ev) {
  this.setState({
    displaySortingOptionsMenu: true,
    displayCurtain: window.screen.width > 500 ? true : false,
    tempPosition: [ev.clientX, ev.clientY]
  });
}
