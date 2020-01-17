import React from "react";
import Moment from "moment";
import "./App.scss";
import FacebookLogin from "react-facebook-login";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskContextMenu from "./TaskContextMenu";
import MenuItems from "./MenuItems";
import LinkContextMenu from "./LinkContextMenu";
import TaskModal from "./TaskModal";
import {
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  Accordion,
  Card,
  ProgressBar
} from "react-bootstrap";
import db from "./db";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: false,
      curDeadline: "",
      tasks: [],
      shouldShowColors: false,
      tempPosition: [],
      curTask: "",
      tempTask: "",
      userName: "",
      displayAllContextMenus: false,
      displayTaskCtxMenu: false,
      displayLinkCtxMenu: false,
      currentURL: "",
      currentURLText: "",
      showModal: false,
      currentModalTask: {},
      currentRichText: "",
      didRichTextChange: false,
      menuOptionsList: [
        {
          text: "Add deadline",
          onClick: () => {
            this.setState({
              displayAllContextMenus: false,
              displayTaskCtxMenu: true
            });
          }
        },
        {
          text: "Add link",
          onClick: () => {
            this.setState({
              displayAllContextMenus: false,
              displayLinkCtxMenu: true
            });
          }
        }
      ]
    };
  }
  responseFacebook = res => {
    let tasks = [];
    db.tasks
      .where("userName")
      .equalsIgnoreCase(res.name)
      .each(rec => {
        tasks.push({
          task: rec.task,
          end: rec.endTime,
          url: rec.url,
          urlText: rec.urlText,
          progressState: rec.progressState
        });
      })
      .then(() => {
        this.setState({
          loggedin: true,
          userName: res.name,
          tasks: tasks
        });
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
      db.tasks.put({ userName: this.state.userName, task: curTask });
    }
  };

  closeAllCtxMenus = () => {
    this.setState({
      displayAllContextMenus: false
    });
  };

  handleInputChange = ev => {
    this.setState({
      curTask: ev.target.value
    });
  };

  deleteTask = ev => {
    let tasks = this.state.tasks,
      curTask = ev.currentTarget.value,
      idx;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === curTask) {
        idx = i;
        break;
      }
    }

    tasks = tasks.slice(0, idx).concat(tasks.slice(idx + 1, tasks.length));

    this.setState({
      tasks: tasks
    });
    db.tasks
      .where("task")
      .equalsIgnoreCase(curTask)
      .delete();
  };

  // Function to show the context menu
  showDeadlineContextMenu = ev => {
    this.setState({
      //displayTaskCtxMenu: true,
      displayAllContextMenus: true,
      tempTask: ev.currentTarget.value,
      tempPosition: [ev.clientX, ev.clientY]
    });
  };

  closeFn = () => {
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
              userName: this.state.userName,
              task: curTask,
              richText: firstMatch.richText,
              endTime: endTime._d,
              id: firstMatch.id
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
    let curURL = this.state.currentURL,
      curURLText = this.state.currentURLText;
    let tasks = this.state.tasks.concat();
    let curTask = this.state.tempTask;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === curTask) {
        tasks[i].url = curURL;
        tasks[i].urlText = curURLText;
        break;
      }
    }
    db.tasks
      .where("task")
      .equalsIgnoreCase(curTask)
      .first(item => {
        let firstMatch = item;
        db.tasks.put({
          userName: this.state.userName,
          task: curTask,
          endTime: firstMatch.endTime,
          url: curURL,
          urlText: curURLText,
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
          userName: this.state.userName,
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

  handleClose = () => {
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

  render = () => {
    let listId = 0,
      {
        curDeadline,
        currentURL,
        currentURLText,
        curTask,
        displayAllContextMenus,
        displayLinkCtxMenu,
        displayTaskCtxMenu,
        loggedin,
        menuOptionsList,
        tempPosition,
        userName,
        shouldShowColors
      } = this.state,
      {
        addToList,
        changeProgressState,
        changeURLFn,
        changeURLTextFn,
        closeAllCtxMenus,
        closeFn,
        deadlineChangeFn,
        deleteTask,
        handleInputChange,
        linkCloseFn,
        responseFacebook,
        saveLinkFn,
        showDeadlineContextMenu,
        showColors
      } = this;

    return (
      <div className="App">
        {loggedin ? (
          <div className="checklist-container">
            <div className="nameHeader">
              {"Welcome "}
              <span className="userName">{userName}</span>
              <div className="toggle-container">
                <button
                  onClick={showColors}
                  className={`smallMenuButton ${shouldShowColors}`}
                  value={shouldShowColors}
                ></button>
              </div>
            </div>
            <TaskModal
              show={this.state.showModal}
              onHide={this.handleClose}
              tasks={this.state.tasks}
              task={this.state.currentTask}
              userName={this.state.userName}
              onRichTextChange={this.richTextChange}
              currentModalTask={this.state.currentModalTask}
              currentModalTaskEnd={this.state.currentModalTaskEnd}
              didRichTextChange={this.state.didRichTextChange}
              richText={this.state.currentRichText}
              closeFn={this.handleClose}
            ></TaskModal>
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
            <ListGroup>
              {displayAllContextMenus ? (
                <MenuItems
                  tempPosition={tempPosition}
                  menuOptionsList={menuOptionsList}
                  closeAllCtxMenus={closeAllCtxMenus}
                ></MenuItems>
              ) : null}
              {displayTaskCtxMenu ? (
                <TaskContextMenu
                  closeFn={closeFn}
                  changeFn={deadlineChangeFn}
                  curDeadline={curDeadline}
                  tempPosition={tempPosition}
                ></TaskContextMenu>
              ) : null}
              {displayLinkCtxMenu ? (
                <LinkContextMenu
                  tempPosition={tempPosition}
                  closeFn={linkCloseFn}
                  saveFn={saveLinkFn}
                  currentURL={currentURL}
                  currentURLText={currentURLText}
                  changeURLTextFn={changeURLTextFn}
                  changeURLFn={changeURLFn}
                ></LinkContextMenu>
              ) : null}
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
                        onClick={deleteTask}
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
                            Status: {task.progressState}
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
    );
  };
}

export default App;
