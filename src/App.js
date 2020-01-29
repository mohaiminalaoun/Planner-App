import React from "react";
import Moment from "moment";
import "./App.scss";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";

import FacebookLogin from "react-facebook-login";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextMenuContainer from "./contextMenus/ContextMenuContainer";
import TaskModal from "./TaskModal";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import {
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  Accordion,
  Card,
  ProgressBar,
  Badge
} from "react-bootstrap";
import db from "./db";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curDeadline: "",
      tasks: [],
      shouldShowColors: false,
      tempPosition: [],
      curTask: "",
      tempTask: "",
      displayAllContextMenus: false,
      displaySortingOptionsMenu: false,
      displayTaskCtxMenu: false,
      displayLinkCtxMenu: false,
      displayLabelCtxMenu: false,
      displayDeleteCtxMenu: false,
      displayCurtain: false,
      currentURL: "",
      currentURLText: "",
      showModal: false,
      currentModalTask: {},
      currentRichText: "",
      currentLabel: "",
      didRichTextChange: false,
      selectedLabelIdx: 0,
      labels: new Set(),
      menuOptionsList: [
        {
          text: "Add deadline",
          onClick: () => {
            this.setState({
              displayAllContextMenus: false,
              displayTaskCtxMenu: true,
              displayCurtain: false
            });
          }
        },
        {
          text: "Add link",
          onClick: () => {
            this.setState({
              displayAllContextMenus: false,
              displayLinkCtxMenu: true,
              displayCurtain: false
            });
          }
        },
        {
          text: "Add Label",
          onClick: () => {
            let curLabel = "";
            this.state.tasks.forEach(task => {
              if (task.task === this.state.tempTask) {
                curLabel = task.label;
              }
            });
            this.setState({
              displayAllContextMenus: false,
              displayLabelCtxMenu: true,
              currentLabel: curLabel,
              displayCurtain: false
            });
          }
        }
      ],
      sortingOptions: [
        {
          text: "Sort By Label",
          onClick: () => {
            this.sortTasksByLabel();
          }
        },
        {
          text: "Sort By Deadline",
          onClick: () => {
            this.sortTasksByEndTime();
          }
        }
      ]
    };
  }

  componentDidMount = () => {
    if (window.localStorage.getItem("todousername") !== null) {
      this.responseFacebook({
        name: window.localStorage.getItem("todousername")
      });
    }
  };

  responseFacebook = res => {
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
          progressState: rec.progressState,
          label: rec.label,
          selectedLabelIdx: rec.selectedLabelIdx
        });
      })
      .then(() => {
        this.props.facebookLoginDispatch({
          loggedin: true,
          userName: res.name
        });
        this.setState({
          tasks: tasks,
          labels: labels
        });
      });
  };

  logOutFacebook = () => {
    window.localStorage.removeItem("todousername");
    window.FB.logout();
    this.props.facebookLoginDispatch({
      loggedin: false,
      userName: "User"
    });
  };

  addToList = ev => {
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
  };

  closeAllCtxMenus = () => {
    console.log("clicked close all context menus fn");
    this.setState({
      displayAllContextMenus: false,
      displaySortingOptionsMenu: false,
      displayCurtain: false,
      displayDeleteCtxMenu: false
    });
  };

  handleInputChange = ev => {
    this.setState({
      curTask: ev.target.value
    });
  };

  deleteTask = tempTask => {
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
      displayDeleteCtxMenu: false,
      displayCurtain: false
    });
    db.tasks
      .where("task")
      .equalsIgnoreCase(curTask)
      .delete();
  };

  // Function to show the context menu
  showDeadlineContextMenu = ev => {
    this.setState({
      displayAllContextMenus: true,
      displayCurtain: window.screen.width < 500 ? false : true, // hack for mobile TODO: fix later
      tempTask: ev.currentTarget.value,
      tempPosition: [ev.clientX, ev.clientY]
    });
  };

  endTimeCloseFn = () => {
    let tasks = this.state.tasks.concat();
    let curTask = this.state.tempTask;
    this.setState({
      displayTaskCtxMenu: false
    });
    let end = parseInt(this.state.curDeadline);
    if (Number.isInteger(end)) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].task === curTask) {
          tasks[i].end = Moment(new Date()).add(end, "hour")._d;
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
          if (Number.isInteger(end)) {
            firstMatch = item;
            let endTime = Moment().add(end, "hour");
            db.tasks.put({
              userName: this.props.userName,
              task: curTask,
              richText: firstMatch.richText,
              endTime: endTime._d,
              id: firstMatch.id,
              label: firstMatch.label,
              selectedLabelIdx: firstMatch.selectedLabelIdx
            });
          }
        });
    }
    this.setState({
      tempTask: "",
      curDeadline: ""
    });
  };

  // Functions for the link
  linkCloseFn = () => {
    this.setState({
      displayLinkCtxMenu: false,
      currentURL: "",
      currentURLText: ""
    });
  };

  saveLinkFn = () => {
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
  };

  deadlineChangeFn = ev => {
    this.setState({
      curDeadline: ev.target.value
    });
  };

  changeURLTextFn = ev => {
    this.setState({
      currentURLText: ev.target.value
    });
  };

  changeURLFn = ev => {
    this.setState({
      currentURL: ev.target.value
    });
  };

  // Function to save the state change of the task
  changeProgressState = param => {
    let progressState = param.currentTarget.value,
      curTask = param.currentTarget.getAttribute("task");
    // TODO: make this better
    param.currentTarget.parentElement.parentElement.classList.remove("show");

    let tasks = this.state.tasks.concat();
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === curTask) {
        tasks[i].progressState = progressState;
        break;
      }
    }
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
          progressState: progressState,
          id: firstMatch.id
        });
      });
    this.setState({
      displayLinkCtxMenu: false,
      tasks: tasks,
      currentURL: "",
      currentURLText: ""
    });
  };

  showColors = ev => {
    let curState = ev.currentTarget.value === "true";
    this.setState({
      shouldShowColors: !curState
    });
  };

  openTaskModal = ev => {
    let clickedTask = ev.currentTarget.getAttribute("value");
    db.tasks
      .where("task")
      .equalsIgnoreCase(clickedTask)
      .first(item => {
        this.setState({
          showModal: true,
          currentModalTask: item.task,
          currentModalTaskEnd: item.endTime,
          currentRichText: item.richText
        });
      });
  };

  handleQuillClose = () => {
    this.setState({
      showModal: false
    });
  };

  /*function to change current rich text (passed to the modal)*/
  richTextChange = v => {
    this.setState({
      currentRichText: v,
      didRichTextChange: true
    });
  };

  saveLabel = () => {
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
  };

  cancelSaveLabel = () => {
    this.setState({
      displayAllContextMenus: false,
      displayLabelCtxMenu: false,
      currentLabel: ""
    });
  };

  currentLabelChange = v => {
    this.setState({
      currentLabel: v.currentTarget.value
    });
  };

  selectedLabelIdxChange = v => {
    this.setState({
      selectedLabelIdx: v
    });
  };

  currentLabelChangeByClick = v => {
    this.setState({
      currentLabel: v
    });
  };

  sortTasksByLabel = () => {
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
  };

  sortTasksByEndTime = () => {
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
  };

  showSortingOptionsMenu = ev => {
    this.setState({
      displaySortingOptionsMenu: true,
      displayCurtain: true,
      tempPosition: [ev.clientX, ev.clientY]
    });
  };

  showDeleteContextMenu = ev => {
    this.setState({
      displayDeleteCtxMenu: true,
      displayCurtain: true,
      tempTask: ev.currentTarget.value,
      tempPosition: [ev.clientX, ev.clientY]
    });
  };

  cancelDelete = () => {
    this.setState({
      displayDeleteCtxMenu: false,
      displayCurtain: false
    });
  };

  render = () => {
    let listId = 0,
      {
        curDeadline,
        currentURL,
        currentURLText,
        curTask,
        displayAllContextMenus,
        displaySortingOptionsMenu,
        displayLinkCtxMenu,
        displayTaskCtxMenu,
        displayLabelCtxMenu,
        displayDeleteCtxMenu,
        menuOptionsList,
        tempPosition,
        shouldShowColors
      } = this.state,
      {
        addToList,
        changeProgressState,
        changeURLFn,
        changeURLTextFn,
        closeAllCtxMenus,
        endTimeCloseFn,
        deadlineChangeFn,
        deleteTask,
        handleInputChange,
        linkCloseFn,
        responseFacebook,
        saveLinkFn,
        showDeadlineContextMenu,
        showColors,
        saveLabel,
        cancelSaveLabel,
        showSortingOptionsMenu
      } = this;

    let { loggedin, userName } = this.props;

    const badgeOptions = [
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark"
    ];

    return (
      <>
        {this.state.displayCurtain ? (
          <div className="curtain" onClick={closeAllCtxMenus}></div>
        ) : null}
        <div className="App">
          {loggedin ? (
            <div className="checklist-container">
              <Button
                variant="secondary"
                className="logout-button"
                onClick={this.logOutFacebook}
              >
                {"Log out"}
              </Button>
              <div className="nameHeader">
                <div className="welcomeBar">
                  {"Welcome "}
                  <span className="userName">{userName}</span>
                </div>
                <div className="toggle-container">
                  <label>
                    <Toggle
                      defaultChecked={false}
                      onChange={showColors}
                      value={shouldShowColors}
                    />
                  </label>
                </div>
                <button
                  onClick={showSortingOptionsMenu}
                  className="sortIcon"
                ></button>
              </div>
              <TaskModal
                show={this.state.showModal}
                onHide={this.handleQuillClose}
                tasks={this.state.tasks}
                task={this.state.currentTask}
                userName={this.props.userName}
                onRichTextChange={this.richTextChange}
                currentModalTask={this.state.currentModalTask}
                currentModalTaskEnd={this.state.currentModalTaskEnd}
                didRichTextChange={this.state.didRichTextChange}
                richText={this.state.currentRichText}
                closeFn={this.handleQuillClose}
              ></TaskModal>
              {this.state.shouldShowColors ? (
                <Dashboard tasks={this.state.tasks} />
              ) : null}
              <InputGroup className="mb-3">
                <FormControl
                  onChange={handleInputChange}
                  value={curTask}
                  placeholder="Add task to do"
                  aria-label="Add task to do"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button onClick={addToList} variant="outline-secondary">
                    Add
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <ContextMenuContainer
                cancelDelete={this.cancelDelete}
                cancelSaveLabel={cancelSaveLabel}
                changeFn={deadlineChangeFn}
                changeURLFn={changeURLFn}
                closeFn={linkCloseFn}
                curDeadline={curDeadline}
                currentLabel={this.state.currentLabel}
                currentLabelChange={this.currentLabelChange}
                currentLabelChangeByClick={this.currentLabelChangeByClick}
                currentURL={currentURL}
                currentURLText={currentURLText}
                changeURLTextFn={changeURLTextFn}
                deleteTask={deleteTask}
                displayAllContextMenus={displayAllContextMenus}
                displayDeleteCtxMenu={this.state.displayDeleteCtxMenu}
                displayLabelCtxMenu={this.state.displayLabelCtxMenu}
                displaySortingOptionsMenu={displaySortingOptionsMenu}
                displayTaskCtxMenu={displayTaskCtxMenu}
                displayLinkCtxMenu={displayLinkCtxMenu}
                endTimeCloseFn={endTimeCloseFn}
                labels={this.state.labels}
                linkCloseFn={linkCloseFn}
                menuOptionsList={
                  displayAllContextMenus
                    ? menuOptionsList
                    : this.state.sortingOptions
                }
                saveFn={saveLinkFn}
                saveLabel={saveLabel}
                selectedLabelIdx={this.state.selectedLabelIdx}
                selectedLabelIdxChange={this.selectedLabelIdxChange}
                tempPosition={tempPosition}
                tempTask={this.state.tempTask}
              />
              <ListGroup className="listOfTasksContainer">
                {this.state &&
                  this.state.tasks.map(task => {
                    return (
                      <ListGroup.Item key={listId++}>
                        {this.state.shouldShowColors ? (
                          <div
                            className={"color-status " + task.progressState}
                          ></div>
                        ) : null}
                        <span
                          className="task-title"
                          value={task.task}
                          onClick={this.openTaskModal}
                        >
                          {task.task}
                        </span>
                        <div className="endTime">
                          {task.end ? Moment(task.end).format("LLLL") : null}
                        </div>
                        <button
                          onClick={this.showDeleteContextMenu}
                          value={task.task}
                          className="menuItembutton"
                        />
                        <div className="list-link">
                          <a href={"https://" + task.url} target="_blank">
                            {task.urlText}
                          </a>
                        </div>

                        <button
                          onClick={showDeadlineContextMenu}
                          value={task.task}
                          className="menuLinkbutton"
                        />
                        {!task.label ? null : (
                          <Badge
                            className="genericLabel"
                            variant={badgeOptions[task.selectedLabelIdx]}
                          >
                            {task.label}
                          </Badge>
                        )}
                        <Accordion defaultActiveKey="0">
                          <Card className="invisible-card">
                            <Accordion.Toggle
                              className="accordion-toggle"
                              eventKey="1"
                            >
                              <ProgressBar
                                striped
                                now={
                                  !task.progressState
                                    ? 10
                                    : task.progressState === "defined"
                                    ? 10
                                    : task.progressState === "inprogress"
                                    ? 60
                                    : 100
                                }
                              />
                              Status:{" "}
                              {task.progressState
                                ? task.progressState
                                : "Defined"}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body className="invisible-card-body">
                                {" "}
                                <select
                                  className="custom-select"
                                  value={task.progressState}
                                  task={task.task}
                                  onChange={changeProgressState}
                                >
                                  <option value="defined" key="0">
                                    Defined
                                  </option>
                                  <option value="inprogress" key="1">
                                    In Progress
                                  </option>
                                  <option value="completed" key="2">
                                    Completed
                                  </option>
                                </select>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </div>
          ) : (
            <FacebookLogin
              appId="176625356093687"
              autoLoad={false}
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              fields="name,email,picture"
            />
          )}
        </div>
      </>
    );
  };
}
const mapStateToProps = state => ({
  loggedin: state.loggedin,
  userName: state.userName
});

const mapDispatchToProps = dispatch => {
  return {
    facebookLoginDispatch: info => {
      dispatch({ type: "facebookLogin", payload: info });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App); // export connected component
