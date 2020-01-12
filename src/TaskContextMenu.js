import React from "react";
import { useEffect } from "react";
import "./TaskContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const TaskContextMenu = props => {
  let contextMenu = React.createRef();
  useEffect(() => {
    let div = contextMenu.current;
    div.style.left = props.tempPosition[0] + "px";
    div.style.top = props.tempPosition[1] + "px";
  });
  return (
    <div className="taskContextMenu" ref={contextMenu}>
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

TaskContextMenu.propTypes = {
  changeFn: PropTypes.func,
  tempPosition: PropTypes.array,
  curDeadline: PropTypes.string,
  closeFn: PropTypes.func
};

export default withHOC(TaskContextMenu);
