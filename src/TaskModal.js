import React from "react";
import Moment from "moment";
import ReactQuill from "react-quill";
import "./TaskModal.scss";
import "react-quill/dist/quill.snow.css"; // ES6
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import db from "./db";
class TaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.richText || ""
    };
  }

  closeFn = () => {
    let taskObj = null;
    this.props.tasks.forEach(t => {
      if (t.task === this.props.currentModalTask) {
        taskObj = t;
      }
    });
    this.props.closeFn();
    db.tasks
      .where("task")
      .equalsIgnoreCase(this.props.currentModalTask)
      .first(item => {
        if (item && this.props.didRichTextChange) {
          db.tasks.put({
            userName: this.props.userName,
            task: this.props.currentModalTask,
            endTime: taskObj.end,
            richText: this.props.richText,
            id: item.id
          });
        }
      })
      .then(() => {
        this.setState({
          didTextChange: false
        });
      });
  };
  render() {
    let props = this.props;
    return (
      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.currentModalTask}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              {props.currentModalTask &&
                "Due by: " + Moment(props.currentModalTaskEnd).format("LLLL")}
            </Form.Label>
            {
              <ReactQuill
                value={props.richText}
                onChange={props.onRichTextChange}
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
