import React from "react";
import Moment from "moment";
import logo from "./logo.svg";
import "./App.css";
import FacebookLogin from "react-facebook-login";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Popover,
  ButtonGroup,
  ToggleButton,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import db from "./db";

class App extends React.Component {
  constructor(props) {
    super(props);
    let tasks = [];

    this.state = {
      loggedin: false,
      tasks: [],
      curTask: "",
      userName: ""
    };
  }
  responseFacebook = res => {
    let tasks = [];
    db.tasks
      .where("userName")
      .equalsIgnoreCase(res.name)
      .each(function(rec) {
        tasks.push({
          task: rec.task,
          end: rec.endTime
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

  // TODO: add stylish prompt for user
  getLinkInfo = ev => {
    let end = parseInt(window.prompt("Add a number")),
      curTask = ev.currentTarget.value,
      tasks = this.state.tasks.concat(),
      idx = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === curTask) {
        idx = i;
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
          let date = new Date(),
            curTime = date.getTime();
          firstMatch = item;
          let endTime = Moment().add(end, "hour");
          db.tasks.put({
            userName: this.state.userName,
            task: curTask,
            endTime: endTime._d,
            id: firstMatch.id
          });
        }
      });
  };

  render = () => {
    let listId = 0;

    return (
      <div className="App">
        {this.state.loggedin ? (
          <div className="checklist-container">
            <div className="nameHeader">
              {"Welcome "}
              <span className="userName">{this.state.userName}</span>

              <button
                onClick={this.saveTime}
                className="smallMenuButton"
              ></button>
            </div>
            <InputGroup className="mb-3">
              <FormControl
                onChange={this.handleInputChange}
                value={this.state.curTask}
                placeholder="Add task to do"
                aria-label="Add task to do"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button onClick={this.addToList} variant="outline-secondary">
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <ListGroup>
              {this.state &&
                this.state.tasks.map(task => {
                  return (
                    <ListGroup.Item key={listId++}>
                      {task.task}
                      <div className="endTime">
                        {task.end ? Moment(task.end).format("LLLL") : null}
                      </div>
                      <button
                        onClick={this.deleteTask}
                        value={task.task}
                        className="menuItembutton"
                      />
                      <button
                        onClick={this.getLinkInfo}
                        value={task.task}
                        className="menuLinkbutton"
                      />
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </div>
        ) : (
          <FacebookLogin
            appId="176625356093687"
            autoLoad={false}
            callback={this.responseFacebook}
            cssClass="my-facebook-button-class"
            fields="name,email,picture"
          />
        )}
      </div>
    );
  };
}

export default App;
