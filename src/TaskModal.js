import React from "react";
import Moment from "moment";
import ReactQuill from "react-quill";
import "./TaskModal.scss";
import "react-quill/dist/quill.snow.css"; // ES6
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import db from "./db";
import {handleInputChange} from "./_TaskListsFunctions";
class TaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.richText || "",
      toolbarVisible: false,
      editTitleVisible: false,
      curTitle: JSON.stringify(props.currentModalTask) || ""
    };
  }

  closeFn = () => {
    let taskObj = null;
    this.props.tasks.forEach(t => {
      if (t.task === this.props.currentModalTask) {
        taskObj = t;
      }
    });
    db.tasks
      .where("task")
      .equalsIgnoreCase(this.props.currentModalTask)
      .first(item => {
        if (item) {
          console.log(`found item`);
          db.tasks.put({
            userName: this.props.userName,
            task: this.props.currentModalTask,
            endTime: taskObj.end,
            richText: this.props.richText,
            id: item.id,
            label: item.label,
            selectedLabelIdx: item.selectedLabelIdx
          });
        }
      })
      .then(() => {
        this.props.closeFn();
      });
    this.setState({
      toolbarVisible: false
    });
  };
  handleTextAreaChange = (ev) => {
      let val = ev.target.value;
      if (val.length < 50) {
        this.setState({
          curTitle: ev.target.value
        });
      }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentModalTask !== prevProps.currentModalTask) {
      this.setState({
        curTitle: this.props.currentModalTask
      });
    }
  }

  render() {
    let props = this.props;

    let modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          ["clean"]
        ]
      },
      formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "code-block",
        "list",
        "bullet",
        "indent"
      ];
    let btnStyle = {
      float: "right",
      height: "24px",
      fontSize: "11px",
      padding: "13px",
      paddingTop: "4px"
    };
    let showToolbar = () => {
      this.setState(prevState => ({
        toolbarVisible: !prevState.toolbarVisible
      }));
    };
    return (
      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          {this.state.editTitleVisible ? null : (<Modal.Title className="task-modal-title">
            {this.state.curTitle}
          </Modal.Title>) }
          {this.state.editTitleVisible ?
              <input value={this.state.curTitle} onChange={this.handleTextAreaChange} className="edit-task-title"></input> : null}
        </Modal.Header>
        <Button className="edit-title-btn" variant="outline-secondary" onClick={()=>{this.setState((prevState) => ({editTitleVisible: !prevState.editTitleVisible}))}}>
          {this.state.editTitleVisible ? "Done": "Edit"}
        </Button>
        <Modal.Body>
          <Form.Group
            controlId="exampleForm.ControlTextarea1"
            className={
              "quill-box" + (this.state.toolbarVisible ? "" : " hide-toolbar")
            }
          >
            <Form.Label>
              {props.currentModalTask &&
                "Due by: " + Moment(props.currentModalTaskEnd).format("LLLL")}
            </Form.Label>
            <Button variant="info" style={btnStyle} onClick={showToolbar}>
              {this.state.toolbarVisible ? "Hide Toolbar" : "Show Toolbar"}
            </Button>
            {
              <ReactQuill
                value={props.richText || ""}
                onChange={props.onRichTextChange}
                modules={modules}
                formats={formats}
              />
            }
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeFn}>
            Close
          </Button>
          <Button variant="primary" onClick={this.closeFn}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TaskModal;
