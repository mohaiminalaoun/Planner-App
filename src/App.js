import React from "react";
import "./App.scss";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import Moment from "moment";
import CompletedAnimation from "./animations/CompletedAnimation";
import DeletedAnimation from "./animations/DeletedAnimation";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextMenuContainer from "./components/contextMenus/ContextMenuContainer";
import TaskModal from "./TaskModal";
import Dashboard from "./Dashboard";
import TabSelector from "./TabSelector";
import LoginPage from "./LoginPage";
import TasksListGroup from "./components/Tasks/TasksListGroup";
import {
  addToList,
  deleteTask,
  handleInputChange
} from "./_TaskListsFunctions";
import { randomize, deRandomize } from "./_ShortcutFunctions";
import { initializeDrag, startDrag, stopDrag, onDragEnd } from "./_DragActions";
import {
  showDeadlineContextMenu,
  deadlineChangeFn,
  endTimeCloseFn
} from "./_DeadlineFunctions";

import {
  saveLabel,
  cancelSaveLabel,
  currentLabelChange,
  selectedLabelIdxChange,
  currentLabelChangeByClick
} from "./_LabelFunctions";
import {
  linkCloseFn,
  saveLinkFn,
  changeURLTextFn,
  changeURLFn
} from "./_LinkFunctions";
import { responseFacebook, logOutFacebook } from "./_SignInFunctions";
import {
  sortTasksByLabel,
  sortTasksByEndTime,
  showSortingOptionsMenu
} from "./_SortingFunctions";
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
      displayCalendarCtxMenu: false,
      currentCalendarDate: null,
      currentURL: "",
      currentURLText: "",
      currentDraggingTask: null,
      showModal: false,
      showCompletedAnimation: false,
      currentModalTask: {},
      currentRichText: "",
      currentLabel: "",
      didRichTextChange: false,
      selectedLabelIdx: 0,
      shouldShowDashboard: false,
      labels: new Set(),
      menuOptionsList: [
        {
          text: "Close",
          onClick: () => {
            this.setState({
              displayAllContextMenus: false,
              displayCurtain: false
            });
          }
        },
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
        },
        {
          text: "Delete",
          onClick: e => {
            this.showDeleteContextMenu(e);
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
    document.onkeydown = e => {
      if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.code === "Comma") {
        randomize.call(this);
      } else if (
        e.shiftKey &&
        (e.metaKey || e.ctrlKey) &&
        e.code === "Period" &&
        !!window.tasks
      ) {
        deRandomize.call(this);
      }
    };
    // async function getStocks() {
    //   let url =
    //     "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&interval=30min&apikey=1HZKQ8BEPBGQMTV0";
    //   let res = await fetch(url);
    //   let text = await res.text();
    //   console.log(text);
    // }
    // getStocks();
  };

  responseFacebook = responseFacebook.bind(this);

  logOutFacebook = logOutFacebook.bind(this);

  addToList = addToList.bind(this);

  closeAllCtxMenus = () => {
    this.setState({
      displayAllContextMenus: false,
      displaySortingOptionsMenu: false,
      displayCurtain: false,
      displayDeleteCtxMenu: false
    });
  };

  handleInputChange = handleInputChange.bind(this);

  deleteTask = deleteTask.bind(this);

  // Function to show the context menu
  showDeadlineContextMenu = showDeadlineContextMenu.bind(this);

  deadlineChangeFn = deadlineChangeFn.bind(this);

  endTimeCloseFn = endTimeCloseFn.bind(this);

  // Functions for the link
  linkCloseFn = linkCloseFn.bind(this);

  saveLinkFn = saveLinkFn.bind(this);

  changeURLTextFn = changeURLTextFn.bind(this);

  changeURLFn = changeURLFn.bind(this);

  showColors = ev => {
    let curState = ev.currentTarget.value === "true";
    this.setState({
      shouldShowColors: !curState
    });
  };

  showDashboard = () => {
    this.setState({
      shouldShowDashboard: true
    });
  };

  hideDashboard = () => {
    this.setState({
      shouldShowDashboard: false
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
          currentModalTask: item
            ? item.task
            : "You'll see your task header here",
          currentModalTaskEnd: item ? item.endTime : "Jan 24 2020 8:45pm EST",
          currentRichText: item
            ? item.richText
            : "Here you can have a details section too! ^_^"
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

  saveLabel = saveLabel.bind(this);

  cancelSaveLabel = cancelSaveLabel.bind(this);

  currentLabelChange = currentLabelChange.bind(this);

  selectedLabelIdxChange = selectedLabelIdxChange.bind(this);

  currentLabelChangeByClick = currentLabelChangeByClick.bind(this);

  sortTasksByLabel = sortTasksByLabel.bind(this);

  sortTasksByEndTime = sortTasksByEndTime.bind(this);

  showSortingOptionsMenu = showSortingOptionsMenu.bind(this);

  showDeleteContextMenu = ev => {
    this.setState({
      displayDeleteCtxMenu: true,
      displayAllContextMenus: false,
      displayCurtain: window.screen.width > 500 ? true : false,
      tempPosition: [ev.clientX, ev.clientY]
    });
  };

  cancelDelete = () => {
    this.setState({
      displayDeleteCtxMenu: false,
      displayCurtain: false
    });
  };

  showCalendarContextMenu = date => {
    this.setState({
      displayCalendarCtxMenu: true,
      currentCalendarDate: date
    });
  };

  hideCalendarContextMenu = () => {
    this.setState({
      displayCalendarCtxMenu: false
    });
  };

  // callback that we will pass to CalendarContextMenu
  addTaskToDate = (task, date) => {
    let tasks = this.state.tasks;

    tasks.push({
      task: task,
      end: Moment(date)._d,
      url: null,
      urlText: null,
      progressPercent: null,
      label: null,
      selectedLabelIdx: null
    });

    this.setState({
      tasks: tasks
    });

    db.tasks.put({
      userName: this.props.userName,
      task: task,
      endTime: Moment(date)._d
    });
  };

  startDrag = startDrag.bind(this);

  stopDrag = stopDrag.bind(this);

  initializeDrag = initializeDrag.bind(this);

  progressClick = ev => {
    //console.log(ev.clientX);
    let dims = ev.currentTarget.getBoundingClientRect(),
      curTask = ev.currentTarget.getAttribute("value"),
      percentDone =
        Math.ceil(
          Math.floor(((ev.clientX - dims.left) / dims.width) * 100) / 10
        ) * 10,
      tasks = this.state.tasks.concat();
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === curTask) {
        tasks[i].progressPercent = percentDone;
        break;
      }
    }
    db.tasks
      .where("task")
      .equalsIgnoreCase(curTask)
      .first(item => {
        if (item) {
          let firstMatch = item;
          db.tasks.put({
            userName: this.props.userName,
            task: curTask,
            endTime: firstMatch.endTime,
            url: firstMatch.url,
            urlText: firstMatch.urlText,
            progressPercent: percentDone,
            id: firstMatch.id
          });
        }
      });
    this.setState({
      tasks: tasks
    });

    if (percentDone === 100) {
      this.setState({
        showCompletedAnimation: true
      });
      setTimeout(() => {
        this.setState({
          showCompletedAnimation: false
        });
      }, 4000);
    }
  };

  render = () => {
    let {
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
        displayCalendarCtxMenu,
        menuOptionsList,
        tempPosition,
        shouldShowColors
      } = this.state,
      {
        addToList,
        changeURLFn,
        changeURLTextFn,
        closeAllCtxMenus,
        endTimeCloseFn,
        deadlineChangeFn,
        deleteTask,
        handleInputChange,
        hideCalendarContextMenu,
        linkCloseFn,
        responseFacebook,
        saveLinkFn,
        showDeadlineContextMenu,
        showCalendarContextMenu,
        showColors,
        saveLabel,
        cancelSaveLabel,
        showSortingOptionsMenu
      } = this;

    let { loggedin, userName } = this.props;

    return (
      <>
        {this.state.displayCurtain ? (
          <div className="curtain" onClick={closeAllCtxMenus}></div>
        ) : null}
        <div className="App">
          {loggedin ? (
            <div className="checklist-container">
              <CompletedAnimation show={this.state.showCompletedAnimation} />
              <DeletedAnimation show={this.state.showDeletedAnimation} />
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
              <TabSelector
                shouldShowDashboard={this.state.shouldShowDashboard}
                showDashboard={this.showDashboard}
                hideDashboard={this.hideDashboard}
              />
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
              />
              {this.state.shouldShowDashboard ? (
                <Dashboard
                  tasks={this.state.tasks}
                  currentCalendarDate={this.state.currentCalendarDate}
                  displayCalendarCtxMenu={this.state.displayCalendarCtxMenu}
                  showCalendarContextMenu={showCalendarContextMenu}
                  hideCalendarContextMenu={hideCalendarContextMenu}
                  addTaskToDate={this.addTaskToDate}
                />
              ) : null}
              {this.state.shouldShowDashboard ? null : (
                <>
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
                    displayCalendarCtxMenu={displayCalendarCtxMenu}
                    addTaskToDate={this.addTaskToDate}
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
                  <TasksListGroup
                    tasks={this.state.tasks}
                    currentDraggingTask={this.state.currentDraggingTask}
                    onDragEnd={onDragEnd.bind(this)}
                    openTaskModal={this.openTaskModal}
                    showCalendarCtxMenu={showCalendarContextMenu}
                    showDeadlineContextMenu={showDeadlineContextMenu}
                    showDeleteContextMenu={this.showDeleteContextMenu}
                    shouldShowColors={this.state.shouldShowColors}
                    initializeDrag={this.initializeDrag}
                    startDrag={this.startDrag}
                    stopDrag={this.stopDrag}
                    progressClick={this.progressClick}
                  />
                </>
              )}
            </div>
          ) : (
            <LoginPage responseFacebook={this.responseFacebook} />
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
