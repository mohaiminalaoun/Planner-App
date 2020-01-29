import React from "react";
import "./DeadlineContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const DeadlineContextMenu = props => {
  return (
    <div className="taskContextMenu" style={props.divStyle}>
      <InputGroup className="mb-3">
        <FormControl
          onChange={props.changeFn}
          value={props.curDeadline}
          placeholder="Hours"
          aria-label="Add deadline to task"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
      <InputGroup.Append>
        <Button
          className="deadline-close-btn"
          onClick={props.closeFn}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          className="deadline-ok-btn"
          onClick={props.closeFn}
          variant="primary"
        >
          Okay
        </Button>
      </InputGroup.Append>
    </div>
  );
};

DeadlineContextMenu.propTypes = {
  changeFn: PropTypes.func,
  tempPosition: PropTypes.array,
  curDeadline: PropTypes.string,
  closeFn: PropTypes.func
};

export default withHOC(DeadlineContextMenu);
