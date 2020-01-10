import React from "react";
import { useEffect } from "react";
import "./TaskContextMenu.scss";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const TaskContextMenu = props => {
  useEffect(() => {
    let div = document.getElementById("TaskContextMenu");
    div.style.left = props.tempPosition[0] + "px";
    div.style.top = props.tempPosition[1] + "px";
  });
  return (
    <div className="taskContextMenu" id="TaskContextMenu">
      <InputGroup className="mb-3">
        <FormControl
          onChange={props.changeFn}
          value={props.curDeadline}
          placeholder="Add deadline to task"
          aria-label="Add deadline to task"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
      <InputGroup.Append>
        <Button
          className="deadline-close-btn"
          onClick={props.closeFn}
          variant="outline-secondary"
        >
          Close
        </Button>
      </InputGroup.Append>
    </div>
  );
};

export default TaskContextMenu;
